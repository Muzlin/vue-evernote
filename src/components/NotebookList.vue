<template>
  <div id="notebook-list">
   <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        msg: '笔记本列表页'
      }
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
