<template>
  <div class="requestList">
    <div class="headCon"></div>
    <wHead></wHead>
    <div class="main" style="border-bottom: none; margin-bottom: 0; position: relative;">
      <wRequestSearch @sendTaskId="receiveTaskId"></wRequestSearch>
      <!--<a href="javascript:void(0);" class="refreshBtn" @click="refreshData" title="刷新列表数据">刷&nbsp;&nbsp;&nbsp;&nbsp;新</a>-->
    </div>
    <div class="main" style="margin-top: 0;">
      <wRequestList :taskId="taskId"></wRequestList>
    </div>
    <!--<wFoot></wFoot>-->
  </div>
</template>

<script>
  import wHead from "@/components/common/Head"
  import wFoot from "@/components/common/Foot"
  import wRequestList from "@/components/requestList/base/List"
  import wRequestSearch from "@/components/requestList/base/RequestSearch"
    export default {
      name: "RequestList",
      data(){
        return {
          taskId:''
        }
      },
      components:{
        wHead,
        wFoot,
        wRequestList,
        wRequestSearch
      },
      methods:{
        receiveTaskId(taskId){
          this.taskId = taskId;
        },
        refreshData(){
          let time = new Date().toLocaleString()
          this.taskId = time.substring(0,time.length-1);
        }
      },
      beforeRouteEnter(to, from, next){
        next();
      }
    }
</script>

<style scoped>
  .requestList{
    background-color: #f9f9f9;
    height: 100%;
  }
  .main{
    width: 1160px;
    width: 1260px;
    padding: 15px 30px;
    border: 1px solid #eee;
    background-color: #fff;
  }
  .refreshBtn{
    width: 98px;
    text-align: center;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    position: absolute;
    right: 140px;
    top: 15px;
    border: none;
    color: #fff;
    padding: 3px 5px;
    background-color: #5fc65f;
    background-color: #3a8ee6;
    outline: none;
    border-radius: 2px;
    /*width: 30px;
    background-image: url("../../../static/images/refresh1.gif");
    background-size: 30px 30px;
    border:none;
    outline: none;*/
  }
</style>
