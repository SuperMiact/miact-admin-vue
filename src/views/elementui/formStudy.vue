<template>
    <div class="formStudy"  style="float: left;padding: 50px;width: 70%">
        <div class="form">
            <p>基本表单</p>
            <el-form ref="form" :model="form">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="form">
            <p>行内表单</p>
            <el-form ref="form" :inline="true" :model="form">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="form">
            <p>对齐方式</p>
            <el-form ref="form" :label-position="labelPosition" :model=form>
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-button type="primary" @change="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form>
        </div>
        <div class="form">
            <p>表单验证</p>
            <el-form ref="form" :rules="rules" :model=form>
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="resetForm('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="form">
            <p>自定义表单验证</p>
            <el-form ref="form" status-icon :rules="custRules" :model=form>
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动地址" prop="address">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="resetForm('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
            <div class="form">
            <p>动态增减表单项</p>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
            <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
            >
                <el-input style="width: 50%" v-model="dynamicValidateForm.email"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :label="'域名' + index"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                required: true, message: '域名不能为空', trigger: 'blur'
                }"
            >
            <el-input style="width: 50%" v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="addDomain">新增域名</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入活动名称'))
      } else if (value.split('').length < 2) {
        callback(new Error('活动名称长度不能小于 2'))
      } else {
        if (this.form.name !== '') {
          this.$refs.form.validateField('name')
        }
        callback()
      }
    }
    var validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入活动地址'))
      } else {
        if (this.form.address !== '') {
          this.$refs.form.validateField('address')
        }
        callback()
      }
    }
    return {
      form: {name: 'aaa', address: 'test-address'},
      labelPosition: 'right', // left、top
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        address: {required: true, message: '请输入活动地址', trigger: 'blur'}
      },
      custRules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        address: [
          { validator: validateAddress, trigger: 'blur' }
        ]
      },
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>
<style>
    .form {
        border: 1px solid #797979;
        padding: 10px;
        margin-bottom: 10px;
    }
</style>
