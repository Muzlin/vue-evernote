<template>
  <div id="note-trash">
    <h1>{{msg}}:{{$route.params.id}}</h1>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        msg: '回收站'
      }
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
