<template>
  <div class="vulBasicInfo">
    <div class="vulType">
      <span style="font-weight: bold;">请求地址：</span><p>{{requestDetail.url}}</p>
    </div>
    <div class="vulType">
      <span style="font-weight: bold;">请<i style="padding: 0 4px 0 3px;"></i>求<i style="padding: 0 4px;"></i>ip：</span><p>{{requestDetail.ip}}</p>
    </div>
    <div class="vulType">
      <span style="font-weight: bold;">请求时间：</span><p>{{requestDetail.requestTime}}</p>
    </div>
    <div class="vulType">
      <span style="font-weight: bold;">响应时间：</span><p>{{requestDetail.responseTime}}</p>
    </div>
    <div class="vulType">
      <span style="font-weight: bold;">请求方法：</span><p>{{requestDetail.httpMethod}}</p>
    </div>
    <div class="vulType">
      <span style="font-weight: bold;">响应状态：</span><p>{{requestDetail.httpState}}</p>
    </div>
    <div class="vulType">
      <span style="font-weight: bold;">报文状态：</span><p>{{requestDetail.state|responseState}}</p>
    </div>
    <div class="vulType">
      <span style="font-weight: bold;">备注信息：</span><p>{{requestDetail.remark}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RequestBasicInfo",
    props:{
      requestDetail:{
        type:Object
      }
    },
    data(){
      return {}
    },
    filters:{
      responseState:function (value) {
        switch (parseInt(value)) {
          case 0:
            return "未检测"
            break;
          case 1:
            return "检测中"
            break;
          case 2:
            return "检测完成"
            break;
          case 3:
            return "检测异常"
            break;
          default:
            break
        }
      }
    },
    created(){
    }
  }
</script>

<style scoped>
  .vulType{ padding-left: 0;}
  .vulType span{
    width: 80px;
    text-align: right;
  }
</style>

