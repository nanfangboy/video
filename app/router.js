'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  const auth = app.middleware.auth();
  router.get('/', controller.home.siteIndex);// 渲染网站首页
  router.get('/index/about', controller.home.siteAbout);// 渲染关于我们
  router.get('/index/register', controller.home.siteRegister);// 渲染网站注册
  router.get('/index/login', controller.home.siteLogin);// 渲染网站登录
  router.get('/index/info', controller.home.siteInfo);// 渲染登录后的个人资料页
  router.get('/index/favor/:username', controller.home.siteFavor);// 渲染登录后的收藏页

  router.get('/admin/login', controller.home.login);// 渲染管理员登录页面
  router.get('/admin/index', auth, controller.home.index);// 渲染管理员首页
  router.get('/user/manager', auth, controller.home.user);// 渲染用户管理页
  router.get('/video/manager', auth, controller.home.video);// 渲染视频管理页
  router.get('/comment/manager', auth, controller.home.comment);// 渲染评论管理页

  router.post('/admin/api/login', controller.admin.login);// 处理管理员登录请求
  router.get('/admin/user/logout', controller.admin.logout);// 登出请求
  router.get('/admin/user/delete/:_id', controller.user.delete);// 用户删除请求
  router.get('/admin/user/edit/:_id', controller.user.edit);// 用户编辑请求
  router.post('/admin/user/update', controller.user.update);// 用户更新请求
  router.post('/index/user/register', controller.user.apiregister);// 处理网站注册请求
  router.post('/index/user/login', controller.user.apilogin);// 处理网站登录请求
  router.get('/index/user/logout', controller.user.logout);// 用户登出请求
  router.get('/index/user/edit/:username', controller.user.userEdit);// 用户编辑请求
  router.post('/index/user/update', controller.user.userUpdate);// 普通用户更新请求


  router.get('/admin/video/add', controller.home.addVideo);// 渲染添加视频页
  router.post('/admin/video/create', controller.video.create);// 添加视频请求
  router.post('/admin/video/update', controller.video.update);// 视频更新请求
  router.get('/admin/video/delete/:_id', controller.video.delete);// 视频删除请求
  router.get('/admin/video/edit/:_id', controller.video.edit);// 用户编辑请求
  router.get('/index/user/update', controller.user.userUpdate);// 普通用户更新请求

  router.get('/admin/comment/delete/:_id', controller.comment.delete);// 评论删除请求
  router.get('/index/api/video/:_id', controller.video.play);// 视频播放请求

  router.post('/index/comment/create', controller.comment.create);// 评论请求
  router.post('/index/favor/status', controller.comment.status);
  router.post('/index/favor/create', controller.comment.createFavor);
  router.post('/index/favor/update', controller.comment.updateFavor);
  io.of('/').route('echart', io.controller.echart.index);
  io.of('/').route('comment', io.controller.echart.comment);
};
