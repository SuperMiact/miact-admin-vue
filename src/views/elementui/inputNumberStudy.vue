<template>
    <div class="block" style="float: left;padding: 50px">
        <div class="block1">
            <div>计数器</div>
            <el-input-number :min="1" :max="10" :step="2" v-model="data1" label="描述"></el-input-number>
        </div>
        <div class="block2" style="margin-top:50px">
            <div>精度</div>
            <el-input-number :step="0.01" :precision="2" v-model="data2" label="描述"></el-input-number>
        </div>
        <div class="block3" style="margin-top:50px">
            <div>按钮位置</div>
            <el-input-number controls-position="right" v-model="data3" label="描述"></el-input-number>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      data1: '',
      data2: '',
      data3: ''
    }
  }
}
</script>
