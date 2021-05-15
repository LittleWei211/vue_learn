<template>
    <div class="projectList" id="projectList" ref="resize">
        <ul id="ulScroll">
          <li v-for="(projectItem,index) in projectList" :key="index" @click="getTagAppId(projectItem.envId,index,projectItem.envName)" :class="{nowPro:active == index}" v-if="projectItem.envId">
              <div class="projectInfoL">
                  <p class="proName">{{projectItem.envName}}</p>
                  <p class="loopholeIp">{{projectItem.appAdress}}</p>
                  <p class="loopholeNum">漏洞数{{projectItem.vulNum}}(未修复{{projectItem.unFixedVulNum}})</p>
                  <!-- <p class="loopholeTest">测试人员数：<i>{{projectItem.testerNum}}</i></p> -->
              </div>
              <!-- <div class="projectInfoR">
                  <p class="loopholeType">未检测逻辑漏洞</p>
                  <p class="isInput"><span>允许录入</span></p>
                  <p class="tester">testbd</p>
              </div> -->
          </li>
          <!--<li v-for="(projectItem,index) in projectList" :key="index" @click="getTagAppId(projectItem.envId,index,projectItem.envName)" :class="{nowPro:active == index}" v-if="projectItem.envId === 6">
            <div class="projectInfoL">
              <p class="proName">{{projectItem.envName}}</p>
              <p class="loopholeIp">{{projectItem.appAdress}}</p>
              <p class="loopholeNum">漏洞数{{projectItem.vulNum}}(未修复{{projectItem.unFixedVulNum}})</p>
            </div>
          </li>-->
        </ul>
        <wTips v-show="projectList.length == 0" :msg="msg"></wTips>
        <div class="pageFlip" v-show="projectList.length > 0">
          <button class="prev" @click="prev">&lt;&lt;</button>
          <p><i>{{pageParams.page}}</i><span>/{{totalPage}}</span></p>
          <button class="next" @click="next">&gt;&gt;</button>
        </div>
    </div>
</template>

<script>
import { mapGetters} from 'vuex'
import wTips from "@/components/common/Tips"
import {getAppsCount} from '../../../api/data'
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  name: 'ProjectList',
  props:{
      projectList:{
          type:Array
      },
      searchWord:{
        type:String
      },
      msg:{
        type:String
      }
  },
  data () {
    return {
      appCounts:'',
      firstId:'',
      //active:0,
      active:0,
      pageParams:{
        page:1,
        limited:10,
        totalNum:15,
        start:0,
        end:4
      }
      //appList:''
    }
  },
  components:{
    wTips
  },
  methods:{
      async getAppsCount(searchWord){//获取应用数量做翻页
        let {data} = await getAppsCount(searchWord);
        this.appCounts = data;
      },
      /*resizeScanContent(){
        this.$refs.resize.style.height = '201px';
        this.$refs.resize.style.height = '200px';
      },*/
      setIsScroll(){
        let clientHeight = document.documentElement.clientHeight;
        let topHeight = document.getElementById("head").offsetHeight;
        setTimeout(()=>{
          if(document.getElementById('ulScroll')){
            var scrollUlHeight = document.getElementById('ulScroll').offsetHeight;
            if (scrollUlHeight > clientHeight - topHeight - 99) {
              document.getElementById('projectList').style.overflowY = "scroll";
              document.getElementById('ulScroll').style.width = "98%"
            } else {
              document.getElementById('projectList').style.overflowY = "hidden";
              document.getElementById('ulScroll').style.width = "97%"
            }
          }
        },20)
      },
      getTagAppId(id,index,envName){
          if(this.appId == id)return;
          this.$emit("sendId",id,envName);
          this.active = index;
      },
      prev(){
          if(this.pageParams.page <= 1){
            this.pageParams.page = 1;
          }else{
            this.pageParams.page --;
          }
          this.active = 0;
        //this.pageParams.start = this.pageParams.limited * (this.pageParams.page-1)-1+1;
        //this.pageParams.end = this.pageParams.limited * this.pageParams.page -1;
        this.$emit("sendCurrPage",this.pageParams.page);
        //this.resizeScanContent();
      },
      next(){
        if(this.pageParams.page >= this.totalPage){
          this.pageParams.page = this.totalPage;
        }else{
          this.pageParams.page ++;
        }
        this.active = 0;
        //this.pageParams.start = this.pageParams.limited * (this.pageParams.page-1)-1+1;
        //this.pageParams.end = this.pageParams.limited * this.pageParams.page -1;
        this.$emit("sendCurrPage",this.pageParams.page);
        //this.resizeScanContent();
      }
  },
  computed:{
    ...mapGetters([
      "appId"
    ]),
    totalPage(){
      //return 5;
      return Math.ceil(this.appCounts/this.pageParams.limited)||5
    },
    /*appList(){
      return this.projectList;
      return this.projectList.slice(this.pageParams.start,this.pageParams.end+1)
    }*/
  },
  filters:{
    appListFilter:function(value,id){
      return value+id;
    }
  },
  created(){

    this.getAppsCount();
    //this.projectList.splice(this.pageParams.start,this.pageParams.end+1)
  },
  mounted(){
    /*$(".projectList").niceScroll({
      cursorcolor:"#efefef",
      autohidemode:this.hideScrollBar,
      hwacceleration:true,
      cursorwidth:"3px",
      railpadding: {right:-8,top:0,left:0,bottom:0}
    })*/
  },
  watch:{
    searchWord:function (oVal) {
      //console.log(oVal);
      this.pageParams.page = 1;
      this.active = 0;
      this.getAppsCount(oVal);
    },
    projectList:{
      handler:function () {
        //console.log('appList changed!!');
        this.setIsScroll();
      },
      deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.projectList{
  /*height: 426px;*/
  height: 100%;
  /*overflow-y: scroll;*/
}
.pageFlip{
  width: 316px;
  left: 2px;
  bottom:8px;
}
</style>
