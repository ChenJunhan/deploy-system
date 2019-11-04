const db = require('../../utils/db')

const user = {

  /**
   * 数据库创建用户
   * @param {Object} model 用户数据模型
   * @returns {Object}     mysql执行结果
   */
  async create (model) {
    let result = await db.insertData('user_info', model);
    return result;
  },
}