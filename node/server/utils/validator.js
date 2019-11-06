/** 
 * 验证工具
*/

const validator = {

  // 手机号
  isMobile: (mobile) => {
    if (typeof mobile !== 'number' && !mobile) { return false; }
    return (/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/).test(mobile);
  },

  // 密码
  isPassword: (password) => {
    if (!password) { return false; }
    return (/^\S{6,16}$/).test(password);
  }
}

module.exports = validator;