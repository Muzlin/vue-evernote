<template>
  <div id="note">
    <NoteSidebar/>
    <div class="note-detail">
      <div class="note-empty" v-show="true">请选择笔记</div>
      <div v-show="false">
        <div class="note-bar">
          <span> 创建日期：{{curNote.createdAtFriendly}}</span>
          <span> 更新日期：{{curNote.updateAtFriendly}}</span>
          <span>已保存</span>
          <span class='iconfont icon-trash'></span>
          <span class='iconfont icon-quanping'></span>
        </div>
        <div class="note-title">
          <input type="text" :value="curNote.title" placeholder="输入标题">

        </div>
        <div class="editor">
          <textarea :value="curNote.content" placeholder="输入内容 支持markdown"></textarea>
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

  export default {
    name: 'NoteDetail',
    components: {
      NoteSidebar
    },
    data() {
      return {
        curNote: {},
        notes: []
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
