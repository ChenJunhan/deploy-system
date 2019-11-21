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
  },


  /**
   * 根据模块id查询数据库中的模块信息
   * @param {*} mId 模块id
   * @returns
   */
  async getModulesInfo(mId) {
    let result = await db.queryData('module_list', 'id', mId)

    if (!Array.isArray(result) || result.length === 0) {
      result = null
    }
    return result
  },


  /**
   * 连接服务器
   * @param {*} options
   * @param {*} callback
   */
  async connectServer(options, cmd, success) {
    request({
      url: 'https://github.com/visionmedia/supertest/commits/master',
      method: 'GET',

    }, (error, res, body) => {
      console.log(body)
    })
    return new Promise((resolve, reject) => {
      ConnectServer({
        host: 'chenjunhan.club',
        port: 22,
        username: 'root',
        password: 'QPZMqpzm123456' 
      }, conn => {
        Shell(conn, 'cd /var/www/sleep_data\ngit log --oneline', data => {
          resolve(data)
        })
      }, error => resolve('ERROR: FAIL_CONNECT_SERVER'))
    })
  }
}

module.exports = modules