<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" @click.stop.prevent="onCreate" class="btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="item in notebooks" v-bind:key="item.id" to="/note/1" class="notebook">
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-notebook"></use>
              </svg>
              <span class="title">{{item.title}}</span>
              <span class="count">{{item.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(item)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
              <span class="date">{{item.friendlyCreatedAt}}</span>
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
  window.note_test = Notebooks
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
          this.$message({
            type: 'success',
            message: '成功创建新的笔记本: ' + title
          })
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
      onEdit(item) {
        let title = ''
        this.$prompt('请输入笔记本标题', '修改笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,301}$/,
          inputErrorMessage: '标题不能为空,且不能超哥30个字符'
        }).then(({
          value
        }) => {
          title = value
          return Notebooks.updateNotebook(item.id, {
            title
          })
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          item.title = title
        }).catch(res => {
          this.$message({
            type: res !== 'cancel' ? 'error' : 'info',
            message: res !== 'cancel' ? res.msg : '取消删除'
          })
        })
      },
      onDelete(item) {
        this.$confirm('此操作将该笔记本放入回收站, 是否继续?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return Notebooks.deleteNotebook(item.id)
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.notebooks.splice(this.notebooks.indexOf(item), 1)
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
