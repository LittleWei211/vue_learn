<template>
  <div class="taskFilter">
    <form>
      <input id="inputO" type="text" placeholder="请输入任务id" v-model="taskId">
      <button @click.prevent="getSearchWord">搜&nbsp;&nbsp;&nbsp;&nbsp;索</button>
    </form>
    <span id="inputTips"></span>
    <a href="javascript:void(0);" class="refreshBtn" @click="refreshData" title="刷新列表数据">刷&nbsp;&nbsp;&nbsp;&nbsp;新</a>
  </div>
</template>

<script>
  export default {
    name: "RequestSearch",
    data(){
      return {
        taskId:''
      }
    },
    methods:{
      getSearchWord(){
        /*if(this.taskId == ''){
          document.getElementById('inputTips').style.display = 'block';
          document.getElementById('inputTips').innerText = "请输入数字类型的任务id！";
          setTimeout(()=>{
            document.getElementById('inputTips').style.display = 'none';
          },1500)
          return;
        }*/
        if(!/^[0-9]+$/.test(this.taskId) && this.taskId !== ''){
          return;
        }else{
          this.$emit("sendTaskId",this.taskId)
        }
      },
      limitNumberInput(){
        document.getElementById('inputO').onkeyup = function () {
          if(this.value === ''){
            document.getElementById('inputTips').style.display = 'none';
          }else if(/^[0-9]+$/.test(this.value)){
            document.getElementById('inputTips').style.display = 'none';
          }else if(!/^[0-9]+$/.test(this.value)){
            document.getElementById('inputTips').style.display = 'block';
            document.getElementById('inputTips').innerText = "请输入数字类型的任务id！";
            return false;
          }
        }
      },
      refreshData(){
        let time = new Date().toLocaleString();
        this.taskId = time.substring(0,time.length-1);
        this.$emit("sendTaskId",this.taskId);
        this.taskId = '';
        document.getElementById('inputTips').style.display = 'none';
      }
    },
    mounted(){
      this.limitNumberInput();
    }
  }
</script>

<style scoped>

</style>
