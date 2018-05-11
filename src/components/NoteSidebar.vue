<template>
  <div id="note-sidebar">
    <div class="title">
      <span class="btn add-note">添加笔记</span>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- {{curBook.title}} -->
          1111
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="11">11</el-dropdown-item>
          <el-dropdown-item command="22">22</el-dropdown-item>
          <el-dropdown-item command="trash">回收站</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for='note in notes' v-bind:key="note">
        <router-link :to='`/note?noteId=${note.id}&notebookId=${curBook.id}`'>
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>

      </li>
    </ul>
  </div>
</template>

<script>
  import Notebooks from '../apis/notebook'
  import Notes from '../apis/notes'
  import Bus from '@/helpers/bus'
  export default {
    created() {

    },
    data() {
      return {
        notebooks: [],
        notes: [],
        curBook: {}
      }
    },
    methods: {
      handleCommand(md){
        console.log(cmd)
      }
    }
  }

</script>

<style lang='scss' scoped>
  @import "../assets/css/note-sidebar.scss"

</style>
