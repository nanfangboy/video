'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {

  async delete() {
    const { ctx } = this;
    const { _id } = ctx.params;
    const response = await ctx.model.Comment.remove({
      _id,
    });
    ctx.body = 1;
  }
  async createFavor() {
    const { ctx } = this;
    const { username, movie_id } = ctx.request.body;
    const user_id = await ctx.helper.findIdByName(username);
    const result = await ctx.model.Favor.find({
      user_id, movie_id,
    });
    // console.log(result.length)
    if (result.length > 0) { // 存在数据时，更新
      const response = await ctx.model.Favor.update({
        movie_id,
        user_id,
      }, {
        status: 1,
      });
      ctx.body = 1;
    } else { // 无数据时，添加
      const response = await ctx.model.Favor.create({
        movie_id,
        user_id,
      });
      ctx.body = 1;
    }

  }
  async updateFavor() {
    const { ctx } = this;
    const { username, movie_id } = ctx.request.body;
    const user_id = await ctx.helper.findIdByName(username);
    const response = await ctx.model.Favor.update({
      movie_id,
      user_id,
    }, {
      status: 0,
    });
    ctx.body = 1;
  }
  async create() {
    const { ctx } = this;
    const { username, movie_id, content } = ctx.request.body;
    const user_id = await ctx.helper.findIdByName(username);
    const response = await ctx.model.Comment.create({
      movie_id,
      user_id,
      content,
    });
    if (response) {
      ctx.body = 1;
    } else {
      ctx.body = 0;
    }
  }
  async status() {
    const { ctx } = this;
    const { username, movie_id } = ctx.request.body;
    const user_id = await ctx.helper.findIdByName(username);
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
      $match: {
        movie_id: this.app.mongoose.Types.ObjectId(movie_id),
      },
    }, {
      $match: {
        user_id: this.app.mongoose.Types.ObjectId(user_id),
      },
    },
    ]);
    if (list[0].status) {
      ctx.body = 1;
    } else {
      ctx.body = 0;
    }
  }
}

module.exports = CommentController;
