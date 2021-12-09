const Message = require('../models/message');

module.exports.addMessage = function (toEmail, fromEmail, message, sentTime) {
  const newMessage = new Message({ toUserEmail:toEmail, fromUserEmail:fromEmail, message:message, timeSent: sentTime });
  return newMessage.save();
};

module.exports.getMessages = function (email1, email2) {
  return Message.find({
    $or: [
      { $and: [{ toUserEmail: email1 }, { fromUserEmail: email2 }] },
      { $and: [{ toUserEmail: email2 }, { fromUserEmail: email1 }] },
    ],
  });
};
