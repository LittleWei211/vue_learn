<template>
  <div class="listPage">

    <div class="listTable">

      <table cellspacing="0" cellpadding="0" width="100%">
        <thead>
        <tr height="42">
          <th width="8%">
            <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('taskIdSearch')">任务id</span>
            <form class="vulTypeSearch" ref="taskIdSearch">
              <input id="taskIdInput" autocomplete="off" data="clickBtn" type="text" v-model="taskListSearchWords.taskId">
            </form>
          </th>
          <th width="8%">
            <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('userIdSearch')">用户编号</span>
            <form class="vulTypeSearch" ref="userIdSearch">
              <input id="userIdInput" autocomplete="off" data="clickBtn" type="text" v-model="taskListSearchWords.userId">
            </form>
          </th>
          <th width="12%">客户端ip</th>
          <th width="16%">记录开始时间</th>
          <th width="16%">记录结束时间</th>
          <th width="16%">检测开始时间</th>
          <th width="16%">检测结束时间</th>
          <th width="16%">
            <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('taskStatusSearch')">任务状态</span>
            <form class="vulTypeSearch" ref="taskStatusSearch">
              <select name="" id="" data="clickBtn" v-model="taskListSearchWords.taskStatus">
                <option v-bind:value="pro.value" v-for="(pro,index) in stateOption">{{pro.text}}</option>
              </select>
            </form>
          </th>
          <!--<th width="10%">查看任务请求</th>-->
        </tr>
        </thead>
        <tbody>
        <!--<router-link tag="tr" v-for="(task,index) in allTaskList" :key="index" :to="{path:'/requestList',query:{taskId:task.taskId}}">-->
        <router-link tag="tr" v-for="(task,index) in allTaskList" :key="index" :to="{path:'/taskDetail',query:{taskId:task.taskId}}" title="点击获取任务详细信息">
        <!--<tr v-for="(task,index) in allTaskList">-->
          <td>{{task.taskId}}</td>
          <td>{{task.userNo}}</td>
          <td>
            <!--<input type="checkbox" name="">-->
            <span>{{task.clientIp}}</span>
          </td>

          <td>
            <p>{{task.recordStarttime ? task.recordStarttime.substring(0,19):""}}</p>
          </td>

          <td>
            <p>{{task.recordEndtime ? task.recordEndtime.substring(0,19):""}}</p>
          </td>

          <td>
            <p>{{task.taskStarttime ? task.taskStarttime.substring(0,19):""}}</p>
          </td>

          <td>
            <p>{{task.taskEndtime ? task.taskEndtime.substring(0,19):""}}</p>
          </td>

          <td>
            <p class="fixedStatus">{{task.taskState | taskState}}</p>
          </td>
        <!--</tr>-->
        </router-link>

        </tbody>
      </table>
    </div>
    <wFlipPage :showItems="showItems" :totalPage="totalPage" :initPage="eventPage" @goPage="goPageFn" :userNo="userNo" :taskListSearchWords="taskListSearchWords"></wFlipPage>
  </div>
</template>

<script>
  import { getTaskList , getTaskCount } from "@/api/data"
  import wFlipPage from "@/components/common/FlipPage"
  export default {
    name: "List",
    props:{
      searchTaskList:{
        type:Array
      },
      userNo:{
        type:String
      },
      firstPage:{
        type:String
      },
      taskList:{
        type:Array
      }
    },
    data(){
      return {
        allTaskList:[],
        totalPage:0,
        eventPage:1,
        showItems:5,
        taskListSearchWords:{
          taskId:'',
          userId:'',
          taskStatus:''
        },
        stateOption:[
          {text:'所有',value:''},
          {text:'录入中',value:1},
          {text:'录入结束',value:2},
          {text:'测试中',value:3},
          {text:'测试完成',value:4}
        ],
        flag:true
      }
    },
    components:{
      wFlipPage
    },
    methods:{
      async getAllTaskList(taskListSearchWords,page){//获取任务列表
        let {taskId,userId,taskStatus} = taskListSearchWords
        let {data} = await getTaskList(taskId,userId,taskStatus,page||this.eventPage);
        this.allTaskList = data;
      },
      async getTaskCountData(taskListSearchWords){//获取任务数量
        let {taskId,userId,taskStatus} = taskListSearchWords
        let taskCount = (await getTaskCount(taskId,userId,taskStatus)).data;
        this.totalPage = Math.ceil(taskCount / 10);

        if(this.totalPage > 5){
          this.showItems = 5
        }else{
          this.showItems = this.totalPage
        }

      },
      goPageFn(data){
        if(!data.flipClick){
          this.getAllTaskList(this.taskListSearchWords,data.page);
        }
        /*if(this.userNo.length > 9){
          //this.getAllTaskList("",data.page);
          this.getAllTaskList({taskId:'', userId:'', taskStatus:''},data.page);
        }else{
          //this.getAllTaskList(this.userNo,data.page);
          this.getAllTaskList(this.taskListSearchWords,data.page);
        }*/
        this.eventPage = data.page
      },
      showVulTypeSearchForm(ele){
        $(event.target).parent().siblings().find('.vulTypeSearch').css({display:'none'})
        this.$refs[ele].style.display = this.$refs[ele].style.display == 'block' ? 'none' : 'block';

      },
      getSearchWords(fn){
        fn();
        this.getAllTaskList(this.taskListSearchWords,1);
        this.getTaskCountData(this.taskListSearchWords)
      }

    },
    computed:{
      /*totalPage(){
        return Math.ceil(this.allVulList.length / 5);
      }*/
    },
    filters:{
      taskState:function (value) {
        //return 1;
        switch (parseInt(value)) {
          case 1:
              return "录入中"
            break;
          case 2:
              return "录入结束"
            break;
          case 3:
              return "测试中"
            break;
          case 4:
              return "测试完成"
            break;
          case 5:
              return "未包含有效测试报文"
            break;
          default:
            break
        }
      }
    },
    created(){
      this.getTaskCountData(this.taskListSearchWords);
      this.getAllTaskList(this.taskListSearchWords,1);
    },
    mounted(){
      $('body').click(function (e) {
        if(!e.target.getAttribute('data')){
          $('.vulTypeSearch').css({display:'none'});
        };
      })
    },
    watch:{
      /*totalPage:function(){
        this.getAllTaskList();
      },*/
      userNo:function (nv) {
        /*if(nv.length > 9){
         /!* this.getAllTaskList('',1);
          this.getTaskCountData('')*!/

          this.getAllTaskList({taskId:'', userId:'', taskStatus:''},1);
          this.getTaskCountData({taskId:'', userId:'', taskStatus:''})
        }else{
          /!*this.getAllTaskList(nv,1);
          this.getTaskCountData(nv)*!/

          this.getAllTaskList(nv,1);
          this.getTaskCountData(nv)
        }*/
        /*if(nv.split('/')[1].length < 3){
          this.getAllTaskList('',1);
          this.getTaskCountData('')
        }else{
          this.getAllTaskList(nv.split('/')[1],1);
          this.getTaskCountData(nv.split('/')[1])
        }*/

      },
      taskListSearchWords:{
        handler:function (taskListSearchWords) {
          let vm = this;
          vm.flag = true;
          $('.pageCon a').toArray().forEach((item)=>{
            item.setAttribute('data','flipClick')
          })
          $('body').unbind('click')
          $('body').click(function (e) {
            if(e.target.tagName === 'TD' || e.target.tagName === 'P'){
              vm.taskListSearchWords.taskId = '';
              vm.taskListSearchWords.userId = '';
              vm.taskListSearchWords.taskStatus = '';
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
  .listPage,.listTable{
    overflow: visible;
  }
  .listTable table tr:hover{
    cursor: pointer;
  }
</style>
