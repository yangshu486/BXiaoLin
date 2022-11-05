<template>
    <div class="image">
        <div>
            <el-upload :action="urls" list-type="picture-card" :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" :http-request="(param) => addImage(param)">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>

        <div>
            <el-row>
                <el-col :span="8" v-for="(item, index) in user1" :key="index">

                    <el-card> 
                        <el-image :src="item.url" class="image1" :preview-src-list="srcList" @click="test2(item.url)"> </el-image>
                        <div style="">
                            <el-button type="text" icon="el-icon-delete" @click="deleteImage(item.url)"></el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>





    </div>
</template>
<script>
import axios from 'axios';
import { urls } from '@/assets/js/urls.js'
export default {
    data() {
        return {
            srcList: ['',],
            user: {
                author: '',
                url: ''
            },
            user1: [{
                url: ''
            }],
            urls: '',
            fileList: '',
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    mounted() {
        this.user.author = localStorage.getItem("username");
        axios({
            method: 'post',
            url: urls(1) + '/image/findAllByUrl',
            data: this.user
        }).then(res => {
            console.log(res)
            this.user1 = res.data
            console.log(this.user1)
        }).catch(err => {
            // 报错
            this.$notify.error({
                title: '错误',
                message: '网络错误'
            });
        })
    },
    methods: {
        test2(url){
            console.log(url)
            this.srcList[0]=url
            console.log(this.srcList)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        addImage(param) {
            if (param.file !== '') {
                var formData = new FormData()
                formData.append('imageData', param.file);
                formData.append('imageName', this.user.author);
                //单个文件进行上传
                axios.post(urls(1) + '/image/addImage', formData,
                    ).then(response => {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    window.location.reload();
                }).catch(err => {
                    // 报错
                    this.$notify.error({
                        title: '添加失败',
                        message: '当前网络出错'
                    });
                })
            }
        },
        deleteImage(url) {
            this.user.url = url;
            axios({
                method: 'post',
                url: urls(1) + '/image/deleteImage',
                data: this.user
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                // 报错
                this.$notify.error({
                    title: '错误',
                    message: '网络错误'
                });
            })
        }
    }
}
</script>
<style scoped>
.image {
    margin-top: 30px;
    padding: 10px;
    border-radius: 20px;
    margin-left: 20px;
    text-align: center;
    height: 100%;
}

.image1 {
    width: 100%;
}

.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>