<template>
  <div class="bg">
    <div style="flex:0"><headers></headers></div>
    <div class="content" ><router-view/></div>
    <div ><footers></footers></div>
  </div>
</template>

<script>
import headers from '@/components/Header.vue' 
import footers from '@/components/Footer.vue'
export default {
  components:{headers,footers}
}
</script>

<style scoped>
.content{
  width:70%;
  margin: 0 auto;
  /* background: #B3B3B3; */
}
.bg{
  background:url('@/assets/image/bg.svg');
  height: 900px;
  
}

</style>