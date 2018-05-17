import Notebook from '@/apis/notebook'
import { Message } from 'element-ui'

// 状态 属性的值
const state = {
  notebooks: null,
  curNotebookId: null
}

// 获取器
const getters = {
  notebooks: state => state.notebooks || [],
  curNotebook: state => {
    // notebooks不存在
    if(!Array.isArray(state.notebooks)) return {}
    // curNotebookId不存在 返回第一个
    if(!state.curNotebookId) return state.notebooks[0]
    // 都存在 获取对应的
    return state.notebooks.find(notebook=>notebook.id == state.curNotebookId)
  }
}

// 转变
const mutations = {
  setNotebooks(state,{notebooks}){
    state.notebooks = notebooks
  },
  addNotebook(state,{notebook}){
    state.notebooks.unshift(notebook)
  },
  updateNotebook(state,{notebookId,title}){
    let notebook = state.notebooks.find(notebook=>notebook.id == notebookId) || {}
    notebook.title = title
  },
  deleteNotebook(state,{notebookId}){
    state.notebooks = state.notebooks.filter(notebook=>notebook.id != notebookId)
  },
  setCurNotebookId(state,{curNotebookId}){
    state.curNotebookId = curNotebookId
  }
}

// 动作
const actions = {
  getNotebooks({commit,state}){
    // 如果存在数据 则直接返回一个promise对象
    if(state.notebooks != null) return Promise.resolve()
    // 继续return 一个promise对象
    return Notebook.getAll().then(res=>{
      commit('setNotebooks',{notebooks:res.data})
    })
  },
  addNotebook({commit},{title}){
    return Notebook.addNotebook({title}).then(res=>{
      commit('addNotebook',{notebook:res.data})
      Message.success(res.msg)
    })
  },
  updateNotebook({commit},{notebookId,title}){
    return Notebook.updateNotebook(notebookId,{title}).then(res=>{
      commit('updateNotebook',{notebookId:notebookId,title:title})
      Message.success(res.msg)
    })
  },
  deleteNotebook({commit},{notebookId}){
    return Notebook.deleteNotebook(notebookId).then(res=>{
      commit('deleteNotebook',{notebookId})
      Message.success(res.msg)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
