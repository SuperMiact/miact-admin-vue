<template>
    <el-dialog ref="menuDig" :title="this.menuType" :visible.sync="showMenuModel" width="360px" center>
      <el-form label-position="right" label-width="80px" :model="formData" style="margin: 20px">
        <div align="left">
          <el-form-item label="菜单类型">
            <span v-html="menuType"></span>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" v-show="showAddr">
            <el-input v-model="formData.url"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-input v-model="formData.perms"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon" v-show="showIcons">
            <i :class="formData.iconClass"/>
            <!-- TODO 改成按钮选择 -->
            <el-select style="width:50%" placeholder="请选择" v-model="formData.iconClass">
              <el-option
                v-for="item in iconList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <i :class="item.label"></i>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" >
            <el-input v-model="formData.sortOrder"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="formData.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </div>
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
            iconList:[],
            menuType:'',
        };
    },
    props: {
      menuTypeList: {
        type: Array,
        default: () => [],
      },
    },
    created(){
      this.getIconList()
    },
    methods:{
        show(type,data){
          this.type = type
          this.getEditMenu(type,data)
          this.showMenuModel = true
        },
        // 获取图标列表
        getIconList(){
          this.iconList = menuJson.iconData
        },
        // 得到菜单数据
        getEditMenu(type,data){
          if(type == 'add'){
            this.menuType = !data?this.getLabelByValue(0):this.getLabelByValue(data.type+1)
            this.showAddr = this.showIcons = !data || data.type == 0 ? true : false
            this.formData = {status: 0,pid: !data?0:data['id']}
          }else{
            this.menuType = this.getLabelByValue(data.type)
            this.showAddr = this.showIcons = data.type != 2 ? true : false
            this.formData = data
          }
        },
        // 通过value获取label
        getLabelByValue(data){
          return this.menuTypeList.filter(v=>v.value == data)[0].label
        },
        submitForm(){
            if (this.type === 'add') {
                addMenu(this.formData).then((res) => this.$message('submitMenuForm',res.success,res.message))
            } else {
                updateMenu(this.formData).then((res) => this.$message('submitMenuForm',res.success,res.message))
            }
            this.cancelForm()
        },
        cancelForm(){
            this.menuType = ''
            this.formData = {}
            this.showMenuModel = false
        },
    },
}
</script>