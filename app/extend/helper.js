module.exports = {
  async findIdByName(username) {
    const info = await this.ctx.model.User.findOne({ username });
    return info._id;
  },
};
