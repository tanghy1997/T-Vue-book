<template>
  <el-container class="register" style="height: 700px;padding:100px 20px;">
  <el-header style="margin:2px auto;height:100px;text-align: center;font-size:30px;letter-spacing:5px;line-height:100px;">书城注册页面</el-header>
  <el-main style="margin:10px auto;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="用户描述" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" round>提交</el-button>
    <el-button @click="resetForm('ruleForm')" round>重置</el-button>
  </el-form-item>
</el-form>
  </el-main>
  </el-container>
</template>
<script>
import { save } from '../services/new';
export default {
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      ruleForm: {
        name:'',
        pass: '',
        checkPass:'',
        desc:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min:2, max:5, message:'用户名长度为2-5字符',trigger: 'blur' }
        ],
        pass: [
            { required: true,validator: validatePass, trigger: 'blur' },
            { min:3, max:12, message:'密码长度为3-12字符',trigger: 'blur' }
        ],
        checkPass: [
            {  required: true,validator: validatePass2, trigger: 'blur' }
        ],
        desc: [
            { required: true, message: '请描述自己', trigger: 'blur' }
        ],
      }
    }
  },
   methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            save(this.ruleForm)
            .then(res => {
              if(res.data.status === 'y') {
                this.$message({
                  message: res.data.msg,
                  type:'success'
                });
                this.$router.push({
                  name:'Login',
                })
              }
            })
          } else {
            this.$message({
            message: '创建失败',
            type: 'error'
          });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style>

</style>

