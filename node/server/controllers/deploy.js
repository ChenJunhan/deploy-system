/*
 * @Author: ChenJunhan 
 * @Date: 2019-11-29 15:47:03 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-11-29 16:59:45
 * 部署列表管理
 */

const deployService = require('../services/deploy')
const resultModel = require('./model/callbackResult')
const requestValidate = require('../utils/request-validate')
const code = require('../codes/deploy')

class deploy {

  /**
   * 提交部署申请 
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof deploy
   */
  static async apply(ctx, next) {
    let formData = ctx.request.body
    let result = JSON.parse(JSON.stringify(resultModel))
    let rules = {
      m_id: 'required',
      git_log_hash: 'required',
    }

    let msg = requestValidate(formData, rules)
    if (msg) {
      result.message = msg
      ctx.body = result
      return
    }

    // 检验模块是否存在
    let checkResult = await deployService.checkModuleExist(formData['m_id'])
    if (!checkResult) {
      result.message = code.ERROR_ERROR_MODULE_NOT_EXIST
      ctx.body = result
      return
    }

    let applyResult = await deployService.apply({
      ...formData,
      is_deploy: 0,
      u_id: ctx.session.u_id,
      create_time: Date.now()
    })

    if (applyResult && applyResult.insertId * 1 > 0) {
      result.code = 0
      result.success = true
    }else {
      result.message = code.ERROR_SYS
    }

    ctx.body = result
  }


  /**
   * 获取部署列表
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof deploy
   */
  static async getList(ctx, next) {
    let formData = ctx.request.body
    let result = JSON.parse(JSON.stringify(resultModel))
    
    let queryResult = await deployService.getList(ctx.session.u_id)
    ctx.body = queryResult
  }
}

module.exports = deploy