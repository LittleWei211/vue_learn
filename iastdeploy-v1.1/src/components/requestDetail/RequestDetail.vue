<template>
  <div class="vulSummaryPage">
    <div class="headCon"></div>
    <wHead></wHead>
    <div class="main">
      <wRequestDetailTitle></wRequestDetailTitle>
      <wRequestBasicInfo :requestDetail="requestDetail"></wRequestBasicInfo>
      <wRequestShow :requestDetail="requestDetail"></wRequestShow>
    </div>
    <!--<wFoot></wFoot>-->
  </div>
</template>

<script>
  import {getRequestDetail} from '../../api/data'
  import wHead from '@/components/common/Head'
  import wFoot from '@/components/common/Foot'
  import wRequestDetailTitle from '@/components/requestDetail/base/RequestDetailTitle'
  import wRequestBasicInfo from '@/components/requestDetail/base/RequestBasicInfo'
  import wRequestShow from '@/components/requestDetail/base/RequestShow'

  export default {
    name: "RequestDetail",
    data(){
      return {
        requestDetail:{
          header:'{"": ""}',
          responseHeader:'{"": ""}'
        }
      }
    },
    components:{
      wHead,
      wFoot,
      wRequestDetailTitle,
      wRequestBasicInfo,
      wRequestShow
    },
    methods:{
      async getRequestDetailData(){//获取请求概述数据
        let requestId = this.$route.query.requestId;
        let {data} = await getRequestDetail(requestId);
        this.requestDetail = data;
      }
    },
    created(){
      //console.log(this.$route.query.requestId)
      //this.getRequestDetailData();
    },
    activated(){
      this.getRequestDetailData();
    }
  }
</script>

<style scoped>
  .main{
    width: 1220px;
    border:1px solid #eee;
    background-color: #fff;
    padding: 0 25px 25px 25px;
  }
</style>
