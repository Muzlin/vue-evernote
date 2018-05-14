<template>
  <div id="note-sidebar">
    <div class="title">
      <span class="btn add-note" @click="onCreate(curBook.id)">添加笔记</span>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{curBook.title}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(notebook,index) in notebooks" :key="index" :command="notebook">{{notebook.title}}</el-dropdown-item>
          <el-dropdown-item command="trash">回收站</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="(note,index) in notes" :key="index">
        <router-link :to='`/note?notebookId=${note.notebookId}&noteId=${note.id}`'>
          <span class="date">{{note.createdAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Notebooks from '@/apis/notebook'
  import Notes from '@/apis/notes'
  import Bus from '@/helpers/bus'
  import notebook from '../apis/notebook';
  export default {
    data() {
      return {
        notebooks: [],
        notes: [],
        curBook: {}
      }
    },
    created() {
      Notebooks.getAll().then(res => {
        this.notebooks = res.data
        // 获取当前笔记本数据 根据路由获取notebookId 默认为笔记本第一个
        this.curBook = res.data.find(notebook => notebook.id == this.$route.query.notebookId) || res.data[0] || {}
        return Notes.getAll({notebookId: this.curBook.id})
      }).then(res=>{
        this.notes = res.data
        // 触发一个watch:notes事件  父组件监听 获取回调数据
        this.$emit('watch:notes',this.notes)
        // 利用bus去触发 监听
        Bus.$emit('watch:notes',this.notes)
      })
    },
    methods: {
      handleCommand(notebook) {
        if (notebook === 'trash') {
          return this.$router.push('/trash')
        }
        this.curBook = notebook
        Notes.getAll({notebookId:notebook.id}).then(res=>{
          this.notes = res.data
          // 触发一个watch:notes事件  父组件监听 获取回调数据
          this.$emit('watch:notes', this.notes)
        })
      },
      onCreate(notebookId){
        let title = ''
        this.$prompt('请输入笔记标题', '新建笔记', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空且不能超过30个字符'
        }).then(({ value }) => {
          title = value
          return Notes.addNote({notebookId},{title})
        }).then(res=>{
          this.$message.success(res.msg)
          this.notes.unshift(res.data)
        })
      },
    }
  }

</script>

<style lang='scss' scoped>
  @import "../assets/css/note-sidebar.scss"
</style>
