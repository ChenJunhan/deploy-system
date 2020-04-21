/**
 * 用户业务操作
*/

const userModel = require('../models/user')
const validator = require('../utils/validator')
const userCode = require('../codes/user')

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


  /**
   * 查找用户是否存在
   * @param {*} userName 用户名
   * @returns
   */
  async getExistUser(userName) {
    let resultData = await userModel.getExistUser(userName)
    return resultData
  },


  /**
   * 验证用户注册数据
   * @param {*} userInfo
   * @returns
   */
  validatorSignUp(userInfo) {
    let result = {
      success: false,
      message: ''
    }

    if (!validator.isMobile(userInfo['user_name'])) {
      result.message = userCode.ERROR_PHONE;
      return result;
    }
    if (!validator.isPassword(userInfo.password)) {
      result.message = userCode.ERROR_PASSWORD;
      return result;
    }
    if (userInfo.password !== userInfo['confirm_password']) {
      result.message = userCode.ERROR_PASSWORD_CONFORM;
      return result;
    }

    result.success = true;

    return result;
  }
}

module.exports = user