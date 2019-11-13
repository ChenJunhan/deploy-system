const Router = require('koa-router')
const modulesController = require('../controllers/modules')
const router = new Router()
const authorize = require('../utils/authorize')

router.use(authorize)      // 验证登录
.post('/add', modulesController.add)
.post('/getModulesList', modulesController.getModulesList)
.post('/getGitWarehouseHistory', modulesController.getGitWarehouseHistory)

module.exports = router