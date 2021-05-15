<template>
  <div class="taskList">
    <div class="headCon"></div>
    <wHead></wHead>
    <div class="main" style="border-bottom: none; margin-bottom: 0; position: relative; padding: 0 30px;">
      <!--<wTaskSearch @sendUserId="receiveUserId"></wTaskSearch>-->
    </div>
    <div class="main" style="margin-top: 0; border-top: none;">
      <wTaskList :userNo="userNo" :firstPage="firstPage"></wTaskList>
    </div>
  </div>
</template>
<script>
  import { getTaskList } from "@/api/data"
  import wHead from "@/components/common/Head"
  import wFoot from "@/components/common/Foot"
  import wTaskList from "@/components/taskList/base/List"
  import wTaskSearch from "@/components/taskList/base/TaskSearch"
  export default {
    name: "TaskList",
    data(){
      return {
        userNo:'',
        firstPage:''
      }
    },
    methods:{
      receiveUserId(userNo,firstPage){
        this.userNo = userNo;
        this.firstPage = firstPage;
      },
      refreshData(){
        let time = new Date().toLocaleString()
        this.userNo = time.substring(0,time.length-1);
      },
      getCurrentPage(data){
        console.log(data);
      }
    },
    components:{
      wHead,
      wFoot,
      wTaskList,
      wTaskSearch
    }/*,
    activated(){
      console.log("我看到了TaskList");
      this.userNo = '';
    }*/
  }
</script>

<style scoped>
  .taskList{
    background-color: #f9f9f9;
    height: 100%;
  }
  .main{
    width: 1160px;
    width: 1260px;
    padding: 15px 30px;
    border: 1px solid #eee;
    background-color: #fff;
    overflow: visible;
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
