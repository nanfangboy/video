module.exports = app => {
  return async (ctx, next) => {
    console.log('连接了');
    await next();
    // execute when disconnect.
    console.log('断开连接!');
  };
};
