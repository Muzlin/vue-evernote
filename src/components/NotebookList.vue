<template>
  <div id="notebook-list">
   <h1>{{msg}}</h1>
  </div>
</template>

<script>
  import Auth from '@/apis/auth'
  export default {
    data: function () {
      return {
        msg: '笔记本列表页'
      }
    },
    created(){
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
#notebook-list{
  >h1{
    color: blue;
  }
}

</style>
