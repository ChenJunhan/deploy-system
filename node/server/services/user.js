/**
 * 用户业务操作
*/

const userModel = require('../models/user')

const user = {

  /**
   * 创建用户
   * @param {*} user
   * @returns
   */
  async create(user) {
    let result = await userModel.create(user)
    return result
  },

}