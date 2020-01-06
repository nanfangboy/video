'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async siteIndex() {
    const { ctx } = this;
    const list = await ctx.model.Video.find();
    await ctx.render('index/index', {
      username: ctx.session.username,
      list,
    });
  }
  async siteAbout() {
    const { ctx } = this;
    await ctx.render('index/about', {
      username: ctx.session.username,
    });
  }
  async siteRegister() {
    const { ctx } = this;
    await ctx.render('index/register', {
      username: ctx.session.username,
    });
  }
  async siteLogin() {
    const { ctx } = this;
    await ctx.render('index/login', {
      username: ctx.session.username,
    });
  }
  async siteInfo() {
    const { ctx } = this;
    await ctx.render('index/info', {
      username: ctx.session.username,
    });
  }
  async siteFavor() {
    const { ctx } = this;
    const { username } = ctx.params;
    const _id = await ctx.helper.findIdByName(username);
    const list = await ctx.model.Favor.aggregate([{
      $lookup: {
        from: 'user',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user',
      } }, {
      $lookup: {
        from: 'video',
        localField: 'movie_id',
        foreignField: '_id',
        as: 'video',
      } }, {
      $match: { user_id: _id, status: 1 },
    },
    ]);
    await ctx.render('index/favor', {
      username: ctx.session.username,
      list,
    });
  }
  async login() {
    const { ctx } = this;
    await ctx.render('admin/login');
  }
  async addVideo() {
    const { ctx } = this;
    await ctx.render('admin/video/add');
  }
  async index() {
    const { ctx } = this;
    await ctx.render('admin/index', {
      name: ctx.session.name,
    });
  }
  /** 渲染用户管理页 */
  async user() {
    const { ctx } = this;
    const page = ctx.request.query.page || 1;
    const pageSize = 6;
    const total = await ctx.model.User.find({}).count();
    const list = await ctx.model.User.find({}).skip((page - 1) * pageSize).limit(pageSize);
    await ctx.render('admin/user/list', {
      list,
      total,
      page,
    });
  }
  /** 渲染视频管理页 */
  async video() {
    const { ctx } = this;
    const page = ctx.request.query.page || 1;
    const pageSize = 6;
    const total = await ctx.model.Video.find({}).count();
    const list = await ctx.model.Video.find({}).skip((page - 1) * pageSize).limit(pageSize);
    await ctx.render('admin/video/list', {
      list,
      total,
      page,
    });
  }
  async comment() {
    const { ctx } = this;
    const page = ctx.request.query.page || 1;
    const pageSize = 6;
    const total = await ctx.model.Comment.find({}).count();
    const list = await ctx.model.Comment.aggregate([{
      $lookup: {
        from: 'user',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user',
      },
    }, {
      $lookup: {
        from: 'video',
        localField: 'movie_id',
        foreignField: '_id',
        as: 'video',
      },
    }]).skip((page - 1) * pageSize).limit(pageSize);
    await ctx.render('admin/comment/list', {
      list,
      total,
      page,
    });
  }
}

module.exports = HomeController;
