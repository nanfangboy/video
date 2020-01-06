'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const FavorSchema = new Schema({
    movie_id: {
      type: Schema.Types.ObjectId,
    },
    user_id: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: Number,
      default: 1,
    },
  });
  return mongoose.model('Favor', FavorSchema, 'favor');
};
