const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

exports.getIndex = (req, res, next) => {
  res.json({ _csrf: req.csrfToken() });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const timeZoneOffset = req.body.timeZoneOffset;
  console.log(timeZoneOffset);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      errorMessage: errors.array()[0].msg,
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.json({
          success: false,
          errorMessage: 'Invalid email or password',
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.isAdmin = user.admin;
            req.session.timeZoneOffset = timeZoneOffset;
            return req.session.save(err => {
              console.log(err);
              return res.json({
                success: true,
              });
            });
          }
          return res.json({
            success: false,
            errorMessage: 'Invalid email or password',
          });
        })
        .catch(err => {
          console.log(err);
          res.json({ success: false, errorMessage: 'general error' });
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const admin = typeof req.body.admin !== 'undefined' && req.body.admin == true;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      errorMessage: errors.array()[0].msg,
    });
  }
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        admin: admin,
      });
      return user.save();
    })
    .then(result => {
      return res.json({ success: true });
      return transporter.jsonMail({
        to: email,
        from: 'ebe17003@byui.edu',
        subject: 'Signup Completed!',
        html: '<h1>You successfully signed up!</h1>',
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.json({ success: true });
  });
};

exports.postEmailReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, errorMessage: err });
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.json({
            success: false,
            errorMessage: 'No account with that email found.',
          });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        transporter.jsonMail({
          to: req.body.email,
          from: 'seb14001@byui.com',
          subject: 'Password Reset',
          html: `
          <p>You requested a password reset</p>
          <p>Take this token and use it to reset your password on the login page.</a>
          <p>${token}</p>
        `,
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const passwordToken = req.body.token;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.json({ success: true });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getLoggedIn = (req, res, next) => {
  return res.json({
    loggedIn: req.session.isLoggedIn ? true : false,
    email: req.user ? req.user.email : '',
  });
};
