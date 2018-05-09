<template>
  <span :title="user.username">{{slug}}</span>
</template>

<script>
  import Auth from '@/apis/auth'
  import Bus from '@/helpers/bus'
  export default {
    data: function () {
      return {
        user: {
          username: '未登录'
        }
      }
    },
    // 钩子函数 实例创建完成时候启用
    created(){
      // 获取用户信息
      Auth.getInfo().then(res=>{
        if(res.isLogin){
          this.user.username = res.data.username
        }
      }),
      // 监听Bus 实例上的定义事件 将由$emit 触发 --- 这里是由login组件 登录成功触发回调
      Bus.$on('userInfo',user => {
        this.user.username = user.username
      })
    },
    computed: {
      slug() {
        return this.user.username.charAt(0)
      }
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
