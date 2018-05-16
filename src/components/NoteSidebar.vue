<template>
  <div id="note-sidebar" class="note-sidebar">
    <div class="title">
      <span class="btn add-note" @click="onCreate(curNotebook.id)">添加笔记</span>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{curNotebook.title}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(notebook,index) in notebooks" :key="index" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
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
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    created() {
      this.getNotebooks().then(()=>{
        // 设置当前笔记本id
        this.$store.commit('setCurNotebookId',{curNotebookId: this.$route.query.notebookId})
        // 获取当前笔记本下的笔记
        this.getNotes({notebookId: this.curNotebook.id})
      })
    },
    computed:{
      ...mapGetters([
        'notebooks',
        'curNotebook',
        'notes'
      ])
    },
    methods: {
      ...mapActions([
        'getNotebooks',
        'getNotes',
        'addNote'
      ]),
      handleCommand(notebookId) {
        if (notebookId === 'trash') {
          return this.$router.push('/trash')
        }
        // 设置切换后的 当前笔记本id
        this.$store.commit('setCurNotebookId',{curNotebookId: notebookId})
        this.getNotes({notebookId})
      },
      onCreate(notebookId){
        let title = ''
        this.$prompt('请输入笔记标题', '新建笔记', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空且不能超过30个字符'
        }).then(({ value }) => {
          this.addNote({notebookId,title:value})
        })
      },
    }
  }

</script>

<style lang='scss' scoped>
  @import "../assets/css/note-sidebar.scss"
</style>
