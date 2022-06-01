<template>
    <div>
      <span>首页</span>
      <el-select v-model="UserSelect">
        <el-option
            v-for="data in UserList"
           :key="data.id"
           :value="data.id"
           :label="data.name"
        >
        </el-option>     
      </el-select>
    </div>
</template>
<script>
export default ({
  data () {
    return {
      UserList: [],
      UserSelect: ''
    }
  },
  created() {
    this.mockTest()
  },
  methods: {
    mockTest () {
      this.$axios.get('/user/selectUsers')
      .then(res => {
        this.UserList = res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
</script>
