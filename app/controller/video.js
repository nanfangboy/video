'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class VideoController extends Controller {
  /**
   * 视频删除
   */
  async delete() {
    const { ctx } = this;
    const { _id } = ctx.params;
    const response = await ctx.model.Video.remove({
      _id,
    });
    ctx.body = 1;
  }
  /**
   * 视频编辑
   */
  async edit() {
    const { ctx } = this;
    const { _id } = ctx.params;
    const response = await ctx.model.Video.findOne({
      _id,
    });
    await ctx.render('admin/video/edit', {
      response,
    });
  }
  /**
   * 视频更新
   */
  async update() {
    const { ctx } = this;
    const { _id, title, category, description } = ctx.request.body;
    const response = await ctx.model.Video.update({
      _id,
    }, {
      title,
      category,
      description,
    });
    await ctx.redirect('/video/manager');
  }
  /**
   * 添加视频信息
   *  */
  async create() {
    const { ctx } = this;
    try {
      const { title, category, description } = ctx.request.body;
      const file1 = ctx.request.files[0];
      const file2 = ctx.request.files[1];
      const readerStream1 = fs.createReadStream(file1.filepath);
      const target1 = path.join('app/public/upload/', file1.filename);
      const writerStream1 = fs.createWriteStream(target1);
      await readerStream1.pipe(writerStream1);

      const readerStream2 = fs.createReadStream(file2.filepath);
      const target2 = path.join('app/public/upload/', file2.filename);
      const writerStream2 = fs.createWriteStream(target2);
      await readerStream2.pipe(writerStream2);
      const response = await ctx.model.Video.create({
        title,
        category,
        cover_img: 'http://localhost:7001/public/upload/' + file1.filename,
        url: 'http://localhost:7001/public/upload/' + file2.filename,
        description,
      });
      if (response) {
        ctx.body = 1;
      }
    } finally {
      ctx.cleanupRequestFiles();
    }
  }
  /**
   * 视频
   */
  async play() {
    const { ctx } = this;
    const { _id } = ctx.params;
    const response = await ctx.model.Video.findOne({
      _id,
    });
    await ctx.render('index/play', {
      response,
      username: ctx.session.username,
    });
  }
}

module.exports = VideoController;
