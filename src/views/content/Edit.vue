<template>
  <!--2.这里id对应new Vditor('vditor',{...})的第一个参数vidtor-->
  <div>
    <div class="botton">
      <el-button-group style="float:right;width: 140px;"> 
        <button @click="toHome" class="botton1"><i class="el-icon-back"></i>返回</button>
        <button @click="submit" class="botton1">提交</button>
</el-button-group>
    
    </div>
    <div style="display:flex">
      <div class="collection">
        <div class="a">选择文集<i class="el-icon-reading"></i></div>
        <div v-for="(item, index) in collection" :key="index" style="background:white">
        <div @click="N(item.collection)" class="test">{{  item.collection }}</div>
      </div>

        <div>
          <el-button-group style="width:100%;margin-top: 40px;">

            <el-tooltip class="item" effect="dark" content="新建文集时会刷新页面哦！" placement="top-start">
              <el-button icon="el-icon-folder-add" style="width:50%" @click="centerDialogVisible = true"></el-button>
            </el-tooltip>
            <el-popover placement="top" width="160" v-model="visible">
              <p>您确定删除该文集吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteCollection">确定</el-button>
              </div>
              <el-button icon="el-icon-delete" style="width:50%"  slot="reference"></el-button>
            </el-popover>
          </el-button-group>
        </div>
      </div>
      <div class="content">
        <div></div>
        <div><input v-model="blog.title" class="title" placeholder="此处为标题内容……"></div>
        <div id="vditor" name="description" style="margin-top:20px"></div>
      </div>

    </div>
    <el-dialog title="新建文集" :visible.sync="centerDialogVisible" width="25%" center>
      <el-input v-model="classify.collection" placeholder="请输入文集名" maxlength="7"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCollection">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import axios from 'axios'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {urls} from '@/assets/js/urls.js'
export default {
  data() {
    return {
      user:{
        id:'',
        username:''
      },
      classify: {
        id: '',
        collection: '',
        author:''
      },
      blog: {
        title: '',
        content: '',
        collection: '',
        author:''
      },
      collection: [{
        id: '',
        collection: ''
      }],

      contentEditor: {},//3.声明一个变量
      centerDialogVisible: false,
      visible: false,
    }
  },

  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 700,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'ir',
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        'upload',
        'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        'content-theme',
        'code-theme',
        'export',
        {
          name: 'more',
          toolbar: [
            'fullscreen',
            'both',
            'preview',
            'info',
            'help',
          ],
        }],
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      //这里写上传
      upload: {
        accept: 'image/*,.mp3, .wav, .rar',
        url: urls(1)+'/blog/addImage',
        // linkToImgUrl: '/api/upload/fetch',
        filename(name) {
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
            replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
            replace('/\\s/g', '')
        },
        linkToImgCallback(responseText) {
          // console.log(responseText);
          console.log("api处理")
        },
        format(files, responseText) {
          // {"code":200,"msg":"添加成功","data":"D:\\test\\image\\BingWallpaper.jpg"}
          const json = JSON.parse(responseText)
          var name = json.name
          let nameurl = {};
          nameurl[json.name] = json.url;
          console.log(json);
          return JSON.stringify({
            "msg": "上传成功",
            "code": 200,
            "data": {
              "succMap": nameurl
            }
          })
        },

        error(msg) {
          console.log(msg + "上传失败了")
        }
      }
    },

    this.user.username =localStorage.getItem("username"),

      axios({
        method: 'post',
        url: urls(1) +'/collection/findAllCollection',
        data: this.user
      }).then((res) => {
        this.collection = res.data.data
      })
    )
    console.log(urls(1))
  },
  methods: {
    toHome(){
      this.$router.push("/home")
    },
    N(index) {
      this.blog.collection = index
      this.classify.collection=index
    },
    submit() {
      this.blog.content = this.contentEditor.getValue()
      this.blog.author=localStorage.getItem("username")
      axios({
        method: 'post',
        url: urls(1)+'/blog/addBlog',
        data: this.blog
      }).then((res) => {
        this.$notify({
          title: '成功',
          message: '保存成功！',
          type: 'success'
        });
        this.$router.push('/home')
      }).catch(err => {
        // 报错
        this.$notify.error({
          title: '添加失败',
          message: '当前网络出错'
        });
      })
    },
    addCollection() {
      this.classify.author=localStorage.getItem("username")
      axios({
        method: 'post',
        url: urls(1)+'/collection/addCollection',
        data: this.classify
      }).then((res) => {
      window.location.reload();
      }).catch(err => {
        // 报错
        this.$notify.error({
          title: '添加失败',
          message: '当前网络出错'
        });
      });
    },
    deleteCollection() {
      console.log(this.classify)
      axios({
        method: 'post',
        url: urls(1)+'/collection/deleteCollection',
        data: this.classify
      }).then((res) => {
      window.location.reload();
      }).catch(err => {
        // 报错
        this.$notify.error({
          title: '添加失败',
          message: '当前网络出错'
        });
      });
    },
    }
}
</script>
<style scoped>
.content {
  width: 70%;
  margin: 0 auto;
  margin-top: 20px
}

.title {
  border: 1px solid #CCCCCC;
  height: 50px;
  width: 100%;
  border-radius: 30px;
  text-align: center;
  font-size: 14pt;
  outline: none;
}

.title:focus {
  background-color: #F7F7F7;
}

.botton {
  width: 100%;
  background: #4D4D4D;
  height: 40px;
}

.collection {
  background: #F7F7F7;
  width: 12%;
  margin-top: 20px;
  height: 100%;
  border: 2px solid #CCCCCC;
}

.a {
  padding: 20px;
  font-weight: bold;
  color: #000;
}
.test {
  padding: 20px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10pt;
  cursor:pointer;
  color: #666666;
}
.test:hover{
  color: #000;
  background-color: #EEF5FF;
}
.botton1{
  width: 70px;
  background: #448FFF;
  height: 40px;
  border-right: 1px solid #88B8FF ;
  color: #fff;
  font-size: 10pt;
}
.botton1:hover{
  background:#88B8FF ;
}
@media screen and (max-width: 600px) {

.collection {
  display: none;
}

.content {
  width: 100%;
}
}
</style>