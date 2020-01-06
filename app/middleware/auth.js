const url = require('url');

module.exports = options => {
  return async function auth(ctx, next) {
    if (ctx.session.name) {
      await next();
    } else {
      ctx.redirect('/admin/login');
    }
  };
};
