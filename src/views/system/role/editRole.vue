<template>
    <el-dialog ref="roleDig" title="编辑角色" :visible.sync="showRoleModel" width="380px">
      <el-form label-position="right" label-width="80px" :model="roleTable">
        <el-form-item label="角色名称">
            <el-input v-model="roleTable.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="roleTable.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>

export default{
    name:'editRole',
    components:{},
    data(){
        return{
            type:'',
            showRoleModel:false,
            roleTable:{},
        };
    },
    methods:{
        show(type,data){
            this.type = type
            this.roleTable = data
            this.showRoleModel = true
        },
        submitForm(){
            this.$emit('submitRoleForm',this.roleTable)
            this.cancelForm()
        },
        cancelForm(){
            this.type = ''
            this.roleTable = {}
            this.showRoleModel = false
        },
    }
}
</script>