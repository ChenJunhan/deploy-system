/** 
 * 错误文案管理
*/

const userCode = {

  ERROR_USER_NAME: '用户名格式为6-16位的小写字母，包括-、_',

  ERROR_PHONE: '请输入正确的手机号码',

  ERROR_PASSWORD_CONFORM: '前后两次密码不一致',

  ERROR_PASSWORD: '密码格式为6-16位',

  ERROR_FAIL_USERNAME_IS_EXIST: '该用户名已经注册过',

  ERROR_FAIL_USER_IS_NOT_EXIST: '该用户名未注册',

  ERROR_SYS: '系统错误',

  ERROR_FAIL_USER_PASSWORD: '手机号或密码不正确',
  
  ERROR_FAIL_NO_CHANGE: '新老密码不能一致',

  ERROR_FAIL_OLD_PASSWORD: '原密码不正确',

  101: 'token过期或无效',
}

module.exports = userCode;