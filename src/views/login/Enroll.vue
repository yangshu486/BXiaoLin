<template>
    <div class="login1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
                <el-input placeholder="请输入用户名" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input placeholder="请输入账号" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" style="margin-top:10%">
                <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item prop="email" style="margin-top:10%">
                <el-input placeholder="请输入您的邮箱(选填)" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="activeCode">
                <el-input placeholder="请输入验证码(选填)" v-model="ruleForm.activeCode" style="width:72%"></el-input>
                <el-button type="text" style="margin-left:6px" @click="getCode">获取验证码</el-button>
            </el-form-item>
            <el-form-item style="margin-top:10%;padding: 10px;">
                <el-button type="primary" style="width: 100%;border-radius: 30px;" @click="enroll">立即注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import { urls } from '@/assets/js/urls.js'
export default {
    data() {
        return {
            code: {
                to: '',
                subject: '邮箱验证码'
            },
            ruleForm: {
                name: '',
                username: '',
                password: '',
                email: '',
                activeCode: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                username: [
                    { required: true, message: '请输入用户账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' },

                ],

            }
        };
    },
    methods: {
        getCode() {
            this.code.to = this.ruleForm.email;
            console.log(this.code)
            axios({
                method: 'post',
                url: urls(1) + '/sendEmail',
                data: this.code
            }).then(res => {
                this.$message({
                    message: '请查看邮箱',
                    type: 'success'
                })
            }).catch(err => {
                this.$message.error('出错了！');
            })
        },
        enroll() {
            axios({
                method: 'post',
                url: urls(1) + '/enroll',
                data: this.ruleForm
            }).then(res => {
                if (res.data.code == 200) {
                    this.$router.push({path:"/",query:{user:this.ruleForm.username}})
                    window.location.reload();
                }else{
                    this.$message.error('验证码错误');
                }
            }).catch(err => {
                this.$message.error('此用户名重复');
            })
        }
    },

}

</script>
<style scoped>
.login1 {
    width: 70%;
    margin-top: 35px;
    margin-left: 15%;
    text-align: center;
    height: 40%;
}
</style>