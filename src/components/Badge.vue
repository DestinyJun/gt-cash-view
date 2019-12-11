<template>
  <div class="badge" v-bind:style="{width: width}">
    <div class="badge-icon">
      <i v-bind:class="[icon]"></i>
    </div>
    <div class="badge-title">
      <div class="badge-title-content">
        <p class="h5">{{content.title}}</p>
        <p class="h6">{{content.subtitle}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Badge',
    props: {
      width: {
        type: String,
        default: '30%'
      },
      icon: {
        type: String,
        default: ''
      },
      content: {
        type: Object,
        default: function () {
          return {title: String,subtitle: String}
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.badge{
  cursor: pointer;
  background-color: #fff;
  display: flex;
  padding: 8px;
  .badge-icon{
    min-height: 80px;
    flex: 2;
    background: #468E80;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    .icon{
      font-size: 2rem;
      font-weight: 300;
    }
  }
  .badge-title{
    min-height: 80px;
    flex: 3;
    color: #252525;
    .badge-title-content{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
