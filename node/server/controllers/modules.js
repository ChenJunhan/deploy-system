/*
 * @Author: ChenJunhan 
 * @Date: 2019-11-11 15:50:45 
 * @Last Modified by: ChenJunhan
 * @Last Modified time: 2019-11-29 15:27:53
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
      // u_id: 'required',
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

    // 验证是否有添加权限
    if (ctx.session.level !== 1) {
      result.message = code.ERROR_NOT_AUTHORITY
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
      u_id: ctx.session.u_id,
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

    if (!shell.which('git')) {
      shell.echo('this script requires git')
      shell.exit(1)
    }

    // window本地测试
    let cdResult = shell.cd(`git_repository/${moduleInfo['m_name']}`)
    if (cdResult.code) {
      result.message = code.ERROR_INVALID_DIRECTORY
      ctx.body = result
      return
    }

    // 若有分支名参数则是获取提交历史列表
    if (formData['branch_name']) {
      let logList = shell.exec(`git pull && git log remotes/${formData['branch_name']} --oneline`)

      if (!logList.code) {
        logList = logList.split('\n')
        result.data = logList.slice(0, logList.length - 1) 
        result.code = 0
        result.success = true
      }else {
        result.message = code.ERROR_INVALID_BRANCH_NAME
      }
     
      shell.cd('../..')
      ctx.body = result
      return
    }

    // 获取分支名列表
    let branchList = shell.exec(`git fetch && git branch -r`)
    shell.cd('../..')

    // 若登录客户端服务器失败
    if (branchList.indexOf('Permission denied') !== -1) {
      result.message = code.ERROR_INVALID_SERVER_ACCOUNT
      ctx.body = result
      return
    }
    if (branchList.indexOf('Not a git repository') >= 0) {
      result.message = code.ERROR_NOT_EXIST_GIT_REPOSITORY
      ctx.body = result
      return
    }
    
    branchList = branchList.split('\n')
    branchList = branchList.slice(1, branchList.length - 1)
    branchList = branchList.map(b => b.trim())

    result.data = branchList
    result.code = 0
    result.success = true
    
    ctx.body = result
  }
}

module.exports = modules