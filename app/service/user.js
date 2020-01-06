'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async register(username, pass, email) {
    const { ctx } = this;
    const result = await ctx.model.User.create({
      username,
      pass,
      email,
    });
    return result;
  }

  async login(username, pass) {
    const { ctx } = this;
    const result = await ctx.model.User.find({
      username,
      pass,
    });
    return result;
  }
}

module.exports = UserService;
