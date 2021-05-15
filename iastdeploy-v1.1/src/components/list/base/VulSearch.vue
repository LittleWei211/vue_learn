<template>
  <div class="taskFilter">
    <form>
      <select name="" id="searchSelect" @change="showSelectedIndex" v-model="selected">
        <option v-for="option in options" v-bind:value="option.value">
          {{option.text}}
        </option>
      </select>
      <input ref="typeChange" type="text" id="inputO" v-bind:placeholder="options[this.selected].placeHolder" v-model="keyWord">
      <!--<span style="float: left; padding: 5px 0; font-size: 14px;">漏洞类型：</span><input type="text" style="width: 160px; margin-left: 0;"><span style="padding:15px 10px; float:left;"></span>
      <span style="float: left; padding: 5px 0; font-size: 14px;">用户编号：</span><input type="text" style="width: 160px; margin-left: 0;">
      <span style="padding:15px 10px; float:left;"></span>
      <span style="float: left; padding: 5px 0; font-size: 14px;">用户编号：</span><input type="text" style="width: 160px; margin-left: 0;">
      <span style="padding:15px 10px; float:left;"></span>-->
      <button @click.prevent="getSearchWord">搜&nbsp;&nbsp;&nbsp;&nbsp;索</button>
    </form>

    <span id="inputTips"></span>
    <a href="javascript:void(0);" class="refreshBtn" @click="refreshData" title="刷新列表数据">刷&nbsp;&nbsp;&nbsp;&nbsp;新</a>
  </div>
</template>

<script>
    export default {
      name: "VulSearch",
      data(){
        return {
          keyWord:'',
          sendedKeyWord:{
            vulName:'',
            userNo:''
          },
          selected:2,
          options:[
            {text:'请选择条件',value:0,placeHolder:'请输入检索关键字'},
            {text:'漏洞类型',value:1,placeHolder:'请输入漏洞类型'},
            {text:'用户编号',value:2,placeHolder:'请输入用户编号'}
          ]
        }
      },
      methods:{
        getSearchWord(){
          console.log(this.selected);
          switch (this.selected) {
            case 0 :
              //this.sendedKeyWord.vulName = this.keyWord;
              break;
            case 1 :
              this.sendedKeyWord.vulName = this.keyWord;
              break;
            case 2 :
              this.sendedKeyWord.userNo = this.keyWord;
              /*if(this.sendedKeyWord.userNo === ''){
                this.sendedKeyWord.userNo = 0
              }*/
              break;
          }
          if(this.selected === 0){

            document.getElementById('inputTips').innerText = "请选择检索条件！";
            document.getElementById('inputTips').style.display = 'block';
            setTimeout(()=>{
              document.getElementById('inputTips').style.display = 'none';
            },1500)
            return;
          }
          if(this.keyWord === ''){
            document.getElementById('inputTips').innerText = "请输入检索关键字！";
            document.getElementById('inputTips').style.display = 'block';
            setTimeout(()=>{
              document.getElementById('inputTips').style.display = 'none';
            },1500)
            return;
          }
          if(!/^[0-9]+$/.test(this.sendedKeyWord.userNo) && this.sendedKeyWord.userNo !== ''){
            return;
          }else{
            this.$emit("sendKeyWord",this.sendedKeyWord)
          }
        },
        showSelectedIndex(){
          this.sendedKeyWord.vulName = "";
          this.sendedKeyWord.userNo = "";
          this.keyWord = '';
          if(this.selected){
            //document.getElementById('inputTips').innerText = "请选择检索条件！！";
            document.getElementById('inputTips').style.display = 'none';
          }
          if(this.selected === 2){
            this.limitNumberInput();
            //this.$refs.typeChange.type = 'number';
          }else{
            document.getElementById('inputO').onkeyup = null;
            //this.$refs.typeChange.type = 'text';
          }
        },
        limitNumberInput(){
          document.getElementById('inputO').onkeyup = function () {
            if(this.value === ''){
              document.getElementById('inputTips').style.display = 'none';
            }else if(/^[0-9]+$/.test(this.value)){
              document.getElementById('inputTips').style.display = 'none';
            }else if(!/^[0-9]+$/.test(this.value)){
              document.getElementById('inputTips').innerText = "请输入数字类型的用户编号！";
              document.getElementById('inputTips').style.display = 'block';
              return false;
            }
          }
        },
        refreshData(){
          let time = new Date().toLocaleString()
          this.sendedKeyWord.userNo = time.substring(0,time.length-1);
          this.selected = 0;
          this.keyWord = '';
          this.$emit("sendKeyWord",this.sendedKeyWord)
        }
      },
      mounted(){
      }
    }
</script>

<style scoped>
  .taskFilter input{
    width: 600px;
    margin-left: -1px;
    padding: 7px 5px 5px 5px;
  }
</style>
