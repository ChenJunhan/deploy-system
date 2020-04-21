const deployModel = require('../models/deploy')
const moduleModel = require('../models/modules')
const deployCode = require('../codes/deploy')

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


  /**
   * 同意部署申请，更新线上代码
   * @param {*} did
   * @returns
   */
  async getModulesInfo(did) {

    // 根据部署id查找对应的部署信息
    let deployInfo = await deployModel.getDepolyInfo(did)
    if (!deployInfo) {
      return deployInfo
    }
 
    // 根据申请部署的模块id找出模块对应的服务器账号和密码
    let moduleInfo = await moduleModel.getModulesInfo(deployInfo['m_id'])
    if (deployInfo) moduleInfo['git_log_hash'] = deployInfo['git_log_hash']
    return moduleInfo
  },


  /**
   * 更新部署状态
   * @param {*} did
   */
  async updateDeployStataus(did) {
    let result = await deployModel.updateDeployStatus(did)
    return result
  }
}

module.exports = deploy
