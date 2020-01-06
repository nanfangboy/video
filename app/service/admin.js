'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async login(name, pass) {
    const { ctx } = this;
    const result = await ctx.model.Admin.find({
      name,
      pass,
    });
    return result;
  }
}

module.exports = AdminService;
