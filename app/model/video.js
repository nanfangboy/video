'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const VideoSchema = new Schema({
    title: {
      type: String,
    },
    cover_img: {
      type: String,
    },
    url: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    addtime: {
      type: String,
      default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    },
  });
  return mongoose.model('Video', VideoSchema, 'video');
};
