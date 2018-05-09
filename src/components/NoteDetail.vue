<template>
  <div id="note-detail">
    <h1>{{msg}}:{{$route.params.id}}</h1>
  </div>
</template>

<script>
  import Auth from '@/apis/auth'
  export default {
    data: function () {
      return {
        msg: '笔记详情'
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
  #note-detail {
    >h1 {
      color: burlywood;
    }
  }

</style>
