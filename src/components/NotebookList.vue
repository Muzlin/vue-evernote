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
              <span class="date">{{item.createdAt}}</span>
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
        let title = window.prompt('创建笔记本')
        if (title.trim() === '') {
          alert('笔记本名不能为空')
          return
        }
        Notebooks.addNotebook({
          title
        }).then(res => {
          alert(res.msg)
          // Notebooks.getAll().then(res => {
          //   this.notebooks = res.data
          // })
          this.notebooks.push(res.data)
        })
      },
      onEdit(item) {
        let title = window.prompt('修改笔记本',item.title)
        if (title.trim() === '') {
          alert('笔记本名不能为空')
          return
        } else if (title.trim() === item.title) {
          alert('未做任何修改')
          return
        }
        Notebooks.updateNotebook(item.id,{title}).then(res=>{
          alert(res.msg)
          item.title = title
        })
      },
      onDelete(item) {
        if(window.confirm('是否确定删除?')){
          Notebooks.deleteNotebook(item.id).then(res=>{
            alert(res.msg)
            this.notebooks.splice(this.notebooks.indexOf(item),1)
          })
        }
      }
    }
  }

</script>


<style lang="scss" scoped>
  @import "../assets/css/notebook-list.scss";

</style>
