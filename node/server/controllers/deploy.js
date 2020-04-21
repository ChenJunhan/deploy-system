/*
 * @Author: ChenJunhan 
 * @Date: 2019-11-29 15:47:03 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2020-04-21 16:06:38
 * 部署列表管理
 */

const shell = require('shelljs')

const deployService = require('../services/deploy')
const moduleService = require('../services/modules')
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


  /**
   * 更新线上代码
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof deploy
   */
  static async updateServer(ctx, next) {
    let formData = ctx.request.body
    let result = JSON.parse(JSON.stringify(resultModel))

    let modulesInfo = await deployService.getModulesInfo(formData['d_id']) 
    if (!modulesInfo) {
      result.message = code.ERROR_ERROR_MODULE_NOT_EXIST
      return result
    }

    // 连接服务器更新代码
    await moduleService.connectServer({
      host: modulesInfo.server_address,
      port: 22,
      username: modulesInfo.server_user,
      password: modulesInfo.server_password 
    }, `cd ${modulesInfo.directory}\ngit log --oneline\ngit reset --hard ${modulesInfo.git_log_hash}`).then(async data => {
      if (data.indexOf('FAIL_CONNECT_SERVER') !== -1) {
        result.message = code.ERROR_CONNECT_SERVER
        return 
      }
      if (data.indexOf('No such file or directory') !== -1) {
        result.message = code.ERROR_NO_SUCH_DIRECTORY
        return
      }
      if (data.indexOf('Not a git repository') !== -1) {
        result.message = code.ERROR_NOT_GIT_REPOSITORY
        return
      }
      if (data.indexOf(`HEAD is now at ${modulesInfo.git_log_hash}`) !== -1) {
        result.code = 0
        result.success = true

        // 将部署申请改为已部署状态
        let updateResult = await deployService.updateDeployStataus(formData['d_id'])
        if (updateResult.affectedRows !== 1) {
          result.message = '线上代码部署成功，但部署申请状态修改失败'
        }
        return 
      }
      result.message = code.ERROR_DEPLOY
    })

    ctx.body = result
  }
}

module.exports = deploy