const Router = require('koa-router')
const router = new Router()

const login = require('./server/controllers/login')

router.get('/', async (ctx, next) => {
  ctx.body = 'index'
})

router.get('/test', async(ctx, next) => {
  ctx.body = 'test'
})

router.get('/login', login)

module.exports = router