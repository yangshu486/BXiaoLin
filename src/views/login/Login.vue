<template>
    <div class="login1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input placeholder="请输入账号" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" style="margin-top:10%">
                <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item style="margin-top:10%;padding: 10px;">
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;border-radius: 30px">登录
                </el-button>
            </el-form-item>
            <el-button type="text">忘记密码</el-button>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import {urls} from '@/assets/js/urls.js'
export default {
    data() {
        return {
            token: '',
            ruleForm: {
                username: '',
                password: '',

            },
            rules: {
                username: [
                    { required: true, message: '请输入用户账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' },

                ],

            }
        };
    },
    created(){
        let username =localStorage.getItem("username");
        let token=localStorage.getItem("password");
        if(username!==null){
            this.$router.push('/home')
        }else{
            console.log("no")
        }
    },
    mounted(){
        this.ruleForm.username=this.$route.query.user
    },
    methods: {
        submitForm() {
            // 表单验证成功
            axios({
                method: 'post',
                url: urls(1)+'/login',
                data: this.ruleForm
            }).then(res => {
                // 拿到结果
                localStorage.setItem("token", res.data.data)
                localStorage.setItem("username",this.ruleForm.username)
                // 判断结果
                if (res.data.code == 200 && res.data.code != " ") {

                    /*登陆成功*/
                    this.$notify({
                        title: '登录成功',
                        message: '欢迎回来！',
                        type: 'success'
                    });
                    /*跳转页面*/
                    this.$router.push('/home')
                } 
            }).catch(err => {
                // 报错
                this.$notify.error({
                    title: '登录失败',
                    message: '您的账号或密码错误'
                });
            })
        }

    }
}
</script>
<style scoped>
.login1 {
    width: 70%;
    margin-top: 35px;
    margin-left: 15%;
    text-align: center;
    height: 40%;
    background-color: rgba(255, 255, 255, 0.2);
}


</style>