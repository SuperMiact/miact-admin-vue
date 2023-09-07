<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">Miact-Admin</div>
          <div class="tips">Vue2.0 后台管理系统</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :model="loginForm"
        ref="loginForm"
        class="login-form"
        :rules="loginFormRules"
        @keyup.enter.native="submitForm('loginForm')"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model.trim="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%; margin-top: 30px"
            type="primary"
            @click="submitForm('loginForm')"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";
import Cookies from "js-cookie";

export default {
  name: "login",
  components: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then((res) => {
              if (res.code === "200") {
                this.$message.success(res.message);
                Cookies.set("Auth-Token", res.results, {expires: 7});
                this.$router.push("/home");
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((res) => {
              console.log(res);
            });
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}

.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 40px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-form >>> .el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form >>> .el-form-item {
  margin-bottom: 10px;
}
</style>
