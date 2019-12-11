<template>
  <div class="loading">
    <b-spinner variant="light" label="Text Centered"></b-spinner>
  </div>
</template>

<script>
  export default {
    name: 'Loading'
  }
</script>

<style lang="scss">
  /*loading组件*/
.loading{
  z-index: 2099;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(14,33,35,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
