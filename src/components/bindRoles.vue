<template>
    <el-dialog ref="roleDig" title="选择角色" :visible.sync="showRoleModel" width="20%" center>
      <el-form label-position="right" label-width="70px" :model="roleData" style="margin: 20px">
        <div align="left">
          <el-form-item label="角色类型">
            <el-select v-model="roleData.roleId">
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <div slot="footer" class="dialog-role" style="margin-top: 50px">
            <el-button @click="closeRoleForm">取 消</el-button>
            <el-button type="primary" style="margin-left: 50px" @click="submitRoleForm">确 定</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
</template>
<script>
import { queryRoles } from "@/api/system/role";
import {bindRole} from "@/api/system/user";
export default {
    name: "bindRoles",
    components: {},
    data(){
        return{
            type:'',
            showRoleModel:false,
            roleList:[],
            roleData:{},
        }
    },
    created(){
        this.getRoleData()
    },
    methods: {
        show(type,data){
            this.type = type
            this.roleData = data
            this.showRoleModel = true
        },
        getRoleData(){
            queryRoles({pageNo:1,pageSize:100}).then((res) => {
                if (res.code === "200"){
                    this.roleList = res.results.data
                }
            });  
        },
        submitRoleForm(){
            let roleData = this.roleData
            let result = false
            bindRole(roleData.id, roleData.roleId).then((res) => {
                if(res.code == '200') result = true
            })
            this.$emit('submitRole',result)
            this.closeRoleForm()
        },
        closeRoleForm(){
            this.type = ''
            this.roleData = {}
            this.showRoleModel = false
        },
    }
}
</script>