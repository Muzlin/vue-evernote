<template>
  <span :title="user.username">{{slug}}</span>
</template>

<script>
  export default {
    data: function () {
      return {
        user: {
          username: 'hunger'
        },
        slug: 'H'
      }
    }
  }

</script>

<style scoped>
  span {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: #f2b81c;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    margin-top: 16px;
  }

</style>
