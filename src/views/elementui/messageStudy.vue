<template>
<div class="messageStudy"  style="float: left;padding: 50px">
    <div class="block">
        <p>基本</p>
        <el-button :plain="true" @click="open">打开消息提示</el-button>
        <el-button :plain="true" @click="openVn">VNode</el-button>
    </div>
    <div class="block">
      <p>使用HTML片段</p>
      <el-button :plain="true" @click="openHTML">使用HTML片段</el-button>
    </div>
</div>

</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    open () {
      this.$message('这是一条消息!')
    },
    openVn () {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    },
    openHTML () {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>'
      })
    }
  }
}
</script>
