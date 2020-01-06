'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 用户注册
   */
  async apiregister() {
    const { ctx } = this;
    const { username, pass, email } = ctx.request.body;
    const response = await ctx.service.user.register(username, pass, email);
    if (response) {
      ctx.body = 1;
    } else {
      ctx.body = 0;
    }
  }
  /**
   * 修改个人信息
   */
  async userEdit() {
    const { ctx } = this;
    const { username } = ctx.params;
    const response = await ctx.model.User.findOne({
      username,
    });
    await ctx.render('index/info', {
      response,
      username: ctx.session.username,
    });
  }
  /**
   * 用户登录
   */
  async apilogin() {
    const { ctx } = this;
    const { username, pass } = ctx.request.body;
    const response = await ctx.service.user.login(username, pass);
    ctx.session.username = username;
    if (response.length) {
      ctx.body = 1;
    } else {
      ctx.body = 0;
    }
  }
  /**
   * 用户登出
   */
  async logout() {
    const { ctx } = this;
    ctx.session.username = null;
    ctx.redirect('/');
  }
  /**
   * 用户删除
   */
  async delete() {
    const { ctx } = this;
    const { _id } = ctx.params;
    const response = await ctx.model.User.remove({
      _id,
    });
    ctx.body = 1;
  }
  /**
   * 用户编辑
   */
  async edit() {
    const { ctx } = this;
    const { _id } = ctx.params;
    const response = await ctx.model.User.findOne({
      _id,
    });
    await ctx.render('admin/user/edit', {
      response,
    });
  }
  /**
   * 用户更新
   */
  async update() {
    const { ctx } = this;
    const { _id, username, pass, email } = ctx.request.body;
    const response = await ctx.model.User.update({
      _id,
    }, {
      username,
      pass,
      email,
    });
    await ctx.redirect('/user/manager');
  }
  /**
   * 用户更新
   */
  async userUpdate() {
    const { ctx } = this;
    const { username, pass, email } = ctx.request.body;
    const response = await ctx.model.User.update({
      username,
    }, {
      pass,
      email,
    });
    if (response) {
      ctx.body = 1;
    } else {
      ctx.body = 0;
    }
  }
}

module.exports = UserController;
