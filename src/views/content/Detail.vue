<template>
  <div style="display: flex;margin-top: 20px; ">
    <div class="blog">
      <div class="title">{{ blog.title }}</div>
      <div class="time">作者：{{ author }} 日期：{{ blog.updateTime }}</div>
      <div class="content" id="preview"></div>
    </div>
    <div class="collection">
      <div class="c1">The greatest test of courage on earth is to bear defeat without losing heart.</div>
      <div style=" padding: 10px;text-align: center;">此类文章<i class="el-icon-reading"></i></div>

      <div v-for="(item, index) in essay" :key="index" style="background:#fff">
        <div @click="toNewEssay(item.id)" class="test">{{ item.title }}</div>
      </div>
      <div>
        <el-button-group style="width:100%;margin-top: 20px;">
          <el-button icon="el-icon-edit" style="width:50%"></el-button>
          <el-button icon="el-icon-delete" style="width:50%" @click="deleteEssay"></el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { urls } from '@/assets/js/urls.js'
export default {
  data() {
    return {
      test: {
        id: '',
        username: ''
      },

      author: '',

      blog: {
        id: '',
        title: '',
        updateTime: '',
        content: '',
        collection: ''
      },

      essay: [{
        id: '',
        title: '',
      }],

      classify: {
        collection: '',
        author: ''

      }
    }
  },
  methods: {

    deleteEssay() {
      this.test.id = this.$route.query.id
      console.log(this.test)
      axios({
        method: 'delete',
        url: urls(1) + '/blog/deleteEssay',
        data: this.test
      }).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.$router.push("/home")
      })
    },
    toNewEssay(id) {
      this.$router.push({ path: "/jump", query: { id: id } })
    },
    renderMarkdown(md) {
      Vditor.preview(document.getElementById("preview"), md, {
        hljs: { style: "github" },
      });
    },
  },
  created() {
    axios({
      method: 'post',
      url: urls(1) + '/blog/findAllEssay',
      data: this.classify
    }).then((res) => {
      this.essay = res.data.data
    })
  },
  async mounted() {



    this.blog.id = this.$route.query.id
    await axios({
      method: 'get',
      url: urls(1) + '/blog/findEssay/' + this.blog.id,
    }).then((res) => {
      this.blog = res.data.data
      console.log(this.blog)
      this.classify.collection = this.blog.collection
      this.renderMarkdown(this.blog.content);
    })
    this.author = sessionStorage.getItem("name")
    this.classify.author = localStorage.getItem("username")
    axios({
      method: 'post',
      url: urls(1) + '/blog/findAllEssay',
      data: this.classify
    }).then((res) => {
      this.essay = res.data.data
    })
  }
}
</script>

<style scoped>
.blog {
  width: 75%;
  background-color: #F7F7F7;
  border-radius: 16px
}

.title {
  font-size: 20pt;
  text-align: center;
  margin: 20px;
}

.time {
  font-size: 14pt;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
}

.content {
  margin: 30px;
  text-indent: 50px;
  letter-spacing: 3px;
  line-height: 1.8;
}

.collection {
  background-color: #EEEEEE;
  margin-left: 5%;
  width: 20%;
  height: 100%;
  margin-top: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.c1 {
  letter-spacing: 3px;
  line-height: 1.8;
  margin: 10px;
  text-indent: 25px;
  font-family: 'Times New Roman', Times, serif;
}

.test {
  padding: 15px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10pt;
  text-align: center;
  cursor: pointer;
  color: #6F6F6F;
}

.test:hover {
  color: #000;
}

@media screen and (max-width: 600px) {

  .collection {
    display: none;
  }

  .blog {
    width: 100%;
  }
}
</style>