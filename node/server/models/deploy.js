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
    let _sql = `
      SELECT d1.*, m2.m_name, m2.allot_level 
      FROM deploy_list d1, module_list m2 
      WHERE (d1.apply_u_id = ? AND d1.m_id = m2.m_id)
      OR (m2.u_id = ? AND d1.apply_u_id = m2.allot_u_id AND d1.m_id = m2.m_id)
    `
    let result = await db.query(_sql, [uId, uId])
    return result 
  },


  /**
   * 修改数据库部署列表的状态
   * @param {*} dId 申请id
   * @returns
   */
  async updateDeployStatus(dId) {
    let result = await db.updateData('deploy_list', { deploy: 1 }, 'id', dId)
    return result
  },

  
  /**
   * 查询部署信息
   * @param {*} dId
   * @returns
   */
  async getDepolyInfo(dId) {
    let result = await db.queryData('deploy_list', 'id', dId)

    if (!Array.isArray(result) || result.length === 0) {
      result = null
      return result
    }
    return result[0]
  },
}

module.exports = deploy