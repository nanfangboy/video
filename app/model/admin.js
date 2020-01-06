'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminSchema = new Schema({
    name: {
      type: String,
    },
    pass: {
      type: String,
    },
  });
  return mongoose.model('Admin', AdminSchema, 'admin');
};
