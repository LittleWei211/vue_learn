<template>
  <div class="taskDetailPage">
    <div class="headCon"></div>
    <wHead></wHead>
    <div class="main">
      <wTaskBasicInfo :taskBasicInfo="taskBasicInfo"></wTaskBasicInfo>
      <wTaskVulList :taskId="taskId"></wTaskVulList>
    </div>

  </div>
</template>

<script>
  import wHead from '@/components/common/Head'
  import wTaskBasicInfo from '@/components/taskDetail/base/TaskBasicInfo'
  import wTaskVulList from '@/components/taskDetail/base/TaskVulList'
  import {getTaskDetail} from '../../api/data'
  export default {
    name: "TaskDetail",
    data(){
      return {
        taskBasicInfo:{},
        taskVulList:[],
        taskId:"",
        timeFlag:0
      }
    },
    components:{
      wHead,
      wTaskBasicInfo,
      wTaskVulList
    },
    methods:{
      async getTaskDetailBasicInfo(){
        let taskId = this.$route.query.taskId;
        let { data } = await getTaskDetail(taskId);
        this.$store.commit("changeTaskId",taskId+"")
        this.taskBasicInfo = data;
      }
    },
    created(){
      //this.getTaskDetailBasicInfo();
    },
    activated(){
      this.getTaskDetailBasicInfo();
    }
  }
</script>

<style scoped>
  .main{
    width: 1220px;
    border:1px solid #eee;
    background-color: #fff;
    padding: 0 25px 25px 25px;
    overflow: visible;
  }
</style>
