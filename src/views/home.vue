<template>
    <div>首页{{this.mockTest()}}</div>
</template>
<script>
export default ({
  data () {
    return {

    }
  },
  methods: {
    mockTest () {
      this.$axios.get('/user/selectUsers')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
</script>
