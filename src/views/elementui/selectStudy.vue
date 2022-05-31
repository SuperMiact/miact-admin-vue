<template>
  <div class="selectStudy">
      <div class="select1">
          <el-select v-model="data" placeholder="请选择"  style="padding:50px">
            <el-option
                v-for="item in items"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
          </el-select>
      </div>
      <div class="select2">
        <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-select v-model="filters.value1" clearable placeholder="请选择" @change="getRole($event)" style="padding-left: 50px">
                  <el-option
                    v-for="item in select1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
              <el-select v-model="filters.value2" :loading="loading" placeholder="请输入查询内容" @change="getList">
                  <el-option
                    v-for="item in select2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="fetchData(filters)" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    let select1 = [
      {value: 'role', label: '角色'},
      {value: 'version', label: '角色版本号'},
      {value: 'env', label: '环境'}
    ]
    let allrole = [
      {pro: 'role', label: 'pub'},
      {pro: 'role', label: 'core'},
      {pro: 'env', label: 'test'},
      {pro: 'pro', label: 'pro'},
      {pro: 'version', label: '1,1,2'},
      {pro: 'version', label: '1.1.1'}
    ]
    return {
      select1: select1,
      loading: false,
      filters: {
        value1: '',
        value2: ''
      },
      select2: [],
      allrole: allrole,

      data: '',
      items: [
        {label: '黄金糕', value: '1'},
        {label: '双皮奶', value: '2'},
        {label: '北京烤鸭', value: '3'}
      ]
    }
  },
  methods: {
    getRole (prov) {
      if (this.filters.value2) {
        this.filters.value2 = undefined
      }
      console.log(prov)
      let roles = []
      this.select2 = []
      for (var val of this.allrole) {
        if (prov === val.pro) {
          roles.push({label: val.label, value: val.label})
        }
      }
      this.select2 = roles
    },
    getList (opt) {
      console.log(opt)
    },
    fetchData (data) {
      console.log(data)
    }
  }
}
</script>
