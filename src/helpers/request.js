/* *****
 *  请求帮助类
 */
import axios from 'axios'
import baseURLConfig from '@/helpers/config-baseURL'
import { Message } from 'element-ui'  // 单独引入element ui 的message模块

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.baseURL = 'http://note-server.hunger-valley.com'
axios.defaults.baseURL = baseURLConfig.baseURL // 地址自动切换
axios.defaults.withCredentials = true

export default function request(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (method.toLowerCase === 'get') {
      option.params = data
    } else {
      option.data = data
    }

    axios(option).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        Message({
          type: 'error',
          message: res.data.msg
        })
        reject(res.data)
      }
    }).catch(err => {
      Message({
        type: 'error',
        message: '网络异常'
      })
      reject({
        msg: `网络异常:${err}`
      })
    })
  })
}
