<template>
  <div class="vulSummaryPage">
    <div class="headCon"></div>
    <wHead></wHead>
    <div class="main">
      <wVulSummaryTitle></wVulSummaryTitle>
      <wVulBasicInfo :vulSummary="vulSummary" :vulId="vulId"></wVulBasicInfo>
      <wVulRelativeInfo :vulSummary="vulSummary"></wVulRelativeInfo>
      <wVulShow :vulSummary="vulSummary"></wVulShow>
    </div>
    <!--<wFoot></wFoot>-->
  </div>
</template>

<script>
  import {getVulSummary} from '../../api/data'
  import wHead from '@/components/common/Head'
  import wFoot from '@/components/common/Foot'
  import wVulSummaryTitle from '@/components/vulSummary/base/VulSummaryTitle'
  import wVulBasicInfo from '@/components/vulSummary/base/VulBasicInfo'
  import wVulRelativeInfo from '@/components/vulSummary/base/VulRelativeInfo'
  import wVulShow from '@/components/vulSummary/base/VulShow'
  export default {
    name: "VulSummary",
    data(){
      return {
        vulSummary:{
          testRequHeader:'{"": ""}',
          busRequHeader:'{"": ""}',
          testRespHeader:'',
          //testRespHeader:'{"": ""}',
          testRespBody:'\r\n',
          busRespBody:'\r\n',
          busRespHeader:'{"": ""}',
          vulKnoInfo:{
            describle:'',
            suggestion:''
          },
          busUrlMethod:'\t',
          testUrlMethod:'\t'
        },
        vulId:''
      }
    },
    components:{
      wHead,
      wFoot,
      wVulSummaryTitle,
      wVulBasicInfo,
      wVulRelativeInfo,
      wVulShow
    },
    methods:{
      async getVulSummaryData(){//获取漏洞概述数据
        let vulId = this.$route.query.vulId;
        this.vulId = vulId + '';
        let {data} = await getVulSummary(vulId);
        if(data){
          this.vulSummary = data;
        }
        //this.vulSummary = data;
  }
    },
    created(){
      //this.getVulSummaryData();

    },
    activated(){
      this.getVulSummaryData();
    }
  }
</script>

<style scoped>
.main{
  border: 1px solid #eee;
  background-color: #fff;
  padding: 0 25px 25px 25px;
  width: 1220px;
}
</style>
