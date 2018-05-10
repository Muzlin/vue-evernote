/* *****
 *  笔记本列表接口类
 */
import request from '@/helpers/request'
import { resolve } from 'path';

const URL = {
  GET:'/notebooks',
  ADD:'/notebooks',
  UPDATE:'/notebooks/:id',
  DELETE:'/notebooks/:id'
}

export default{
  init(){

  },
  getAll(){
    // 处理数据 返回一个新的promise对象
    return new Promise((resolve,reject)=>{
      request(URL.GET).then(res=>{
        // 时间倒序
        res.data = res.data.sort((n1,n2)=>n1.createdAt < n2.createdAt)
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  updateNotebook(notebookId,{title = ''} = {title:''}){
    return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },
  deleteNotebook(notebookId){
    return request(URL.DELETE.replace(':id',notebookId),'DELETE')
  },
  addNotebook({title = ''} = {title : ''}){
    return request(URL.ADD,'POST',{title})
  }
}
