<template>
  <div class="login-area">
    <el-card style="width: 100%">
      <div slot="header" class="title">登录页面</div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="请输入账号"
            v-model="form.username"
          >
            <template slot="prepend">账号:</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          >
            <template slot="prepend">密码:</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            @keyup.enter="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <div class="forget" @click="forgetPwd">
          忘记密码？
        </div>
        <div class="register" @click="$router.push('/register')">
          点击注册
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    console.log(this.data);
    // if (this.data && to.name == 'person') {
    //   console.log('this.data', this.data);
    //   to.meta.isLogin = true;
    // }
    next();
  },
  // beforeRouteLeave(to, from, next) {
  //   const answer = window.confirm(
  //     'Do you really want to leave? you have unsaved changes!'
  //   );
  //   if (answer) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // },
  data() {
    const validateLoginId = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入用户名'));
      }
      callback();
    };
    const validateLoginPwd = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { validator: validateLoginId, trigger: 'blur', required: true },
        ],
        password: [
          { validator: validateLoginPwd, trigger: 'blur', required: true },
        ],
      },
    };
  },
  computed: {
    ...mapState('loginUser', ['data', 'isLoading']),
  },
  methods: {
    ...mapActions('loginUser', ['login']),
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid && !this.isLoading) {
          // alert('submit!');
          const resp = await this.login(this.form);
          console.log(resp);
          if (resp.ret === 0) {
            console.log('登录成功');
            // localStorage.setItem('username', this.form.username);
            this.$router.push({
              name: 'person',
            });
          } else {
            alert('账号或密码错误');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    forgetPwd() {
      alert('不知道');
    },
  },
};
</script>

<style scoped>
.login-area {
  margin: 50px 0;
  width: 30%;
  display: flex;
  justify-content: center;
}

.title {
  font-weight: bold;
  color: #303133;
}

.login-footer {
  display: flex;
  line-height: 1;
  justify-content: space-between;
}

.login-footer .forget,
.login-footer .register {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  .login-area {
    width: 60%;
  }
}

@media only screen and (max-width: 768px) {
  .login-area {
    width: 85%;
  }
}
</style>
