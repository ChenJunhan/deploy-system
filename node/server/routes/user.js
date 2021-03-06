const Router = require('koa-router')
const userController = require('../controllers/user')
const router = new Router()

router.post('/login', userController.login)
.post('/register', userController.register)
.post('/logout', userController.logout)
.post('/getUserInfo', userController.getUserInfo)

module.exports = router