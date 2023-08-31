<template>
    <el-dialog title="权限分配" :visible.sync="dialogPermsVisible" width="380px">
      <el-tree :data="menuList" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="{children: 'childNode',label: 'name'}" @check="currentChecked"></el-tree>
      <div align="right">
        <el-button @click="cancelPerms">取 消</el-button>
        <el-button type="primary" @click="submitPerms">确 定</el-button>
      </div>
    </el-dialog>
</template>
<script>
import { getMenu } from "@/api/system/menu"
import { allotRolePermsByRoleId,allotRolePerms } from "@/api/system/role"
export default{
    name:'permsRole',
    components:{},
    data(){
        return{
            dialogPermsVisible:false,
            menuList:[],
            roleData:{},
            checkPermsList:[],
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        show(data){
            this.roleData = data
            this.getPermsRoleInfo()
            this.dialogPermsVisible = true
        },
        getMenuList(){
            getMenu().then((res) => this.menuList = res.results)
        },
        // 获取角色权限绑定信息
        getPermsRoleInfo(){
            allotRolePermsByRoleId(this.roleData.roleId).then((res) => {
                let data = res.results;
                this.$nextTick(() => {
                    if(!data){this.$refs.tree.setCheckedKeys([])}
                    else{
                        if (data.length == 0) this.$refs.tree.setCheckedKeys([]);
                        this.filterLeafNode(data);
                    }
                    this.checkPermsList = this.$refs.tree.getCheckedNodes(false, true);
                });
            });
        },
        // 过滤掉不是叶子节点的
        filterLeafNode(data){
            const nodes = data.map(item => {
                if (this.$refs.tree.getNode(item).isLeaf) return item
            })
            this.$refs.tree.setCheckedKeys(nodes, true);
        },
        // 获取当前选中的值
        currentChecked() {
            this.checkPermsList = this.$refs.tree.getCheckedNodes(false, true);
        },
        submitPerms(){
            let menuIds = this.checkPermsList.map(item=>item.id)
            allotRolePerms({menuIds:menuIds,roleId:this.roleData.roleId}).then((res) => {
                if(res.success == true){
                    this.$emit('submitPerms',true,res.message)
                }else{
                    this.$message.error(res.message)
                }
            });
            this.cancelPerms()
        },
        cancelPerms(){
            this.roleData = {}
            this.dialogPermsVisible = false
        },
    }
}
</script>