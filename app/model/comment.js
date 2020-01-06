'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const CommentSchema = new Schema({
    movie_id: {
      type: Schema.Types.ObjectId,
    },
    user_id: {
      type: Schema.Types.ObjectId,
    },
    content: {
      type: String,
    },
    addtime: {
      type: String,
      default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    },
  });
  return mongoose.model('Comment', CommentSchema, 'comment');
};
