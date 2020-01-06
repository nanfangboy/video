'use strict';

const Controller = require('egg').Controller;

class EchartController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await this.ctx.model.Video.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
        },
      },
    ]);
    ctx.socket.emit('getEchart', data);
  }
  async comment() {
    const { ctx } = this;
    const info = ctx.args[0];
    const movie_id = info.movie_id;
    const data = await ctx.model.Comment.aggregate([{
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
      $match: { movie_id: this.app.mongoose.Types.ObjectId(movie_id) },
    },
    ]);
    ctx.socket.emit('getComment', data);
  }
}

module.exports = EchartController;
