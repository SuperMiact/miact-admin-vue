<template>
  <div>
    <div class="button-top">
      <el-button type="success" plain @click="addDictItem" size="small">新增</el-button>
      <el-button type="primary" plain :disabled="selectionLength != 1" @click="updateDictItem()" size="small">修改</el-button>
      <el-button type="danger" plain :disabled="selectionLength <= 0" @click="deleteDictItem()" size="small">删除</el-button>
    </div>
    <div>
      <el-table ref="tableForm" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" row-key="id" border lazy>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="dictLabel" label="字典项名称" align="center"></el-table-column>
        <el-table-column prop="dictValue" label="字典项值" align="center"></el-table-column>
        <!-- <el-table-column prop="dictType" label="字典类型" align="center"></el-table-column> -->
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="updateDictItem(scope.row)" type="text">修改</el-button>
            <el-button @click="deleteDictItem(scope.row)" type="text">删除</el-button>
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
    <editDictItem ref="editDictItem" @submitDictItem="submitDictItem"></editDictItem>
  </div>
  
</template>
<script>
import { 
  queryDictItem,
  saveDictItem,
  updateDictItem,
  delDictItem
} from "@/api/system/dict/dictItem"
import editDictItem from "./editDictItem"
export default {
  components:{
    editDictItem,
  },
  data () {
    return {
      // 表格数据
      tableData:[],
      // 查询条件
      queryPerms:{
        pageNo:1,
        pageSize:10,
        dictType:this.$route.query.dictType
      },
      // 总数
      pageTotal:0,
      // 多选数据
      selectionList:[],
      // 多选数据长度
      selectionLength:0,
    }
  },
  created(){
    this.getDictItemData()
  },
  methods:{
    // 修改每页条数时 触发
    handleSizeChange(data) {
      console.log("size:" + data);
    },
    // 修改当前页数时 触发
    handleCurrentChange(data) {
      this.getDictItemData()
    },
    // 获取字典子项数据
    getDictItemData(){
      queryDictItem(this.queryPerms).then(res=>{
        if(res.code == '200'){
          this.tableData = res.results.data
          this.pageTotal = res.results.total
        }
      })
    },
    // 多选
    handleSelectionChange(val) {
      this.selectionList = val
      this.selectionLength = val.length
    },
    // 新增字典项
    addDictItem(){
      this.$refs.editDictItem.show(null,this.queryPerms.dictType)
    },
    // 更新字典项
    updateDictItem(data){
      let selectionList = this.selectionLength > 0 ? this.selectionList[0] : null
      this.$refs.editDictItem.show(!!data ? JSON.parse(JSON.stringify(data)) : selectionList, this.queryPerms.dictType)
    },
    submitDictItem(data){
      if(!!data){
        if(data.id){
          updateDictItem(data).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.getDictItemData()
            }
          })
        }else{
          saveDictItem(data).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.getDictItemData()
            }
          })
        }
      }
    },
    // 删除字典项
    deleteDictItem(data){
      console.log(!!data?[data.id]:this.selectionList.map(v=>v.id))
      this.$confirm("此操作将删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = !!data?[data.id]:this.selectionList.map(v=>v.id);
          delDictItem(ids).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.getDictItemData()
            }else{
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          this.$message({type: "info",message: "已取消删除",});
        });
    },
  }
}
</script>
<style scoped>
.button-top{
  margin-bottom: 10px;
}
</style>