<template>
  <div class="layout">
    <div class="left">
      <div v-for="(item, index) in essay" :key="index">
        <el-card class="card">
          <div class="title"  @click="card1(item.id)">
            {{ item.title }}
          </div>
          <div class="content" @click="card1(item.id)">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.updateTime }}
          </div>
        </el-card>
      </div>
    </div>
    <div class="classify">
      <el-card class="right">
        <img style="width: 100px; height: 100px" src="@/assets/image/head.png">
        <div class="name">{{ user.name }}</div>
        <div class="music" @click="music">点击这里来到我的歌单</div>
      </el-card>
      <div class="right2">
        <div style=" padding: 10px;text-align: center;font-weight: bold;">分类</div>
        <el-menu v-for=" (item, index) in classify" :key="index" class="menus" mode="horizontal">
          <el-menu-item @click="toClassify(item.collection)">{{ item.collection }}</el-menu-item>
        </el-menu>
        <div class="music" style="margin-top:10px" @click="test1">点击这里联系我</div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {urls} from '@/assets/js/urls.js'
export default {
  data() {
    return {
      user: {
        name:'',
        author:'',
        collection:'测试类'
      },
      user1: {
        name:'',
        username:'',
      },
      classify: [{
        id: '',
        collection: '',
      }],

      essay: [{
        id: '',
        title: '来自作者的提示',
        content: '当你看到这条消息时，就说明出bug了，请赶快联系我哦',
        updateTime: '2022/10/16',
        author:''
      }]
    }
  },
  methods: {
    toClassify(name){
      this.$router.push({path:"/jump1",query:{classify:name}})
    },
    music() {
      window.location.href = 'https://c.y.qq.com/base/fcgi-bin/u?__=a7kPzVNzdHw3'
    },
    test1() {
      window.location.href = 'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=1443032754&website=www.oicqzone.com'
    },
    card1(id) {
      this.$router.push({path:"/detail",query:{id:id}})
    }
  },
  mounted() {
    //查询作者名
    this.user.collection=this.$route.query.classify
     this.user.author=localStorage.getItem("username")
     this.user1.username=localStorage.getItem("username")
    axios({
      method: 'post',
      url: urls(1)+'/findUser',
      data:this.user1
    }).then((res) => {
      console.log(res)
      this.user=res.data.data
    }),

  
    //查询所有文章
    axios({
      method: 'post',
      url: urls(1)+'/blog/findAllEssay',
      data:this.user
    }).then((res) => {
      this.essay = res.data.data
    }),

    //查询所有文集
      axios({
        method: 'post',
        url: urls(1)+'/collection/findAllCollection',
        data: this.user1
      }).then((res) => {
        this.classify = res.data.data
      })
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  height:100%;
  margin-left: 7%;
}

.left {
  width: 65%;
  flex-direction: column;
}

.card {
  margin: 20px;
  padding: 10px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
}

.title {
  font-size: 13pt;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #000;
  font-weight: bold;
  font-style: italic;
}

.content {
  margin-top: 10px;
  letter-spacing: 2px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 70px;
}

.time {
  font-size: 10pt;
  font-family: 'Times New Roman', Times, serif;
  margin-top: 10px;

}

.classify {
  margin-top: 20px;
  margin-left: 5%;
  width: 27%;
  text-align: center;
  border-radius: 15px;
}

.name {
  font-weight: bold;
  letter-spacing: 2px;

}

.right {
  border-radius: 12px;
}

.music {
  font-size: 10pt;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-top: 10px;
  font-style: italic;
  color: #000;
  font-weight: bold;
  cursor: pointer;

}

.music:hover {
  color: #33ADFF;
}

.right2 {
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 12px;
}

.menus {
  border-bottom: 0 !important;
}
</style>