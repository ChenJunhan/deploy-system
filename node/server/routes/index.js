const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

const login = require('./user')

router.get('/', async (ctx, next) => {
  ctx.body = 'index'
})

router.get('/test', async(ctx, next) => {
  ctx.body = 'test'
})

router.use('/user', login.routes(), login.allowedMethods())

module.exports = router