<template>

  <div class="box">
    <el-row :gutter="20">
      <el-col :span="13" class="logo">
        <div @click="logo">XiaoLin</div>
      </el-col>
      <el-col class="navigation" :span="1">
        <div @click="logo2">图库</div>
      </el-col>
      <el-col class="navigation" :span="1">
        文件
      </el-col>
      <el-col class="navigation" :span="1">
        <div @click="logo1">书<i class="el-icon-edit"></i></div>
      </el-col>
      <el-col class="navigation" :span="1">
        <el-dropdown>
          <span class="el-icon-setting">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  >
              <div  @click="deleteLogin">退出登录</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

  methods: {
    logo() {
      this.$router.push({ path: '/home' })
    },
    logo1() {
      this.$router.push({ path: '/edit' })
    },
    logo2() {
      this.$router.push({ path: '/image' })
    },
    deleteLogin(){
      localStorage.clear();
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.box {
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .16), 0 0 6px rgba(0, 0, 0, .06);

}

.logo {
  font-family: 'Times New Roman', Times, serif;
  font-size: 16pt;
  margin-left:
    15%;
  cursor: pointer;
}

.navigation {
  cursor: pointer;
  margin-right: 1%;
}

.navigation:hover {
  color: #AA0022
}
</style>