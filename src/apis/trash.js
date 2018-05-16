/* *****
 *  回收站列表接口类
 */
import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/util'

const URL = {
  GET:'/notes/trash',
  REVERT:'/notes/:id/revert',
  DELETE:'/notes/:id/confirm'
}

export default{
  init(){},
  getAll(){
    // 处理数据 返回一个新的promise对象
    return new Promise((resolve,reject)=>{
      request(URL.GET).then(res=>{
        // 时间倒序 时间格式化
        res.data = res.data.sort((n1,n2)=>n1.createdAt < n2.createdAt)
        res.data.forEach(item=>{
          // 添加新的时间字段
          item.friendlyCreatedAt = friendlyDate(item.createdAt)
          item.friendlyUpdatedAt = friendlyDate(item.updatedAt)
        })
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  deleteNote({noteId}){
    return request(URL.DELETE.replace(':id',noteId),'DELETE')
  },
  revertNote({noteId}){
    return request(URL.REVERT.replace(':id',noteId),'PATCH')
  }
}
