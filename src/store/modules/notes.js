import Note from '@/apis/notes'
import { Message } from 'element-ui'

const state = {
  notes: null,
  curNoteId:null
}

const getters = {
  notes: state => state.notes || [],
  curNote: state => {
    if(!Array.isArray(state.notes) || !state.curNoteId) return {}
    return state.notes.find(note=>note.id == state.curNoteId)
  }
}

const mutations = {
  setNotes(state,{notes}){
    state.notes = notes
  },
  addNote(state,{note}){
    state.notes.unshift(note)
  },
  updateNote(state,{noteId,title,content}){
    let note = state.notes.find(note => note.id == noteId) || {}
    note.title = title
    note.content = content
  },
  deleteNote(state,{noteId}){
    state.notes = state.notes.filter(note => note.id != noteId)
    // 删除了当前笔记 将当前笔记ID重置
    state.curNoteId = null
  },
  setCurNoteId(state,{noteId}){
    state.curNoteId = noteId
  }
}

const actions = {
  getNotes({commit},{notebookId}){
    return Note.getAll({notebookId}).then(res=>{
      commit('setNotes',{notes:res.data})
    })
  },
  addNote({commit},{notebookId,title}){
    return Note.addNote({notebookId},{title}).then(res=>{
      commit('addNote',{note:res.data})
      Message.success(res.msg)
    })
  },
  updateNote({commit},{noteId,title,content}){
    return Note.updateNote({noteId,title,content}).then(res=>{
      commit('updateNote',{noteId,title,content})
    })
  },
  deleteNote({commit},{noteId}){
    return Note.deleteNote({noteId}).then(res=>{
      commit('deleteNote',{noteId})
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
