/*
 * @Author: ChenJunhan 
 * @Date: 2019-11-11 15:50:45 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-11-12 17:58:26
 * 模块管理
*/

const bcrypt = require('bcrypt')

const moduleService = require('../services/modules')
const resultModel = require('./model/callbackResult')
const requestValidate = require('../utils/request-validate')
const code = require('../codes/modules')

class modules {
  
  /**
   * 添加模块
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof modules
   */
  static async add(ctx, next) {
    let formData = ctx.request.body
    let result = resultModel
    let rules = {
      'm_name': 'required',
      'git_address': 'required',
      'server_address': 'required',
      'server_user': 'required',
      'server_password': 'required',
      'directory': 'required',
      'u_id': 'required',
      'allot_level': 'required'
    }

    // 验证请求参数
    let msg = requestValidate(formData, rules, ctx)
    if (msg) {
      result.message = msg
      ctx.body = result
      return 
    }

    // 验证模块名是否已经存在
    let existResult = await moduleService.getModuleNameExist(formData['m_name'])
    if (existResult) {
      result.message = code.ERROR_FAIL_MODULENAME_IS_EXIST
      ctx.body = result
      return
    }

    // 密码加密
    let salt = bcrypt.genSaltSync(10)
    formData['server_password'] = bcrypt.hashSync(formData['server_password'], salt)

    // 添加新模块
    let createResult = await moduleService.create({
      ...formData,
      create_time: Date.now() 
    })
 
    if (createResult && createResult.insertId * 1 > 0) {
      result.success = true
      result.code = 0
    }else {
      result.message = code.ERROR_SYS
    }

    ctx.body = result
  }


  /**
   * 获取模块列表
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof modules
   */
  static async getModulesList(ctx, next) {
    let result = resultModel

    let queryResult = await moduleService.getUserModuleList(ctx.session.u_id)

    if (queryResult) {
      result.success = true
      result.code = 0
      result.data = queryResult
      ctx.body = result
    }
  }
}

module.exports = modules