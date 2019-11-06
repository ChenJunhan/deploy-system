const db = require('../../utils/db')

const user = {

  /**
   * 数据库创建用户
   * @param {Object} model 用户数据模型
   * @returns {Object}     mysql执行结果
   */
  async create (model) {
    let result = await db.insertData('user_info', model)
    return result
  },


  /**
   * 根据用户名查找相应用户信息
   * @param {*} userName 用户名
   * @returns
   */
  async getExistUser(userName) {
    let _sql = 'SELECT * FROM user_info where name = ? limit 1'
    let result = await db.query(_sql, [userName])

    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    }else {
      result = null
    }
    return result
  }
}

module.exports = user