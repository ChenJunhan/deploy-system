/*
 * @Author: ChenJunhan 
 * @Date: 2019-11-04 16:53:39 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-11-06 17:35:41
 * 登陆注册
 */

const requestValidate = require('../utils/request-validate')
const userInfoService = require('../services/user')
const userCode = require('../codes/user')

class User {

  /**
   * 注册功能
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof User
   */
  static async register(ctx, next) {
    let formData = ctx.request.body
    let result = {
      success: false,
      messsage: '',
      data: null,
      code: -1
    }
    let rules = {
      'user_name': 'required',
      'password': 'required',
      'confirm_password': 'required'
    }
  }

  /**
   *
   * 登录功能
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof User
   */
  static async login(ctx, next) {
    ctx.body = 'test'
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: -1
    }
    let rules = {
      'user_name': 'required',
      'password': 'required'
    }
    
    // 验证请求参数
    let msg = requestValidate(formData, rules, ctx)
    if (msg) { 
      result.message = msg
      ctx.body = result
      return
    }

    // 检查用户是否存在
    let userInfo = await userInfoService.getExistUser(formData['user_name'])
    if (!userInfo) {
      result.message = userCode.ERROR_FAIL_USER_IS_NOT_EXIST
      ctx.body = result
      return
    }
    console.log(userInfo)

    // ctx.session.user = 'test'
    ctx.body = result
  }
}

module.exports = User;