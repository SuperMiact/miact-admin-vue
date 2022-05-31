<template>
    <div style="float: left;padding: 50px">
        <button @click="linkToHome">首页</button>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    linkToHome () {
      this.$router.push('/')
    }
  }
}
</script>
