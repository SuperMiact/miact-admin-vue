<template>
  <div>
    <div>
      <el-table ref="tableForm" :data="tableData" style="width: 100%" row-key="id" border lazy>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="dictType" label="字典类型" align="center"></el-table-column>
        <el-table-column prop="dictTypeName" label="字典名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

  <script>

export default {
  name: "dict",
  components: {},
  inject: ["reload"],
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getDictData();
  },
  methods: {
    getDictData() {

    },
    // 保存字典
    submitDictForm() {
    },
    // 删除字典
    deleteDict() {

    },
  },
};
</script>