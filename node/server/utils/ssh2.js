const Client = require('ssh2').Client

/**
 * ssh连接服务器
 * @param {*} options    服务器信息
 * @param {*} success    成功回调
 * @param {*} fail       失败回调
 */
function ConnectServer(options, success, fail) {
  let conn = new Client()

  conn.on('ready', () => success(conn))
  .on('error', (err) => fail(err))
  .on('end', () => console.log('end'))
  .connect(options)
}


/**
 * 进入服务器后运行命令行
 * @param {*} conn
 * @param {*} cmd
 * @param {*} success
 * @param {*} fail
 */
function Shell(conn, cmd, success, fail) {
  conn.shell((err, stream) => {
    if (err) throw err
    let buf = ''
    stream.on('close', () => {
      console.log('Stream: close')
      success(buf)
    }).on('data', data => {
      buf += data
    })
    stream.end(`${cmd}\nexit\n`)
  })
}

module.exports = {
  ConnectServer,
  Shell
}