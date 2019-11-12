const modulesModel = require('../models/modules')
const db = require('../../utils/db')

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
  }
}

module.exports = modules