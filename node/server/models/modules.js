const db = require('../../utils/db')
const Client = require('ssh2').Client
const request = require('request')
const { ConnectServer, Shell } = require('../utils/ssh2')

const modules = {

  /**
   * 数据库创建模块
   * @param {*} model
   * @returns
   */
  async create(model) {
    let midResult = await db.query('SELECT MAX(m_id) FROM module_list;')
    let m_id = midResult[0]['MAX(m_id)']
    m_id = m_id ? m_id + 1 : 1
    let result = await db.insertData('module_list', { ...model, m_id })
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
  },


  /**
   * 根据模块id查询数据库中的模块信息
   * @param {*} mId 模块id
   * @returns
   */
  async getModulesInfo(mId) {
    let result = await db.queryData('module_list', 'm_id', mId)

    if (!Array.isArray(result) || result.length === 0) {
      result = null
      return result
    }
    return result[0]
  },


  /**
   * 连接服务器
   * @param {*} options
   * @param {*} callback
   */
  async connectServer(options, cmd, success) {
    return new Promise((resolve, reject) => {
      ConnectServer(options, conn => {
        Shell(conn, cmd, data => {
          resolve(data)
        })
      }, error => resolve('ERROR: FAIL_CONNECT_SERVER'))
    })
  }
}

module.exports = modules