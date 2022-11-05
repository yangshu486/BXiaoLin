<template>
  <div class="page">
    <div class="logo">XiaoLin</div>
    <div class="essay">
      <h2>微软发布ASP.NET Core 1.0</h2>
      <h4 style="margin-top:30px">2016 年 6 月 27 日，微软发布 ASP.NET Core 1.0。.NET Core
        是微软开发的第一个完全开源的跨平台应用开发开发框架，可运行在 Windows、Linux 和 macOS 等多个平台。一开始，.NET Core 的部分功能不如.NET 丰富，但是其开源和跨平台特性为其赢得了大量用户。
      </h4>
    </div>
    <div class="login">
      <el-menu mode="horizontal" router>
        <el-menu-item index="/" style="margin-left:20%;font-size: 12pt;">登录</el-menu-item>
        <el-menu-item index="/enroll" style="margin-left:22%;font-size: 12pt;">注册</el-menu-item>
      </el-menu>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.page {
  display: flex;
  background: url('@/assets/image/bg.svg');
  height: 968px;
  overflow-y: scroll
}

.logo {
  font-family: 'Times New Roman', Times, serif;
  font-size: 24pt;
  margin-left: 6%;
  margin-top: 3%;
  cursor: pointer;
  width: 10%;
}

.essay {
  margin-top: 10%;
  margin-left: 7%;
  width: 300px;
  letter-spacing: 2px;
  line-height: 1.4;
}

.login {
  margin-top: 7%;
  margin-left: 12%;
  width: 400px;
  background: #fff;
  height: 50%;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

@media screen and (max-width: 800px) {

  .logo {
    display: none;
  }

  .essay {
    display: none;
  }
  .login {
  margin-left: 1px;
}
}
</style>