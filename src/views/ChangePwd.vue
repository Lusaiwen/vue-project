<template>
    <div class="changePwd-area">
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
export default {
    watch: {
        $route(to, form) {
            console.log(to, from);
        }
    }
};
</script>
