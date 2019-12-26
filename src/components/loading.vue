<template>
  <div id="loading-container" v-show="$store.state.loading">
    <div class="loader" :data-text="text" data-half></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    text: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<style scoped>
@import '../assets/css/loading.css';
</style>
