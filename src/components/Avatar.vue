<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'

  export default {
    // 钩子函数 实例创建完成时候启用
    created(){
      this.checkLogin()
    },
    computed: {
      ...mapGetters([
        'username',
        'slug'
      ])
    },
    methods:{
      ...mapActions([
        'checkLogin'
      ])
    }
  }

</script>

<style lang="scss" scoped>
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
