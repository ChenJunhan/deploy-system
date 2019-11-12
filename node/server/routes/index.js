const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

const login = require('./user')
const modules = require('./modules')

router.use('/user', login.routes(), login.allowedMethods())
router.use('/modules', modules.routes(), modules.allowedMethods())

module.exports = router