<template>
    <el-dialog ref="menuDig" title="编辑菜单" :visible.sync="showMenuModel" width="600px">
      <el-form label-position="right" label-width="80px" :model="formData">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单类型">
              <el-select v-model="formData.type" :disabled="showType" @change="changeType">
                <el-option 
                v-for="menuType in menuTypeList"
                :key="menuType.value"
                :label="menuType.label"
                :value="menuType.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" v-show="showAddr">
            <el-form-item label="地址">
              <el-input v-model="formData.url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限">
              <el-input v-model="formData.perms"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" v-show="showIcons">
            <el-form-item label="图标" prop="icon" >
              <i style="margin-right:10px" :class="formData.iconClass"/>
              <el-select style="width:35px" placeholder="请选择" v-model="formData.iconClass">
                <el-option
                  v-for="item in iconList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <i :class="item.label"></i>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" >
              <el-input v-model="formData.sortOrder"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="showAddr">
          <el-col :span="12">
            <el-form-item label="组件地址" >
              <el-input v-model="formData.componentAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-switch
                v-model="formData.status"
                :active-value="0"
                :inactive-value="1"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import {
  addMenu, 
  updateMenu, 
} from '@/api/system/menu'
import menuJson from '@/api/system/menu/menu.json'
export default{
    name:'editMenu',
    components:{},
    data(){
        return{
            type:'',
            showMenuModel:false,
            formData:{},
            showAddr:true,
            showIcons:true,
            showType:true,
            iconList:[],
            menuTypeList:[],
        };
    },
    created(){
      this.getMenuIconList()
    },
    methods:{
        show(type,data){
          this.type = type
          this.getEditMenu(type,data)
          this.showMenuModel = true
        },
        // 获取菜单和图标列表
        getMenuIconList(){
          this.iconList = menuJson.iconData
          this.menuTypeList = menuJson.menuTypeData
        },
        // 得到菜单数据
        getEditMenu(type,data){
          if(type == 'add'){
            let type = !data?0:data.type+1
            this.formData = {status: 0,pid: !data?0:data['id'],type:type}
            this.showType = this.formData.type != 2 ? false : true
            this.getAddShow(this.formData.type)
          }else{
            this.formData = data
            this.showType = true
            this.getUpdateShow(this.formData.type)
          }
        },
        // 修改菜单类型
        changeType(data){
          this.type == 'add' ? this.getAddShow(data) : this.getUpdateShow(data)
        },
        // 新增字段显示
        getAddShow(dataType){
          this.showAddr = this.showIcons = dataType != 2 ? true : false
        },
        // 修改字段显示
        getUpdateShow(dataType){
          this.showAddr = this.showIcons = dataType != 2 ? true : false
        },
        submitForm(){
            if (this.type === 'add') {
                addMenu(this.formData).then((res) => this.$emit('submitMenuForm',res.success,res.message))
            } else {
                updateMenu(this.formData).then((res) => this.$emit('submitMenuForm',res.success,res.message))
            }
            this.cancelForm()
        },
        cancelForm(){
            this.formData = {}
            this.showMenuModel = false
        },
    },
}
</script>