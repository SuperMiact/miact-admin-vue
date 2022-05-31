<template>
  <div class="block" style="float: left;padding: 50px">
      <div class="block1">
        <el-radio-group v-model="data" @change="Changed">
            <el-radio v-for="(item, index) in items" :disabled="item.disabled" :key="index" :label="item.dictValue">{{item.dictLabel}}</el-radio>
        </el-radio-group>
      </div>
      <div class="block2">
        <el-radio-group v-model="data" @change="Changed" style="margin-top:50px">
            <el-radio-button v-for="(item, index) in items" :disabled="item.disabled" :key="index" :label="item.dictValue">{{item.dictLabel}}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="block3">
        <el-radio-group v-model="data" @change="Changed" style="margin-top:50px">
            <el-radio border v-for="(item, index) in items" :disabled="item.disabled" :key="index" :label="item.dictValue">{{item.dictLabel}}</el-radio>
        </el-radio-group>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      items: [
        {dictLabel: '选项1', dictValue: 1, disabled: true},
        {dictLabel: '选项2', dictValue: 2, disabled: false},
        {dictLabel: '选项3', dictValue: 3, disabled: false}
      ]
    }
  },
  methods: {
    Changed (value) {
      console.log(value)
    }
  }
}
</script>
