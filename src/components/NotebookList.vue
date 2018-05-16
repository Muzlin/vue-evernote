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
  import {mapState,mapActions,mapGetters} from 'vuex'

  export default {
    data() {
      return {
        //notebooks: []
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
      this.$store.dispatch('getNotebooks')
    },
    computed: {
      ...mapGetters(['notebooks'])
    },
    methods: {
      ...mapActions([
        'getNotebooks',
        'addNotebook',
        'updateNotebook',
        'deleteNotebook'
      ]),
      onCreate() {
        this.$prompt('请输入笔记本标题', '创建笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空,且不能超哥30个字符'
        }).then(({value}) => {
          this.addNotebook({title: value})
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
        }).then(({ value }) => {
          this.updateNotebook({notebookId: notebook.id,title: value})
        })
      },
      onDelete(notebook) {
        this.$confirm('此操作将该笔记本放入回收站, 是否继续?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNotebook({notebookId: notebook.id})
        })
      }
    }
  }

</script>


<style lang="scss" scoped>
  @import "../assets/css/notebook-list.scss";

</style>
