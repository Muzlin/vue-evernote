import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/util'

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}

export default {
  getAll({notebookId}) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId), 'GET', {notebookId}).then(res => {
        // 排序
        res.data = res.data.sort((n1,n2)=>n1.createdAt < n2.createdAt)
        // 时间格式化
        res.data.map(item=>{
          item.createdAtFriendly = friendlyDate(item.createdAt)
          item.updateAtFriendly = friendlyDate(item.updateAt)
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateNote({noteId,title,content}){
    return request(URL.UPDATE.replace(':noteId',noteId),'PATCH',{title,content})
  },
  deleteNote({noteId}){
    return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
  },
  addNote({notebookId},{title = '', content = ''} = {title : '', content : ''}){
    return request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
  }
}
