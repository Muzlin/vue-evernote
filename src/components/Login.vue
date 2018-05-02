<template>
  <div id="login">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data: function () {
      return {
        msg: 'This is login page'
      }
    }
  }

</script>

<style lang="scss">
  #login {
    >h1 {
      color: red;
    }
  }

</style>
