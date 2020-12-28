/*
 * @Description: 
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-28 13:37:53
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-28 14:02:41
 */
;(function(doc, storage, local) {
  if (storage.getItem('username')) {
    local.href = 'client.html'
  }

  const oUserName = doc.getElementById('username')
  const oBtn = doc.getElementById('btn')

  function init() {
    bindEvent()
  }

  function bindEvent() {
    oBtn.addEventListener('click', bindBtnClickHande, false)
  }

  function bindBtnClickHande() {
    const username = oUserName.value.trim()
    if(username.length < 6) {
      alert('用户名不能小于6位')
      return
    }

    storage.setItem('username', username)
    local.href = 'client.html'
  }

  init()
})(document, localStorage, location)