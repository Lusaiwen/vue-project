<template>
  <div class="person-area">
    <el-card>
      <div slot="header"></div>
      <div class="person-menu">
        <el-col :span="left">
          <el-button
            icon="el-icon-s-fold"
            @click="handleShow"
            circle
          ></el-button>
          <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/person/personnal">个人信息</el-menu-item>
                <el-menu-item index="/person/changePwd">修改密码</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/person/mybook">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">我的借阅</span>
            </el-menu-item>

            <el-menu-item index="/person/setting">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>

        <el-col :offset="offset" :span="right">
          <router-view />
        </el-col>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  beforeRouteEnter(to, from, next) {
    // if (to.meta.isLogin) {
    console.log(to.meta.isLogin, from.name)
    // if (to.meta.isLogin && from.name == 'login') {
    //   next();
    // } else {
      console.log(to, from);
      next((vm) => {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('resolve执行');
            resolve(vm);
          }, 0);
        }).then((res) => {
          console.log('res的值', res);
          console.log('进入then');
          if (res.data) {
            console.log('进入个人中心');
            res.$router.push('/person/personnal');
          } else {
            console.log('未登录');
            res.$router.push('/login');
          }
        });
      });
    // }
    console.log(to, from);
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.data);
    if (this.data) {
      this.$router.options.routes[6].meta.isLogin = true;
      next((vm) => {
        console.log(vm);
      });
    } else {
      next((vm) => {
        vm.$router.replace('/login');
      });
    }
  },
  data() {
    return {
      isCollapse: true,
      left: 1,
      right: 18,
      offset: 5,
    };
  },
  computed: {
    ...mapState('loginUser', ['data']),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleShow() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.person-menu {
  display: flex;
}

.person-area {
  width: 85%;
}

@media only screen and (max-width: 992px) {
  .person-area {
    width: 100%;
  }
}
</style>
