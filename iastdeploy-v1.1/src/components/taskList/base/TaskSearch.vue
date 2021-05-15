<template>
  <div class="taskFilter">
    <form>
      <input id="inputO" type="text" placeholder="请输入用户编号" v-model="userNo">
      <button @click.prevent="getSearchWord">搜&nbsp;&nbsp;&nbsp;&nbsp;索</button>
    </form>
    <span id="inputTips"></span>
    <a href="javascript:void(0);" class="refreshBtn" @click="refreshData" title="刷新列表数据">刷&nbsp;&nbsp;&nbsp;&nbsp;新</a>
  </div>
</template>

<script>
  import { getTaskList } from "@/api/data"
  export default {
    name: "TaskSearch",
    data(){
      return {
        userNo:''
      }
    },
    methods:{
      getSearchWord(){
        /*if(this.userNo == ''){
          document.getElementById('inputTips').style.display = 'block';
          document.getElementById('inputTips').innerText = "请输入数字类型的用户编号！";
          setTimeout(()=>{
            document.getElementById('inputTips').style.display = 'none';
          },1500)
          return;
        }*/

        if(!/^[0-9]+$/.test(this.userNo) && this.userNo !== ''){
          return;

          //this.$emit("sendUserId",this.userNo,"1")
        }else{
          this.$emit("sendUserId",this.userNo,"1")
        }
        /*this.userNo = new Date().getTime()+'/'+this.userNo;
        this.$emit("sendUserId",this.userNo,"1")
        this.userNo = this.userNo.split('/')[1];*/
      },
      limitNumberInput(){
        document.getElementById('inputO').onkeyup = function () {
          if(this.value === ''){
            document.getElementById('inputTips').style.display = 'none';
          }else if(/^[0-9]+$/.test(this.value)){
            document.getElementById('inputTips').style.display = 'none';
          }else if(!/^[0-9]+$/.test(this.value)){
            document.getElementById('inputTips').style.display = 'block';
            document.getElementById('inputTips').innerText = "请输入数字类型的用户编号！";
            return false;
          }
        }
      },
      refreshData(){
        let time = new Date().toLocaleString();
        this.userNo = time.substring(0,time.length-1);
        this.$emit("sendUserId",this.userNo,"1");
        this.userNo = '';
        document.getElementById('inputTips').style.display = 'none';
      }
    },
    mounted(){
      this.limitNumberInput();
    }
  }
</script>

<style scoped>
  .taskFilter{
    /*position: relative;*/
  }

</style>
