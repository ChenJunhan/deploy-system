const config = {
  port: 3001,

  database: {
    DATABASE: 'deploy_system',
    USERNAME: 'root',
    PASSWORD: 'root',
    PORT: '3306',
    HOST: 'localhost'
  },

  session: {
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true,   /** (boolean) signed or not (default true) */
  }
}

module.exports = config