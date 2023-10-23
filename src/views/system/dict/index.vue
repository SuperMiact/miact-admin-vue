<template>
  <div>
    <div class="button-top">
      <el-button type="success" plain @click="addDictType" size="small">新增</el-button>
      <el-button type="primary" plain :disabled="selectionLength != 1" @click="updateDictType()" size="small">修改</el-button>
      <el-button type="danger" plain :disabled="selectionLength <= 0" @click="deleteDictType()" size="small">删除</el-button>
    </div>
    <div>
      <el-table ref="tableForm" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" row-key="id" border lazy>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="dictTypeName" label="字典名称" align="center"></el-table-column>
        <el-table-column prop="dictType" label="字典类型" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="updateDictType(scope.row)" type="text">修改</el-button>
            <el-button @click="setDictItem(scope.row)" type="text">配置</el-button>
            <el-button @click="deleteDictType(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryPerms.pageNo"
        :page-size="queryPerms.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
    <editDict ref="editDict" @submitDictType="submitDictType"></editDict>
  </div>
</template>

<script>
import { 
  queryDictType,
  saveDictType,
  updateDictType,
  delDictType
} from "@/api/system/dict"
import editDict from "./editDict";
export default {
  name: "dict",
  components: {
    editDict,
  },
  data() {
    return {
      tableData: [],
      queryPerms:{
        pageNo:1,
        pageSize:10
      },
      // 数据总条目
      pageTotal: 0,
      // 多选
      selectionList:[],
      selectionLength:0
    };
  },
  created() {
    this.getDictData();
  },
  methods: {
    getDictData() {
      queryDictType(this.queryPerms).then(res=>{
        if(res.code == '200'){
          this.tableData = res.results.data
          this.pageTotal = res.results.total
        }
      })
    },
    // 新增字典类型
    addDictType() {
      this.$refs.editDict.show()
    },
    submitDictType(data){
      if(!!data){
        if(data.id){
          updateDictType(data).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.getDictData()
            }
          })
        }else{
          saveDictType(data).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.getDictData()
            }
          })
        }
      }
    },
    // 更新字典类型
    updateDictType(data){
      this.$refs.editDict.show(!!data ? JSON.parse(JSON.stringify(data)) : this.selectionLength > 0 ? this.selectionList[0] : null)
    },
    // 删除字典类型
    deleteDictType(data) {
      this.$confirm("此操作将删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = !!data?[data.id]:this.selectionList.map(v=>v.id);
          delDictType(ids).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.getDictData()
            }else{
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          this.$message({type: "info",message: "已取消删除",});
        });
    },
    // 修改每页条数时 触发
    handleSizeChange(data) {
      console.log("size:" + data);
    },
    // 修改当前页数时 触发
    handleCurrentChange(data) {
      this.getDictData()
    },
    // 多选
    handleSelectionChange(val) {
      this.selectionList = val
      this.selectionLength = val.length
    },
    // 配置字典
    setDictItem(data){
      this.$router.push({
        path: '/dictItem', 
        query: {dictType: data.dictType}
      });
    },
  },
};
</script>
<style scoped>
.button-top{
  margin-bottom: 10px;
}
</style>