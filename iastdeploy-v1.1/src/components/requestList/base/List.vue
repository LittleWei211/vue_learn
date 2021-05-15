<template>
  <div class="listPage">
    <div class="listTable">
      <table cellspacing="0" cellpadding="0" width="100%">
        <thead>
        <tr height="42">
          <th width="6%">任务id</th>
          <th width="7%">用户编号</th>
          <th width="26%">请求地址</th>
          <th width="8%">请求ip</th>
          <th width="11%">请求时间</th>
          <th width="11%">响应时间</th>
          <th width="7%">请求方法</th>
          <th width="7%">响应状态</th>
          <th width="8%">报文状态</th>
          <th width="9%">备注</th>
        </tr>
        </thead>
        <tbody>
        <router-link tag="tr" v-for="(request,index) in allRequestList" :key="index" :to="{path:'/requestDetail',query:{requestId:request.busMessageRequestId}}">
        <!--<tr v-for="(request,index) in allRequestList">-->

          <td>{{request.taskId}}</td>
          <td>{{request.userNo}}</td>
          <td>
            <!--<input type="checkbox" name="">-->
            <p :title="request.url">{{request.url ? request.url.substring(0,45):""}}</p>
          </td>

          <td>
            <p>{{request.ip}}</p>
          </td>

          <td>
            <p>{{request.requestTime ? request.requestTime.substring(0,19):""}}</p>
          </td>

          <td>
            <p>{{request.responseTime ? request.responseTime.substring(0,19):""}}</p>
          </td>

          <td>
            <p>{{request.httpMethod}}</p>
          </td>

          <td>
            <p>{{request.httpState }}</p>
          </td>

          <td>
            <p>
              <span v-if="request.state == 0" style="color:orange">{{request.state | responseState}}</span>
              <span v-if="request.state == 1" style="color:gray">{{request.state | responseState}}</span>
              <span v-if="request.state == 2" style="color:green">{{request.state | responseState}}</span>
              <span v-if="request.state == 3" style="color:red">{{request.state | responseState}}</span>
            </p>
          </td>

          <td @mouseenter="displayMark(index)" @mouseleave="hideMark">
            <div  style="position: relative; overflow: visible;">
              <span  style="color: #3a8ee6" :title="request.remark">{{request.remark ? (request.remark.length > 7 ? request.remark.substring(0,7)+"..." : request.remark) : ""}}</span>
              <!--<div class="remark" v-show="true && showMark[index]" style="position: absolute; width: 200px; background-color: #f0eaea; z-index: 2000; right: 76px; top:-5px; padding: 10px; border-radius: 8px;">
                <p>{{request.remark}}</p>
              </div>-->
            </div>
          </td>

          <!--<td>
            <p class="operate"><router-link :to="{path:'/vulSummary',query:{vulId:task.vulId}}" tag="a">查看备注</router-link>
            </p>
          </td>-->

        <!--</tr>-->
        </router-link>
        </tbody>
      </table>
    </div>
    <wFlipPage :showItems="showItems" :totalPage="totalPage" :initPage="eventPage" :taskId="taskId" @goPage="goPageFn"></wFlipPage>
  </div>
</template>

<script>
  import Vue from "vue"
  import { getRequestList , getRequestCount ,getTaskList } from "@/api/data"
  import wFlipPage from "@/components/common/FlipPage"
  export default {
    name: "List",
    props:{
      taskId:{
        type:String
      }
    },
    data(){
      return {
        showMark:[],
        allRequestList:[],
        totalPage:0,
        eventPage:1,
        showItems:5,
        firstTaskId:''
      }
    },
    components:{
      wFlipPage
    },
    methods:{
      displayMark(index){
        this.showMark = [];
        for(let i=0; i<this.allRequestList.length; i++){
          this.showMark.push(false)
        }
        this.$set(this.showMark, index, true)
      },
      hideMark(){
        this.showMark = [];
        for(let i=0; i<this.allRequestList.length; i++){
          this.showMark.push(false)
        }
      },
      async getFirstTaskId(){
          let {data} = await getTaskList('','1');
          this.firstTaskId = data [0].taskId;
          console.log(this.firstTaskId);
          this.getAllRequestList(this.firstTaskId,'');
          this.getRequestCountData(this.firstTaskId)
      },
      async getAllRequestList(taskId,page){//获取请求列表
        //console.log(taskId,page);
        //console.log(this.taskId);
        //let {data} = await getRequestList(this.taskId||taskId,page||this.eventPage);
        let {data} = await getRequestList(taskId,page||this.eventPage);
        this.allRequestList = data;
        for(let i=0; i<data.length; i++){
          this.showMark.push(false)
        }
        //this.totalPage = Math.ceil(data.length / 2)
        /*if(this.totalPage > 5){
          this.showItems = 5
        }else{
          this.showItems = this.totalPage
        }*/
      },
      async getRequestCountData(taskId){//获取请求数量
        let requestCount = (await getRequestCount(taskId)).data;
        this.totalPage = Math.ceil(requestCount / 10);

        if(this.totalPage > 5){
          this.showItems = 5
        }else{
          this.showItems = this.totalPage
        }

      },
      goPageFn(data){
        console.log(this.taskId);
        //console.log(data.page)
        //this.getAllRequestList(this.$route.query.taskId,data.page);
        if(this.taskId.length > 9){
          this.getAllRequestList("",data.page);
        }else{
          this.getAllRequestList(this.taskId,data.page);
        }
        this.eventPage = data.page
      }
    },
    computed:{
      /*totalPage(){
        return Math.ceil(this.allVulList.length / 5);
      }*/

    },
    filters:{
      responseState:function (value) {
        switch (parseInt(value)) {
          case 0:
            return "未检测"
            break;
          case 1:
            return "检测中"
            break;
          case 2:
            return "检测完成"
            break;
          case 3:
            return "检测异常"
            break;
          default:
            break
        }
      }
    },
    created(){
      //this.getFirstTaskId();
      //this.getRequestCountData(this.$route.query.taskId);
      //this.getAllRequestList();
      this.getAllRequestList('',1);
      this.getRequestCountData('');
    },
    watch:{
      /*totalPage:function(){
        this.getAllTaskList();
      }*/
      taskId:function (nv) {
        //console.log(nv);
        if(nv.length>9){
          console.log(nv);
          this.getAllRequestList('',1);
          this.getRequestCountData('');
        }else{
          console.log(nv);
          this.getAllRequestList(nv,1);
          this.getRequestCountData(nv);
        }
      }
    }/*,
    activated(){
      this.getAllRequestList(this.$route.query.taskId,'');
      this.getRequestCountData(this.$route.query.taskId);
    }*/
  }
</script>

<style scoped>
  /*.fade-enter-active,.fade-leave-active{
    transition: opacity .2s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }*/

  .listTable table tr:hover{
    cursor: pointer;
  }
</style>
