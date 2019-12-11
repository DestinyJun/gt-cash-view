<template>
  <div class="header">
    <i class="icon iconfont mr-3" :class="[icon[0]]" @click="routerBack('back')"></i>
    <i class="icon iconfont mr-3" :class="[icon[1]]"></i>
    <span>{{title}}</span>
    <!--<span class="float-right pr-2 pl-2" @click="routerBack('login')" style="">退出</span>-->
    <img
      ref="image"
      src="@/assets/images/xz.jpg"
      class="rounded-circle float-right" alt="头像"
      @click="dropdownShow($event.target)">
    <div ref="dropdown" class="dropdown position-absolute" v-show="d_dropdownShow">
      <!--<p class="pb-2 pt-2 mb-0 h6" @click="dropdownOperate('pass')">修改密码</p>-->
      <p class="pb-2 pt-2 mb-0 h6" @click="dropdownOperate('out')">退出</p>
    </div>
    <!--密码修改弹窗-->
    <b-modal
      title="用户密码修改"
      title-class="h6"
      id="password-update"
      centered size="md"
      no-clise-on-backdrop>
      <template slot="default">
        <form ref="fromline">
          <!--原密码-->
          <div class="form-group row pl-3 pr-3">
            <label for="oldPassword" class="col-sm-3 col-form-label" style="font-size: 0.8rem">原密码</label>
            <div class="col-sm-9">
              <input type="password" class="form-control" id="oldPassword" name="goodsCode" v-model="d_updatePassword.oldPassword">
            </div>
          </div>
          <!--新密码-->
          <div class="form-group row pl-3 pr-3">
            <label for="newPassword" class="col-sm-3 col-form-label" style="font-size: 0.8rem">新密码</label>
            <div class="col-sm-9">
              <input type="password" class="form-control" id="newPassword" name="goodsName" v-model="d_updatePassword.newPassword">
            </div>
          </div>
        </form>
      </template>
      <template slot="modal-footer" slot-scope="{ close }">
        <b-btn variant="success" class="pl-5 pr-5 mr-5" @click="close();dropdownOperate('update')">确定</b-btn>
        <b-btn variant="danger" class="pl-5 pr-5" @click="close()">取消</b-btn>
      </template>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        d_dropdownShow: false,
        d_updatePassword: {
          userId: this.$localStorage.get('userCode'),
          newPassword: null,
          oldPassword: null,
        }
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods: {
      dropdownShow() {
        this.d_dropdownShow = true
      },
      dropdownOperate(type){
        switch (type) {
          case 'update':
            this.post('/user/updateuserpassword', this.d_updatePassword)
              .then(() => {
                this.reset_form(this.d_updatePassword);
                this.$bvModal.msgBoxOk(
                  '密码修改成功！',
                  {
                    title: '操作提醒', // 标题
                    centered: true, // 弹窗是否居中
                    hideHeaderClose: false, // 是否隐藏头部关闭按钮
                    headerBgVariant: 'success', // 头部背景
                    headerTextVariant: 'light', // 头部文字
                    headerCloseVariant: 'light', // 头部关闭按钮
                    size: 'sm', // 框尺寸
                    buttonSize: 'sm', // 按钮尺寸
                    okTitle: '关闭', // 确认按钮内容
                    okVariant: 'danger', // 确认按钮样式
                    footerClass: ['p-3'],
                  })
                  .then(value => {
                  })
                  .catch((err) => {
                  })
                this.stInputReset();
              })
              .catch((err) => {})
            break
          case 'pass':
            this.$bvModal.show('password-update');
            this.d_dropdownShow = false
            break
          case 'out':
            this.d_dropdownShow = false
            this.$router.push('/login')
            this.$localStorage.remove('userCode')
            this.$localStorage.remove('merchatCode')
            this.$localStorage.remove('routers')
            break
        }
      },
      routerBack: function (type) {
        switch(type) {
          case 'back':
            this.$router.back(-1)
            break
        }
      },
      testClick(event) {
        if (!(this.$refs.image.contains(event.target)) || !(this.$refs.dropdown.contains(event.target))) {
          this.d_dropdownShow = false
        }
      }
    },
    created () {
      document.addEventListener('click',this.testClick,true)
    },
    destroyed () {
      document.removeEventListener('click',this.testClick,true);
    }
  }
</script>

<style lang="scss">
  /*header组件*/
  .header{
    height: 60px;
    background-color: #FEFFF9;
    border-bottom: 1px solid #ECECEC;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 0 15px;
    position: relative;
    &:nth-child(1){
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
    }
    img{
      width: 50px;
      height: auto;
      margin-left: auto;
    }
    .dropdown{
      width: 150px;
      height: auto;
      right: 0;
      top:61px;
      z-index: 2099;
      background-color: rgba(74,123,117,0.8);
      p{
        color: white;
        cursor: pointer;
        font-size: 0.85rem;
      }
      p:hover{
        background-color: rgba(254,255,249,0.3);
      }
    }
  }
</style>
