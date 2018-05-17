<template>
  <div id="note-trash">
    <div class="note-sidebar">
      <div class="title">
        <span>回收站</span>
      </div>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="(note,index) in trashNotes" :key="index">
          <router-link :to='`/trash?noteId=${note.id}`'>
            <span class="date">{{note.friendlyUpdatedAt}}</span>
            <span class="title">{{note.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="note-detail">
      <div class="note-empty" v-show="!curTrashNote.id">请选择笔记</div>
      <div class="note-content">
        <div class="note-bar" v-if="curTrashNote.id">
          <span>创建日期: {{curTrashNote.friendlyCreatedAt}}</span>
          <span> | </span>
          <span>更新日期: {{curTrashNote.friendlyUpdatedAt}}</span>
          <span> | </span>
          <span>所属笔记本: {{belongTo}}</span>
          <a class="btn action" @click="onRevert">恢复</a>
          <a class="btn action" @click="onDelete">彻底刪除</a>
        </div>
        <div class="note-title">
          <span> {{curTrashNote.title}}</span>
        </div>
        <div class="editor">
          <div class="preview markdown-body" v-show="curTrashNote.id" v-html="compiledMarkdown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import MarkdownIt from 'markdown-it'

  let md = new MarkdownIt()

  export default {
    created(){
      this.checkLogin().then(()=>{
        return this.getTrashNotes()
      }).then(()=>{
        this.$store.commit('setCurTrashNoteId',{curTransNoteId:this.$route.query.noteId})
      }).then(()=>{
        this.getNotebooks()
      })
    },
    computed:{
      ...mapGetters([
        'trashNotes',
        'curTrashNote',
        'belongTo'
      ]),
      compiledMarkdown() {
        return md.render(this.curTrashNote.content + '')
      }
    },
    methods: {
      ...mapActions([
        'checkLogin',
        'getTrashNotes',
        'deleteTrashNote',
        'revertTrashNote',
        'getNotebooks'
      ]),
      onRevert() {
        this.revertTrashNote({trashNoteId:this.curTrashNote.id}).then(()=>{
          this.$router.replace({path:'/trash'})
        })
      },
      onDelete() {
        this.deleteTrashNote({trashNoteId:this.curTrashNote.id}).then(()=>{
          this.$router.replace({path:'/trash'})
        })
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.$store.commit('setCurTrashNoteId',{curTransNoteId: to.query.noteId})
      next()
    }
  }

</script>

<style lang="scss" scoped>
  @import "../assets/css/note-detail.scss";
  @import "../assets/css/note-sidebar.scss";
  #note-trash {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
    .note-bar {
      .action {
        float: right;
        margin-left: 10px;
        padding: 2px 4px;
        font-size: 12px;
      }
    }
  }

</style>
