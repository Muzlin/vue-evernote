<template>
  <div id="note">
    <!-- 获取子组件的notes数据 -->
    <NoteSidebar @watch:notes="val => notes = val" />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期：{{curNote.createdAtFriendly}}</span>
          <span> 更新日期：{{curNote.updatedAtFriendly}}</span>
          <span>{{statusText}}</span>
          <span @click="deleteNote" class='iconfont icon-trash'></span>
          <span class='iconfont icon-quanping'></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入标题">

        </div>
        <div class="editor">
          <textarea v-model="curNote.content" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入内容 支持markdown"></textarea>
          <div class="preview markdown-body" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import NoteSidebar from '@/components/NoteSidebar'
  import Auth from "@/apis/auth"
  import Bus from '@/helpers/bus'
  import _ from 'lodash' // 截流模块
  import Notes from '@/apis/notes'

  export default {
    name: 'NoteDetail',
    components: {
      NoteSidebar
    },
    data() {
      return {
        curNote: {},
        notes: [],
        statusText:'未改动'
      }
    },
    created() {
      Auth.getInfo().then(res => {
        if (!res.isLogin) {
          this.$router.push({
            path: '/login'
          })
        }
      })
      // 监听子组件bus的触发事件 获取回调数据 监听一次  只在创建的时候监听
      Bus.$once('watch:notes',val=>{
        this.curNote = val.find(note=>note.id == this.$route.query.noteId) || {}
      })
    },
    beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      // console.log(to.query.noteId)
      // find 这里不能用 ===  不然匹配不到
      this.curNote = this.notes.find(note => note.id == to.query.noteId) || {}
      next()
    },
    methods:{
      // 用户输入的时候自动保存
      // 这里使用截流函数 保持一定的事件内调用更新接口
      updateNote: _.debounce(function(){
        Notes.updateNote({
          noteId: this.curNote.id,
          title: this.curNote.title,
          content: this.curNote.content
        }).then(res=>{
          this.statusText = '已保存'
        }).catch(err=>{
          this.statusText = '保存失败'
        })
      },500),
      deleteNote(){
        Notes.deleteNote({noteId:this.curNote.id}).then(data=>{
          this.$message.success(data.msg)
          this.notes.splice(this.notes.indexOf(this.curNote),1)
          this.$router.replace({path:'/note'})
        })
      }
    }
  }

</script>

<style lang='scss'>
  @import "../assets/css/note-detail.scss";
  #note {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
  }

</style>
