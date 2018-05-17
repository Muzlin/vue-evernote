// 状态 属性值
import Trash from '@/apis/trash'
import Router from '@/router'
import { Message } from 'element-ui'

const state = {
  trashNotes:null,
  curTransNoteId:null
}

// 获取器
const getters = {
  trashNotes:state=>state.trashNotes,
  curTrashNote:state=>{
    if(!Array.isArray(state.trashNotes) || !state.curTransNoteId) return {}
    return state.trashNotes.find(note=>note.id == state.curTransNoteId)
  },
  belongTo:(state,getters,rootState,rootGetters)=>{
    let notebook = rootGetters.notebooks.find(notebook=>notebook.id == getters.curTrashNote.notebookId) || {}
    return notebook.title || ''
  }
}

// 改变 转变
const mutations = {
  setTrashNotes(state,{trashNotes}){
    state.trashNotes = trashNotes
  },
  setCurTrashNoteId(state,{curTransNoteId}){
    state.curTransNoteId = curTransNoteId
  },
  deleteTrashNote(state,{trashNoteId}){
    state.trashNotes = state.trashNotes.filter(note=>note.id != trashNoteId)
    state.curTransNoteId = null
  }
}

// 操作
const actions = {
  getTrashNotes({commit}){
    return Trash.getAll().then(res=>{
      commit('setTrashNotes',{trashNotes:res.data})
    })
  },
  deleteTrashNote({commit},{trashNoteId}){
    return Trash.deleteNote({noteId:trashNoteId}).then(res=>{
      commit('deleteTrashNote',{trashNoteId})
      Message.success(res.msg)
    })
  },
  revertTrashNote({commit},{trashNoteId}){
    return Trash.revertNote({noteId:trashNoteId}).then(res=>{
      commit('deleteTrashNote',{trashNoteId})
      Message.success(res.msg)
    })
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
