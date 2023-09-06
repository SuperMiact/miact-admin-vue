<template>
    <el-dialog ref="dictTypeDig" title="编辑字典项" :visible.sync="showDictItemModel" width="380px">
      <el-form label-position="right" label-width="100px" :model="dictItemTable">
        <el-form-item label="字典类型">
            <el-input disabled v-model="dictItemTable.dictType"></el-input>
        </el-form-item>
        <el-form-item label="字典项名称">
            <el-input v-model="dictItemTable.dictLabel"></el-input>
        </el-form-item>
        <el-form-item label="字典项值">
            <el-input v-model="dictItemTable.dictValue"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea" :rows="3" v-model="dictItemTable.remark"></el-input>
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
      showDictItemModel:false,
      dictItemTable:{}
    }
  },
  methods:{
    show(data,type){
        if(!!data) this.dictItemTable = data
        this.dictItemTable.dictType = type
        this.showDictItemModel = true
    },
    submitForm(){
        this.$emit("submitDictItem",this.dictItemTable)
        this.cancelForm()
    },
    cancelForm(){
        this.showDictItemModel = false
        this.dictItemTable = {}
    },
  }
}
</script>
<style lang="scss" scoped>

</style>