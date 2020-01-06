'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  /**
   * 管理员登录
   */
  async login() {
    const { ctx } = this;
    const { name, pass } = ctx.request.body;
    const response = await ctx.service.admin.login(name, pass);
    ctx.session.name = name;
    if (response.length) {
      ctx.body = 1;
    } else {
      ctx.body = 0;
    }
  }
  /**
   * 登出
   */
  async logout() {
    const { ctx } = this;
    ctx.session.name = null;
    ctx.redirect('/admin/login');
  }
}

module.exports = AdminController;
