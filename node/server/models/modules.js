const db = require('../../utils/db')

const modules = {

  /**
   * 数据库创建模块
   * @param {*} model
   * @returns
   */
  async create(model) {
    let result = await db.insertData('module_list', model)
    return result
  },


  /**
   * 查找模块名是否重复
   * @param {*} mName  模块名
   * @returns
   */
  async getModuleNameExist(mName) {
    let _sql = 'SELECT * FROM module_list where m_name = ? limit 1'
    let result = await db.query(_sql, [mName])

    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    }else {
      result = null
    }
    return result
  },


  /**
   * 根据uid查询数据库中关联的模块列表数据
   * @param {*} uId
   * @returns
   */
  async getUserModuleList(uId) {
    let _sql = 'SELECT * FROM module_list where u_id = ? OR allot_u_id = ?'
    let result = await db.query(_sql, [uId, uId])

    if (!Array.isArray(result) || result.length === 0) {
      result = null
    }
    return result 
  }
}

module.exports = modules