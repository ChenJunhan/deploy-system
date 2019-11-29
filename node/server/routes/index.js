const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

const login = require('./user')
const modules = require('./modules')
const deploy = require('./deploy')

router.use('/user', login.routes(), login.allowedMethods())
router.use('/modules', modules.routes(), modules.allowedMethods())
router.use('/deploy', deploy.routes(), deploy.allowedMethods())

module.exports = router