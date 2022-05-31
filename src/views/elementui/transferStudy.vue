<template>
  <div class="transfer" style="float: left;padding: 50px">
    <div class="block">
      <el-transfer v-model="value1" :data="data1"></el-transfer>
    </div>
    <div class="block" style="margin-top: 30px">
      <el-transfer
        v-model="value2"
        :data="data2"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音">
      </el-transfer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const generateData1 = _ => {
      const data1 = []
      for (let i = 1; i <= 15; i++) {
        data1.push({
          key: i,
          label: `备用 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data1
    }
    const generateData2 = _ => {
      const data2 = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data2.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data2
    }
    return {
      data1: generateData1(),
      value1: [1, 4],
      data2: generateData2(),
      value2: [2, 6],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  }
}
</script>
