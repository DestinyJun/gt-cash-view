<template>
  <div class="login">
    <form class="login-form pl-2 pr-2 pt-5 rounded">
      <!--半圆效果-->
      <div class="form-circle rounded-circle">
        <span class="icon iconfont iconshouyintai"></span>
      </div>
      <!--标题-->
      <div class="form-group">
        <span>请先登录以进行管理</span>
      </div>
      <!--用户名-->
      <div class="form-group">
        <label for="user" class="sr-only"></label>
        <input
          type="text" class="form-control"
          v-model="d_loginForm.user"
          placeholder="请输入用户名" name="user" id='user'>
        <span class="text-danger" v-if="d_loginError.user_error">用户名是必填项</span>
      </div>
      <!--密码输入-->
      <div class="form-group mt-3">
        <label for="user" class="sr-only"></label>
        <input
          type="password" class="form-control"
          v-model="d_loginForm.password"
          placeholder="请输入密码" name="password" id='password'/>
      </div>
      <!--记住密码及忘记密码-->
      <div class="form-check mt-3">
        <toggle-button
          :value="false"
          name="switch"
          :labels="{unchecked: '否',checked: '是'}"
          :color="{checked: '#28A745', unchecked: '#DC3545'}"
          :width="50"
          :height="20"
          @change="loginSwitchChange($event)"
        />
        <span class="align-middle ml-2">记住我</span>
        <span class="align-middle float-right">忘记密码</span>
      </div>
      <!--登陆按钮-->
      <div class="form-group mt-3">
        <button type="button" class="btn btn-block btn-primary" @click="loginClick()">登陆</button>
      </div>

    </form>
  </div>
</template>
<script src="./login.component.js"></script>
<style scoped lang="scss">
  @import "login.component";
</style>
