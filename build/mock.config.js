const fs = require('fs')
const path = require('path')

const mockBaseURL = 'http://192.168.18.46/api'
const realBaseURL = 'http://note-server.hunger-valley.com'

exports.config = function ({isDev = true} = {isDev : true}) {
  let fileTxt = `
    module.exports = {
      baseURL: '${isDev ? mockBaseURL : realBaseURL}'
    }
  `
  fs.writeFile(path.join(__dirname,'../src/helpers/config-baseURL.js'),fileTxt)
}
