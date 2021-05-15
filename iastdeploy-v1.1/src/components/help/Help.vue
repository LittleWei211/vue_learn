<template>
  <div class="clientList">
    <div class="headCon"></div>
    <wHead></wHead>
    <div class="main">
      <div class="help">
        <router-view :data="{menu1:'使用说明',menu2:'客户端下载',menu3:'更新'}"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import wHead from "@/components/common/Head"
  import wFoot from "@/components/common/Foot"
  export default {
    name: "Help",
    data(){
      return {

      }
    },
    components:{
      wHead,
      wFoot
    }
  }
</script>

<style scoped>
  .main {
    width: 1260px;
    padding: 15px 30px;
    border: 1px solid #eee;
    background-color: #fff;
  }

</style>
