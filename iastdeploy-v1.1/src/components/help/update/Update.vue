<template>
  <div class="update">
    <div class="instruTitle">
      <h2>更新日志</h2>
    </div>
    <div class="instrucText">
      <ul>
        <li v-for="(log,index) in updateLog.logList">
          <div class="updateTimeVersion"><span class="updateTime">{{log.updateTime}}</span><span class="updateVersion">{{log.version}}</span></div>
          <div class="updateText">
            <ul>
              <li v-for="(item,ind) in log.logText">{{ind+1+'.'}}{{item}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import updateLog from '../../../api/updateLog'
  export default {
    name: "Update",
    props:{
      data:{
        type:Object
      }
    },
    data(){
      return {
        updateLog:updateLog
      }
    },
    mounted(){
      setTimeout(()=>{
        //console.log(this.data);
      },1000)
    }
  }
</script>

<style scoped>

</style>
