<template>
  <div class="card-panel mb-2">
    <!--:style="{'width':width,height: height}"-->
    <img src="@/assets/images/青椒肉丝.png" class="rounded" alt="图片地址无效">
    <p class="title mb-0">{{item.title}}</p>
    <p class="price mb-0 text-danger">{{item.price}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      item: {
        type: Object,
        default: function () {
          return {
            title: '青椒肉丝',
            imgUrl: '../assets/images/青椒肉丝.png',
            price: '28.00'
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.card-panel{
  width: 100%;
  height: auto;
  border: 1px solid red;
  img{
    width: 100%;
    font-size: 0.8rem;
  }
}
</style>
