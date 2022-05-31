<template>
  <div class="block">
    <div class="block1">
        <p style="font-weight:bold">输入框</p>
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
    </div>
    <div class="block2">
        <p style="font-weight:bold">可清空输入框</p>
        <el-input v-model="input2" placeholder="请输入内容" clearable></el-input>
    </div>
    <div class="block3">
        <p style="font-weight:bold">密码输入框</p>
        <el-input v-model="input3" placeholder="请输入密码" show-password></el-input>
    </div>
    <div class="block4">
        <p style="font-weight:bold">带图标的输入框</p>
        <el-input v-model="input4" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        <el-input v-model="input5" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
    </div>
    <div class="block5">
        <p style="font-weight:bold">文本域</p>
        <el-input type="textarea" v-model="input6" placeholder="请输入内容" :rows=5></el-input>
    </div>
    <div class="block6">
        <p style="font-weight:bold">可自适应文本高度的文本域</p>
        <el-input type="textarea" v-model="input7" placeholder="请输入内容" autosize></el-input>
        <el-input type="textarea" v-model="input8" placeholder="请输入内容" :autosize="{minRows: 2,maxRows: 4}"></el-input>
    </div>
    <div class="block7">
        <p style="font-weight:bold">复合型输入框</p>
        <el-input placeholder="请输入内容" v-model="input9">
            <template v-slot:prepend>Http://</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="input10">
            <template v-slot:append>.com</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="input11" style="width:30%" class="input-with-select">
            <template v-slot:prepend>
                <el-select v-model="select" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select>
            </template>
            <template v-slot:append>
                <el-button icon="el-icon-search">搜索</el-button>
            </template>
        </el-input>
    </div>
  </div>
</template>
<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
export default {
  name: 'inputStudy',
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      input10: '',
      input11: '',
      select: '1'
    }
  }
}
</script>
