<template>
  <div>
    <div>
      <el-button style="margin-bottom: 10px" type="primary" plain @click="addDictType" size="small">新增</el-button>
    </div>
    <div>
      <el-table ref="tableForm" :data="tableData" style="width: 100%" row-key="id" border lazy>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="dictType" label="字典类型" align="center"></el-table-column>
        <el-table-column prop="dictTypeName" label="字典名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="updateDictType(scope.row)" type="text">修改</el-button>
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
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      queryPerms:{
        pageNo:1,
        pageSize:10
      },
      // 数据总条目
      pageTotal: 0,
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
      this.$refs.editDict.show(!!data?JSON.parse(JSON.stringify(data)):null)
    },
    // 删除字典类型
    deleteDictType(data) {
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {  
          delDictType(data.id).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.getDictData()
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
  },
};
</script>