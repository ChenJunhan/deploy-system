/** 
 * 验证登录状态
*/
const resultModel = require('../controllers/model/callbackResult')

module.exports = (ctx, next) => {
  let result = JSON.parse(JSON.stringify(resultModel))

  if (!ctx.session.user) {
    result.code = 101
    result.message = '用户未登录'
    return ctx.body = result
  }

  return next()
}