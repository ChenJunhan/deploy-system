const modulesModel = require('../models/modules')
const db = require('../../utils/db')
const shell = require('shelljs')

const modules = {

  /**
   * 创建模块
   * @param {*} model
   * @returns
   */
  async create(model) {
    let result = await modulesModel.create(model)
    return result
  },


  /**
   * 克隆需部署的项目到部署系统服务器上
   * @param {*} gitAddress    git仓库地址
   * @param {*} moduleName    新建模块名
   * @returns
   */
  async gitCloneRepository(gitAddress, moduleName) {
    if (shell.cd('git_repository').code) {
      shell.mkdir('git_repository')
      shell.cd('git_repository')
    }
    let result = shell.exec(`git clone ~/gogs-repositories/${gitAddress.toLowerCase()} ${moduleName}`)
    if (result.code) return false
    return true 
  },

  /**
   * 查找模块名是否重复
   * @param {*} mName  模块名
   * @returns
   */
  async getModuleNameExist(mName) {
    let result = await modulesModel.getModuleNameExist(mName)
    return result
  },


  /**
   * 根据ui获取模块列表
   * @param {*} uId
   */
  async getUserModuleList(uId) {
    let result = await modulesModel.getUserModuleList(uId)
    return result
  },


  /**
   * 根据模块id获取模块信息
   * @param {*} mId
   * @returns
   */
  async getModulesInfo(mId) {
    let result = await modulesModel.getModulesInfo(mId)
    return result
  },


  /**
   * ssh连接服务器
   * @param {*} options
   * @param {*} callback
   */
  async connectServer(options, success, error) {
    return modulesModel.connectServer(options, success, error)
  }
}

module.exports = modules