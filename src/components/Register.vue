<template>
  <div class="register-area">
    <el-card style="width: 100%">
      <div slot="header" class="title">注册页面</div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        status-icon
        class="demo-ruleForm"
      >
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :http-request="submitForm"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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

        <el-form-item prop="loginChessPwd">
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="form.loginChessPwd"
          >
            <template slot="prepend">确认密码:</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import tools from '../units/tools.js';
export default {
  data() {
    const validateLoginId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (value.length < 6) {
        callback(new Error('账户名小于六位'));
      }
      callback();
    };
    const validateLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length <= 6) {
        callback(new Error('密码小于等于六位'));
      }
      callback();
    };
    const validateLoginChessPwd = (rule, value, callback) => {
      console.log(this.form)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        // console.log(value, this.form.loginChessPwd);
        callback(new Error('两次密码不一致'));
      }
      callback();
    };
    return {
      imageUrl: '',
      form: {
        username: '',
        password: '',
        loginChessPwd: '',
        photo: '',
      },
      rules: {
        username: [
          { validator: validateLoginId, trigger: 'blur', required: true },
        ],
        password: [
          { validator: validateLoginPwd, trigger: 'blur', required: true },
        ],
        loginChessPwd: [
          { validator: validateLoginChessPwd, trigger: 'blur', required: true },
        ],
      },
    };
  },
  methods: {
    ...mapActions('loginUser', ['register']),
    handleChange(file, fileList) {
      const isJPG = file.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      //   return;
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      //   return;
      // }
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      const formData = new FormData();
      this.form.photo = file.raw;
      console.log(file, fileList);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          const formData = new FormData();
          formData.append('username', this.form.username);
          formData.append('password', this.form.password);
          formData.append('photo', this.form.photo);
          // const resp = await this.register(this.form);
          const resp = await this.register(formData);
          console.log(resp);
          if (resp.data.ret === 0) {
            alert('注册成功');
            tools.resetForm(this.form);
            this.$router.replace('/login');
          } else {
            alert('注册失败');
          }
        } else {
          alert('请检查信息是否填入');
          console.log(this.form);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.register-area {
  margin: 150px 0;
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-weight: bold;
  color: #303133;
}
.avatar-uploader .el-upload.el-upload--text {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  top: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

@media only screen and (max-width: 1200px) {
  .register-area {
    width: 60%;
  }
}

@media only screen and (max-width: 768px) {
  .register-area {
    width: 85%;
  }
}
</style>
