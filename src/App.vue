<template>
  <div id="app">
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>
  import sidebar from '@/components/Sidebar'
  export default {
    name: 'App',
    components: {
      sidebar
    }
  }

</script>

<style lang="scss">
  html,
  body,
  #app {
    height: 100%;
  }

  body {
    background-color: #eee;
  }

  a {
    color: #444;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .btn {
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    background-color: #fff;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    cursor: pointer;
    display: inline-block;
  }

  #app {
    display: flex;
    align-items: stretch;
  }

</style>
