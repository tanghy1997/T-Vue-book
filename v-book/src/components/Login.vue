<template>
<el-container class="login" style="height: 700px;padding:100px 20px;">
  <el-header  style="margin:2px auto;height:100px;text-align: center;font-size:30px;letter-spacing:5px;line-height:100px;">
    <h3>书城登陆界面</h3>
  </el-header>
  <el-main style="margin:10px auto;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" round>登陆</el-button>
    <el-button @click="resetForm('ruleForm')" round>重置</el-button>
    <el-button type="danger" @click="turnForm('ruleForm')" round>注册</el-button>
  </el-form-item>
  <el-form-item>

  </el-form-item>
  </el-form>
  </el-main>
</el-container>
</template>

<script>
import { setLogined } from '../utils/tools';
import { login } from '../services/new';

export default{
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true,message: '请输入密码', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm)
            .then(res => {
              console.log(res)
              if(res.data.status == 'y'){
                this.$message({
                duration:2000,
                message: res.data.msg,
                type: 'success'
              })
               setLogined(this.ruleForm.name);
                this.$router.push({
                name: 'Home'
              })
              }else{
                this.$message({
                message: res.data.msg,
                type: 'error'
             })
              }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    turnForm(formName) {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>
<style>

</style>

