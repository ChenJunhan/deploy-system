/**
 * 请求参数验证工具
 * @param {Object} data      验证数据
 * @param {Object} ctx       上下文
 * @param {Object} rules     规则 
 *   required： 必填字段
 *   number：   必须为数字
 *   array：    必须为数
 */

module.exports = (data, rules, ctx) => {
  let msg = ''

  Object.keys(rules).forEach(key => {
    let rule = rules[key].split('|')
    let d = data[key]
    if (msg) return

    rule.forEach(r => {
      let ruleKeyName = r.split(':')
      
      if(ruleKeyName[0] === 'required' && !d) {
        msg = `缺少${key}参数`
        return
      }
      if(ruleKeyName[0] === 'number' && typeof d !== 'number') {
        msg = `${key}必须是数字`
        return
      }
      if(ruleKeyName[0] === 'array' && !(d instanceof Array)) {
        msg = `${key}必须是数组`
        return
      }
    })
  })

  return msg
}