<template>
    <div class="loadingStudy">
        <el-button
          type="primary"
          @click="openFullScreen1"
          v-loading.fullscreen.lock="fullscreenLoading">
          指令方式
        </el-button>
        <el-button
          type="primary"
          @click="openFullScreen2">
          服务方式
      </el-button>
    </div>
</template>
<script>
export default {
  name: 'loadingStudy',
  data () {
    return {
      fullscreenLoading: false
    }
  },
  methods: {
    openFullScreen1 () {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.$message.success('操作完成')
        this.fullscreenLoading = false
      }, 2000)
    },
    openFullScreen2 () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log(loading)
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
  }
}
</script>
