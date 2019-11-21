/*
 * @Author: ChenJunhan 
 * @Date: 2019-11-11 15:50:45 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-11-21 17:19:28
 * 模块管理
*/

const bcrypt = require('bcrypt')
const shell = require('shelljs')

const moduleService = require('../services/modules')
const resultModel = require('./model/callbackResult')
const requestValidate = require('../utils/request-validate')
const code = require('../codes/modules')
const { ConnectServer, Shell } = require('../utils/ssh2')

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
    let result = JSON.parse(JSON.stringify(resultModel))
    let rules = {
      m_name: 'required',
      git_address: 'required',
      server_address: 'required',
      server_user: 'required',
      server_password: 'required',
      directory: 'required',
      u_id: 'required',
      allot_u_id: 'required',
      allot_level: 'required'
    }

    // 验证请求参数
    let msg = requestValidate(formData, rules)
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
    // let salt = bcrypt.genSaltSync(10)
    // formData['server_password'] = bcrypt.hashSync(formData['server_password'], salt)

    // 添加新模块
    let createResult = await moduleService.create({
      ...formData,
      create_time: Date.now() 
    })
    
    if (!createResult || createResult.insertId * 1 < 0) {
      result.message = code.ERROR_SYS
      ctx.body = result
      return 
    }

    // 克隆仓库
    let cloneResult = await moduleService.gitCloneRepository(formData['git_address'], formData['m_name'])
    if (cloneResult) {
      result.code = 0
      result.success = true
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
    let result = JSON.parse(JSON.stringify(resultModel))
    let formData = ctx.request.body
    let rules = {
      u_id: 'required'
    }

    // 验证请求参数
    let msg = requestValidate(formData, rules)
    if (msg) {
      result.message = msg
      ctx.body = result
      return
    }

    // 根据u_id查询模块列表
    let queryResult = await moduleService.getUserModuleList(formData['u_id'])
    if (queryResult) {
      result.success = true
      result.code = 0
      result.data = queryResult
    }
    ctx.body = result
  }


  /**
   * 克隆git仓库到部署系统服务器
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof modules
   */
  static async gitCloneRepository(ctx, next) {
    let result = JSON.parse(JSON.stringify(resultModel))
    let formData = ctx.request.body
    let rules = {
      git_address: 'required',
      m_name: 'required'
    }

    // 参数验证
    const msg = requestValidate(formData, rules)
    if (msg) {
      result.message = msg
      ctx.body = result
      return
    }
    
    let cloneResult = await moduleService.gitCloneRepository(formData['git_address'], formData['m_name'])
    if (cloneResult) {
      result.code = 0
      result.success = true
    }

    ctx.body = result
  }

  /**
   * 获取git仓库历史记录
   * @static
   * @param {*} ctx
   * @param {*} next
   * @memberof modules
   */
  static async getGitWarehouseHistory(ctx, next) {
    let result = JSON.parse(JSON.stringify(resultModel))
    let formData = ctx.request.body
    let rules = {
      m_id: 'required'
    }

    // 参数验证
    const msg = requestValidate(formData, rules)
    if (msg) {
      result.message = msg
      ctx.body = result
      return
    }

    // 获取模块信息
    let moduleInfo = await moduleService.getModulesInfo(formData['m_id'])
    if (!moduleInfo) {
      result.message = code.ERROR_SYS
      ctx.body = result
      return 
    }

    console.log(moduleInfo)
    if (!shell.which('git')) {
      shell.echo('this script requires git')
      shell.exit(1)
    }
    

    // let connectResult = await moduleService.connectServer()
    // console.log(connectResult)
    // if (connectResult.indexOf('FAIL_CONNECT_SERVER') !== -1) {
    //   result.message = code.ERROR_FAIL_CONNECT_SERVER
    //   ctx.body = result
    //   return 
    // }
    // if (connectResult.indexOf('No such file or directory') !== -1) {
    //   result.message = code.ERROR_INVALID_DIRECTORY
    // }
    // if (connectResult.indexOf('Not a git repository') !== -1) {
    //   result.message = code.ERROR_NOT_EXIST_GIT_REPOSITORY
    // }

    
    ctx.body = result
  }
}

module.exports = modules