<template>
  <div id="note">
    <NoteSidebar/>
    <div class="note-detail">
      <div class="note-empty" v-show="false">请选择笔记</div>
      <div>
        <div class="note-bar">
          <span> 创建日期：</span>
          <span> 更新日期：</span>
          <span>1</span>
          <span class='iconfont icon-trash'></span>
          <span class='iconfont icon-quanping'></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题">

        </div>
        <div class="editor">
          <textarea placeholder="输入内容 支持markdown"></textarea>
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
      Auth.getInfo()
        .then(res => {
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
