<template>
  <div id="note">
    <!-- 获取子组件的notes数据 -->
    <NoteSidebar @watch:notes="val => notes = val" />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div  class="note-content" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期：{{curNote.createdAtFriendly}}</span>
          <span> 更新日期：{{curNote.updatedAtFriendly}}</span>
          <span>{{statusText}}</span>
          <span @click="onDeleteNote" class='iconfont icon-trash'></span>
          <span @click="markdown" :class="`iconfont ${isShowPreview?'icon-tuichuquanping':'icon-quanping'}`"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入标题">

        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入内容 支持markdown"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import NoteSidebar from '@/components/NoteSidebar'
  import _ from 'lodash' // 截流模块
  import MarkdownIt from 'markdown-it'
  import { mapGetters,mapActions } from 'vuex'

  let md = new MarkdownIt()

  export default {
    name: 'NoteDetail',
    components: {
      NoteSidebar
    },
    data() {
      return {
        statusText:'未改动',
        isShowPreview: false
      }
    },
    computed:{
      ...mapGetters([
        'notes',
        'curNote'
      ]),
      previewContent(){
        return md.render(this.curNote.content+'')
      }
    },
    created() {
      this.checkLogin()
      // 设置当前笔记id
      this.$store.commit('setCurNoteId',{noteId: this.$route.query.noteId})
    },
    beforeRouteUpdate(to, from, next) {
      this.$store.commit('setCurNoteId',{noteId: to.query.noteId})
      next()
    },
    methods:{
      ...mapActions([
        'updateNote',
        'deleteNote',
        'checkLogin'
      ]),
      // 用户输入的时候自动保存
      // 这里使用截流函数 保持一定的事件内调用更新接口
      onUpdateNote: _.debounce(function(){
        this.updateNote({
          noteId: this.curNote.id,
          title: this.curNote.title,
          content: this.curNote.content
        }).then(()=>{
          this.statusText = '已保存'
        }).catch(()=>{
          this.statusText = '保存失败'
        })
      },500),
      onDeleteNote(){
        this.deleteNote({noteId:this.curNote.id}).then(()=>{
          this.$router.replace({path:'/note'})
        })
      },
      markdown(){
        this.isShowPreview = !this.isShowPreview
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
