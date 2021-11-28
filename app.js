require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const cors = require('cors');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
});
const sess = {
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: null,
    sameSite: 'none',
  },
};
const csrfProtection = csrf({ cookie: { sameSite: 'none', secure: true } });

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date.toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const adminRoutes = require('./routes/admin');

app.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: ['Cookie', 'Content-Type'],
    exposedHeaders: ['Cookie', 'Content-Type'],
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.cookies);
  console.log(req.body);
  next();
});

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('images', express.static(path.join(__dirname, 'images')));
app.use(session());
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  }
});

// Accessing routes
app.use(authRoutes); // access auth routes
app.use(adminRoutes); // access admin routes
app.use(taskRoutes); // access the tasks

app.get('/500', errorController.get500);

app.use(errorController.get404);

// app.use((error, req, res, next) => {
//   res.status(500).json({
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn,
//     isAdmin: req.session.isAdmin,
//   });
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
