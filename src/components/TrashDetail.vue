<template>
  <div id="note-trash">
    <h1>{{msg}}:{{$route.query.noteId}}</h1>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
  export default {
    data: function () {
      return {
        msg: '回收站'
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

<style lang="scss" scoped>
  #note-trash {
    >h1 {
      color: cyan;
    }
  }

</style>
