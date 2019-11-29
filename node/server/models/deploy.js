const db = require('../../utils/db')

const deploy = {


  /**
   * 数据库创建部署申请记录
   * @param {*} model
   * @returns
   */
  async apply(model) {
    let result = await db.insertData('deploy_list', model)
    return result
  },


  /**
   * 数据库查询部署申请记录
   * @param {*} uId
   * @returns
   */
  async getList(uId) {
    let _sql = 'SELECT * FROM deploy_list WHERE u_id = ? OR u_id = any(SELECT allot_u_id FROM module_list WHERE u_id = ?)'
    let result = await db.query(_sql, [uId, uId, uId, uId])
    return result 
  },

}

module.exports = deploy