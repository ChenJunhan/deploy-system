const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')

const router = require('./server/routes')
const config = require('./config')

app.keys = ['this is my secret and fuck you all.']
app.use(session(config.session, app))     // 加载session中间件

app.use(bodyParser())

app.use(router.routes())                  // 加载路由中间件
app.use(router.allowedMethods())

app.listen(config.port)
console.log('node is starting at port ', config.port)