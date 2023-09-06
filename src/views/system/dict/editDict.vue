<template>
    <el-dialog ref="dictTypeDig" title="编辑字典" :visible.sync="showDictTypeModel" width="380px">
      <el-form label-position="right" label-width="80px" :model="dictTypeTable">
        <el-form-item label="字典名称">
            <el-input v-model="dictTypeTable.dictTypeName"></el-input>
        </el-form-item>
        <el-form-item label="字典类型">
            <el-input v-model="dictTypeTable.dictType"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea" :rows="3" v-model="dictTypeTable.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
export default {
  data () {
    return {
        showDictTypeModel:false,
        dictTypeTable:{}
    }
  },
  methods:{
    show(data){
        if(!!data) this.dictTypeTable = data
        this.showDictTypeModel = true
    },
    submitForm(){
        this.$emit("submitDictType",this.dictTypeTable)
        this.cancelForm()
    },
    cancelForm(){
        this.showDictTypeModel = false
        this.dictTypeTable = {}
    },
  }
}
</script>
<style lang="scss" scoped>

</style>