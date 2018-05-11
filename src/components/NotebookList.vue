<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class='btn' @click.stop.prevent="onCreate">
        <i class="iconfont icon-jiahao"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link :to="`/note?notebookId=${notebook.id}`" class="notebook" v-for="(notebook,index) in notebooks" v-bind:key="index">
            <div>
              <span class="iconfont icon-icon-test"></span> {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="data">{{notebook.friendlyCreatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>
  </div>
</template>
<script>
  import Auth from '@/apis/auth'
  import Notebooks from '@/apis/notebook'
  export default {
    data() {
      return {
        notebooks: []
      }
    },
    created() {
      Auth.getInfo().then(res => {
          if (!res.isLogin) {
            this.$router.push({
              path: '/login'
            })
          }
        }),
        Notebooks.getAll().then(res => {
          this.notebooks = res.data
        })
    },
    computed: {

    },
    methods: {
      onCreate() {
        let title = ''
        this.$prompt('请输入笔记本标题', '创建笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空,且不能超哥30个字符'
        }).then(({
          value
        }) => {
          title = value
          return Notebooks.addNotebook({
            title
          })
        }).then(res => {
          this.$message.success(`成功创建新的笔记本:${title}`)
          // 重新获取列表
          Notebooks.getAll().then(res => {
            this.notebooks = res.data
          })
        }).catch(res => {
          this.$message({
            type: res !== 'cancel' ? 'error' : 'info',
            message: res !== 'cancel' ? res.msg : '取消创建'
          })
        })
      },
      onEdit(notebook) {
        let title = ''
        this.$prompt('请输入笔记本标题', '修改笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空,且不能超哥30个字符',
          inputValue: notebook.title
        }).then(({
          value
        }) => {
          title = value
          return Notebooks.updateNotebook(notebook.id, {
            title
          })
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          notebook.title = title
        }).catch(res => {
          this.$message({
            type: res !== 'cancel' ? 'error' : 'info',
            message: res !== 'cancel' ? res.msg : '取消删除'
          })
        })
      },
      onDelete(notebook) {
        this.$confirm('此操作将该笔记本放入回收站, 是否继续?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return Notebooks.deleteNotebook(notebook.id)
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        }).catch(res => {
          this.$message({
            type: res !== 'cancel' ? 'error' : 'info',
            message: res !== 'cancel' ? res.msg : '取消删除'
          })
        })
      }
    }
  }

</script>


<style lang="scss" scoped>
  @import "../assets/css/notebook-list.scss";

</style>
