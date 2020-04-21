const Router = require('koa-router')
const deployController = require('../controllers/deploy')
const router = new Router()
const authorize = require('../utils/authorize')

router.use(authorize)
router.post('/apply', deployController.apply)
.post('/getList', deployController.getList)
.post('/updateServer', deployController.updateServer)

module.exports = router