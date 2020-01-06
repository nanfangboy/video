'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const UserSchema = new Schema({
    username: {
      type: String,
    },
    pass: {
      type: String,
    },
    email: {
      type: String,
    },
    addtime: {
      type: String,
      default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    },
  });
  return mongoose.model('User', UserSchema, 'user');
};
