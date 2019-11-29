const deployModel = require('../models/deploy')
const moduleModel = require('../models/modules')

const deploy = {

  /**
   * 提交申请部署
   * @param {*} model
   * @returns
   */
  async apply(model) {
    let result = await deployModel.apply(model)
    return result
  },


  /**
   * 查找模块是否存在
   * @param {*} mId
   * @returns
   */
  async checkModuleExist(mId) {
    let result = await moduleModel.getModulesInfo(mId)
    return result
  },


  /**
   * 获取申请部署列表
   * @param {*} uId
   * @returns
   */
  async getList(uId) {
    let result = await deployModel.getList(uId)
    return result
  },


}

module.exports = deploy
