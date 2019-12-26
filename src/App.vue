<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
    // 在DOM加载后，执行，获得window的高度，并减去header和tabbar的高度，
    // 96是自己在开发者模式看到的，header的height为 40，上下padding为 3，
    // tabbar的height为 50
    //this.setHeight()
  },
  // 监听,当路由发生变化的时候执行
  watch: {},
  methods: {
    
  }
}
</script>
<style lang="scss">
 
</style>
