<template>
  <div class="layout">
    <Main v-if="!$route.meta.showNav"/>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>
<script>

import Main from "@/views/main-page/main"

export default {
  name: "App",
  components: {
    Main
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
  },
};
</script>
<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Microsoft YaHei;
}
</style>
