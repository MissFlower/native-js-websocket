/*
 * @Description: 
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-28 14:20:43
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-28 14:50:04
 */
const Ws = require('ws')

;(function(Ws) {
  // ws:localhost:8000
  const server = new Ws.Server({ port: 9000 })

  function init () {
    bindEvent()
  }

  function bindEvent() {
    server.on('open', openHandle)
    server.on('close', closeHandle)
    server.on('error', errorHandle)
    server.on('connection', connectionHandle)
  }

  function openHandle(e) {
    console.log('WebSocket open', e)
  }

  function closeHandle(e) {
    console.log('WebSocket close', e)
  }

  function errorHandle(e) {
    console.log('WebSocket error', e)
  }

  function connectionHandle(ws) {
    console.log('WebSocket Connection')
    ws.on('message', messageHandle)
  } 

  function messageHandle(msg) {
    console.log('WebSocket message', msg)
    server.clients.forEach(c => {
      c.send(msg)
    })
  }

  init()
})(Ws)