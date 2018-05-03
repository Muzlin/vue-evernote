<template>
  <div id="note-detail">
    <h1>{{msg}}:{{$route.params.id}}</h1>
  </div>
</template>

<script>
export default {
  data:function(){
    return{
      msg:'笔记详情'
    }
  }
}
</script>

<style lang="scss" scoped>
#note-detail{
  >h1{
    color: burlywood;
  }
}
</style>
