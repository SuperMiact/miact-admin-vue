<template>
  <div class="dateStudy">
    <div class="block1">
    <div>日期范围选择器</div>
    <el-date-picker
      v-model="datesOne"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      size="small"
      @change="dateChange">
    </el-date-picker>
    </div>
    <div class="block1" style="margin-top:10px">
      <div>带快捷选项</div>
      <el-date-picker
        v-model="datesTwo"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        value-format="yyyy-MM-dd"
        size="small"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      datesOne: [],
      dateStart: '',
      dateEnd: '',
      datesTwo: [],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    dateChange (data) {
      this.dateStart = data[0]
      this.dateEnd = data[1]
      console.log(this.dateStart)
      console.log(this.dateEnd)
    }
  }
}
</script>
