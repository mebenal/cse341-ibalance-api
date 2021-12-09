const Message = require('../models/message');

module.exports.addMessage = function (toEmail, fromEmail, message, sentTime) {
  const newMessage = new Message(toEmail, fromEmail, message, sentTime);
  return newMessage.save();
};

module.exports.getMessages = function (email1, email2) {
  console.log(`${email1}, ${email2}`)
  let messages = Message.find({
    $or: [
      { $and: [{ toUserEmail: email1 }, { fromUserEmail: email2 }] },
      { $and: [{ toUserEmail: email2 }, { fromUserEmail: email1 }] },
    ],
  });
  console.log(messages)
  return messages
};
