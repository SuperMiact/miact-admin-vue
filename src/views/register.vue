<template>
  <el-form
    label-position="top"
    :model="registerForm"
    ref="loginForm"
    class="login-form"
    :rules="registerFormRules"
    @keyup.enter.native="submitForm('registerForm')"
  >
    <el-form-item label="邮箱" prop="name">
      <el-input
        type="text"
        v-model.trim="registerForm.name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model.trim="registerForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        style="width: 100%;margin-top: 30px;"
        type="primary"
        @click="submitForm('registerForm')"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      activeName: "second",
      registerForm: {
        name: "",
        password: ""
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      registerFormRules: {
        name: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      }
    };
  }
};
</script>
