<template>
  <div class="taskVulList">
    <div class="biTitle"><h2>漏洞列表</h2></div>
    <div class="listTable">
      <table width="100%">
        <thead>
          <tr>
            <th width="12%" style="position: relative">
              <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('vulTypeSearch')">漏洞类型</span>
              <form class="vulTypeSearch" ref="vulTypeSearch">
                <!--<input id="vulNameInput" autocomplete="off" data="clickBtn" type="text" v-model="taskVulSearchWords.vulName">-->
                <select name="" style="padding: 0px 2px 2px 2px;" id="vulNameInput" data="clickBtn" v-model="taskVulSearchWords.vulName">
                  <option v-bind:value="pro.value" v-for="(pro) in vulNameStateOption">{{pro.text}}</option>
                </select>
              </form>
            </th>
            <th width="10%">
              <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('vulServeritySearch')">严重性</span>
              <form class="vulTypeSearch" ref="vulServeritySearch">
                <!--<input id="vulServerityInput" autocomplete="off" data="clickBtn" type="text" v-model="taskVulSearchWords.vulVerserity">-->

                <select name="" style="padding: 2px 1px; padding: 0px 1px 2px 1px;" id="vulServerityInput" data="clickBtn" v-model="taskVulSearchWords.vulVerserity">
                  <option v-bind:value="pro.value" v-for="(pro) in vulVerserityStateOption">{{pro.text}}</option>
                </select>
              </form>
            </th>
            <th width="42%">
              <span>漏洞地址</span>
            </th>
            <th width="16%">
              <span>检测时间</span>
            </th>
            <th width="6%">
              <span class="screenCondition" data="clickBtn" @click="showVulTypeSearchForm('vulStateSearch')">状态</span>
              <form class="vulTypeSearch userNoSearch" ref="vulStateSearch">
                <select name="" id="" data="clickBtn" v-model="taskVulSearchWords.vulState">
                  <option v-bind:value="pro.value" v-for="(pro,index) in stateOption">{{pro.text}}</option>
                </select>
                <span style="height: 0;" id="vulStateInput">{{taskVulSearchWords.vulState}}</span>
              </form>
            </th>
          </tr>
        </thead>
        <tbody>

        <router-link tag="tr" v-for="(vulItem,index) in taskVulList" :key="index" :to="{path:'/vulSummary',query:{vulId:vulItem.vulId}}" title="点击获取漏洞详细信息">
          <td>
            <span>{{vulItem.vulName}}</span>
          </td>
          <td>
            <span>{{vulItem.verserity}}</span>
          </td>
          <td>
            <p>{{vulItem.url ? vulItem.url.substring(0,76) : ""}}</p>
          </td>
          <td>
            <p>{{vulItem.testTime ? vulItem.testTime.substring(0,19) : ""}}</p>
          </td>
          <td>
            <p class="fixedStatus" :style="vulItem.vulStatus | colorFull">{{vulItem.vulStatus | fixedOrUnfixed}}</p>
          </td>
        </router-link>
        </tbody>
      </table>
    </div>
    <wFlipPage :showItems="showItems" :totalPage="totalPage" :initPage="eventPage" @goPage="goPageFn"></wFlipPage>
  </div>
</template>

<script>
  import {getVulListByTask,getVulCountByTask} from '../../../api/data'
  import wFlipPage from "@/components/common/FlipPage"
  import { mapGetters } from 'vuex'
  export default {
    name: "TaskVulList",
    data(){
      return {
        taskVulList:[],
        totalPage:1,
        eventPage:1,
        showItems:5,
        vulNameStateOption:[
          {text:'所有',value:''},
          {text:'task',value:'task'},
          {text:'tom',value:'tom'},
          {text:'帐号越权',value:'帐号越权'}
        ],
        stateOption:[
          {text:'所有',value:''},
          {text:'未修复',value:0},
          {text:'已修复',value:1},
        ],
        vulVerserityStateOption:[
          {text:'所有',value:''},
          {text:'低',value:'低'},
          {text:'中',value:'中'},
          {text:'高',value:'高'}
        ],
        taskVulSearchWords:{
          vulName:'',
          vulState:'',
          vulVerserity:'',
        },
        flag:true
      }
    },
    components:{
      wFlipPage
    },
    computed:{
      ...mapGetters([
        "taskId"
      ])
    },
    filters:{
      colorFull:function (value) {
        switch (parseInt(value)) {
          case 0:
            return "color:#d6cf4a;"
            break;
          case 1:
            return "color:rgb(152, 149, 149);"
            break;
          case 2:
            return "color:#34d846;"
            break;
          case 3:
            return "color:#d8670d;"
            break;
          case 4:
            return "color:#2006d8;"
            break;
          default:
            break
        }
      }
    },
    methods:{
      async getTaskVulList(taskId,taskVulSearchWords,page){//获取对应任务下的漏洞列表
        let {vulName,vulState,vulVerserity} = taskVulSearchWords
        let {data} = await getVulListByTask(taskId,vulName,vulState,vulVerserity,page||this.eventPage);
        this.taskVulList = data;
      },
      async getTaskVulCountData(taskId,taskVulSearchWords){//获取任务下漏洞数量
        let {vulName,vulState,vulVerserity} = taskVulSearchWords
        let taskCount = (await getVulCountByTask(taskId,vulName,vulState,vulVerserity)).data;
        this.totalPage = Math.ceil(taskCount / 10);
        if(this.totalPage > 5){
          this.showItems = 5
        }else{
          this.showItems = this.totalPage
        }
      },
      goPageFn(data){
        /*if(this.userNo.length > 9){
          this.getAllTaskList("",data.page);
        }else{
          this.getAllTaskList(this.userNo,data.page);
        }*/

        if(!data.flipClick){
          this.getTaskVulList(this.taskId,this.taskVulSearchWords,data.page);
        }
        this.eventPage = data.page
      },
      showVulTypeSearchForm(ele){
        $(event.target).parent().siblings().find('.vulTypeSearch').css({display:'none'})
        this.$refs[ele].style.display = this.$refs[ele].style.display == 'block' ? 'none' : 'block';
      },
      getSearchWords(fn){
        fn();
        this.getTaskVulList(this.taskId,this.taskVulSearchWords,1);
        this.getTaskVulCountData(this.taskId,this.taskVulSearchWords);
      },
    },
    created(){
      if(this.taskId){
        this.getTaskVulList(this.taskId,this.taskVulSearchWords,this.eventPage);
        this.getTaskVulCountData(this.taskId,this.taskVulSearchWords);
      }
    },
    mounted(){
      $('body').click(function (e) {
        if(!e.target.getAttribute('data')){
          $('.vulTypeSearch').css({display:'none'});
        };
      })
    },
    activated(){
      /*if(this.taskId){
        this.getTaskVulList(this.taskId,this.taskVulSearchWords,this.eventPage);
        this.getTaskVulCountData(this.taskId,this.taskVulSearchWords);
      }*/
    },
    watch:{
      taskId:function (newValue) {
        this.getTaskVulList(this.taskId,this.taskVulSearchWords,this.eventPage);
        this.getTaskVulCountData(this.taskId,this.taskVulSearchWords);
      },
      taskVulSearchWords:{
        handler:function (taskVulSearchWords) {
          let vm = this;
          vm.flag = true;
          $('.pageCon a').toArray().forEach((item)=>{
            item.setAttribute('data','flipClick')
          })
          $('body').unbind('click')
          $('body').click(function (e) {
            if(e.target.tagName === 'TD' || e.target.tagName === 'P'){
              vm.taskVulSearchWords.vulName = '';
              vm.taskVulSearchWords.vulState = '';
              vm.taskVulSearchWords.vulVerserity = '';
              return;
            }
            if(!e.target.getAttribute('data') && e.target.tagName !== 'A' ){
              $('.pageCon a').toArray().forEach((item)=>{
                item.removeAttribute('data')
              })
              $('.vulTypeSearch').css({display:'none'});
              if(vm.flag){
                vm.getSearchWords(function () {
                  vm.flag = false;
                  vm.eventPage = new Date().getTime();
                });
              }
            };
          })
        },
        deep:true
      }
    }

  }
</script>

<style scoped>
  .taskVulList,.listTable{
    overflow: visible;
  }
  .listTable table tr:hover{
    cursor: pointer;
  }
</style>
