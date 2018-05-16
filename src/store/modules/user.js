// 状态 属性值
import Auth from '@/apis/auth'
import Router from '@/router'

const state = {
  user:null
}

// 获取器
const getters = {
  user:state=>state.user,
  username:state=>{
    return state.user === null ? '未登录' : state.user.username
  },
  slug:state=>{
    return state.user === null ? '未' : state.user.username[0]
  }
}

// 改变 转变
const mutations = {
  setUser(state,{user}){
    state.user = user
  }
}

// 操作
const actions = {
  login({commit},{username,password}){
    return Auth.login({username,password}).then(res=>{
      commit('setUser',{user:res.data})
    })
  },
  register({commit},{username,password}){
    return Auth.register({username,password}).then(res=>{
      commit('setUser',{user:res.data})
    })
  },
  checkLogin({commit},{path='/login'}={path:'/login'}){
    return Auth.getInfo().then(res=>{
      if(res.isLogin){
        commit('setUser',{user:res.data})
      }else{
        Router.push(path)
      }
    })
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
