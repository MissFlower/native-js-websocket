/*
 * @Description: 
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-28 13:37:59
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-28 15:30:07
 */
;(function(doc, storage, local, Socket) {
  const oContainer = doc.querySelector('#messages-container')
  const oMessage = doc.querySelector('#message')
  const oSendBtn = doc.querySelector('#sendBtn')
  const ws = new Socket('ws:localhost:9000')
  let username = ''
  function init() {
    bindEvent()
  }

  function bindEvent() {
    oSendBtn.addEventListener('click', bindSendMessageClickHandle, false)
    oMessage.addEventListener('keyup', bindKeyupMessageHandle, false)
    ws.addEventListener('open', openHandle, false)
    ws.addEventListener('close', closeHandle, false)
    ws.addEventListener('error', errorHandle, false)
    ws.addEventListener('message', messageHandle, false)
  }

  function bindKeyupMessageHandle(e) {
    if(e.keyCode === 13) {
      bindSendMessageClickHandle()
    }
  }

  function bindSendMessageClickHandle() {
    const message = oMessage.value

    if(!message.trim().length) {
      return
    }

    ws.send(JSON.stringify({
      username,
      dateTime: new Date().getTime(),
      message
    }))
  }

  function openHandle(e) {
    console.log('ws open', e)
    username = storage.getItem('username')
    if (!username) {
      local.href = 'entry.html'
      return
    }
  }

  function closeHandle(e) {
    console.log('ws close', e)
  }

  function errorHandle(e) {
    console.log('ws error', e)
  }

  function messageHandle(e) {
    console.log('ws message', e)
    oContainer.appendChild(createMessage(JSON.parse(e.data)))
  }

  function createMessage(data) {
    const { message, dateTime, username } = data
    const oItem = doc.createElement('div')
    oItem.innerHTML = `
      <p>${username}</p>
      <div>消息：${message}</div>
      <span>${new Date(dateTime)}</span>
    `
    oMessage.value = ''
    return oItem
  }

  init()
})(document, localStorage, location, WebSocket)