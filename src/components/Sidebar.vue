<template>
  <div id="sidebar">
    <avatar/>
    <div class="icons">
      <router-link to="/note/1" title="笔记">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pen"></use>
        </svg>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-notebook"></use>
        </svg>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-trash"></use>
        </svg>
      </router-link>
    </div>

    <div class="logout" @click="onLogout">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-trash"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  import avatar from '@/components/Avatar'
  import Auth from '@/apis/auth'
  export default {
    components: {
      avatar
    },
    methods: {
      onLogout() {
        Auth.logout().then(data => {
          this.$router.push({
            path: '/login'
          })
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  #sidebar {
    position: relative;
    width: 56px;
    text-align: center;
    background-color: #2c333c;
    >.icons {
      margin-top: 16px;
      >a {
        padding: 8px 0;
        display: block;
        margin-top: 8px;
      }
      >.router-link-active {
        background-color: #5e6266;
        .icon {
          fill: #fff;
        }
      }
      .icon {
        width: 24px;
        height: 24px;
      }
    }
    >.logout {
      position: absolute;
      bottom: 24px;
      width: 100%;
      text-align: center;
      cursor: pointer;
      .iconfont {
        color: #fff;
      }
    }
  }

</style>
