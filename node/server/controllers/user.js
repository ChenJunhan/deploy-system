/*
 * @Author: ChenJunhan 
 * @Date: 2019-11-04 16:53:39 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2020-04-23 16:29:05
 * 登陆注册
 */

const bcrypt = require('bcrypt')

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
      message: '',
      data: null,
      code: -1
    }
    let rules = {
      'user_name': 'required',
      'password': 'required',
      'confirm_password': 'required',
      'level': 'required'
    }

    // 验证请求参数
    let msg = requestValidate(formData, rules);
    if (msg) {
      result.message = msg
      ctx.body = result
      return
    }

    // 判断用户是否存在
    let userInfo = await userInfoService.getExistUser(formData['user_name'])
    if (userInfo) {
      result.message = userCode.ERROR_FAIL_USERNAME_IS_EXIST
      ctx.body = result
      return
    }

    // 密码加密
    let salt = bcrypt.genSaltSync(10)
    let password = bcrypt.hashSync(formData.password, salt)

    // 创建新用户
    let createResult = await userInfoService.create({
      name: formData['user_name'],
      password,
      create_time: Date.now(),
      level: formData['level']
    })

    if (createResult && createResult.insertId * 1 > 0) {
      result.success = true
      result.code = 0
    }else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
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
    let msg = requestValidate(formData, rules)
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
    
    // 检查密码是否正确
    let checkPassword = bcrypt.compareSync(formData.password, userInfo.password)
    if (!checkPassword) {
      result.message = userCode.ERROR_FAIL_USER_PASSWORD
      ctx.body = result
      return
    }
  
    ctx.session = {
      user: formData['user_name'],
      u_id: userInfo['id'],
      level: userInfo['level']
    }
    result.data = {
      user_name: userInfo.name,
      level: userInfo.level
    }
    result.code = 0
    result.success = true
    ctx.body = result
  }


  /**
   * 退出登录
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof User
   */
  static async logout(ctx, next) {
    let result = {
      success: true,
      message: '退出登录',
      data: null,
      code: 0
    }
    ctx.session = null
    ctx.body = result
  }


  /**
   * 获取用户信息
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof User
   */
  static async getUserInfo(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null,
      code: -1
    }
    result.data = ctx.session

    if (ctx.session.user) {
      result.success = true
      result.code = 0
    }
    ctx.body = result
  }
}

module.exports = User