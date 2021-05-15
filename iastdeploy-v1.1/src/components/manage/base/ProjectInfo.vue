<template>
<div class="basicInfo">
    <div class="biTitle">
        <h2>基础信息</h2>
    </div>
    <div class="biContent" id="biContent" style="position: relative;">
        <wTips :msg="msg" v-show="isShow"></wTips>
        <div class="projectName" v-show="!isShow">
            <p ref="pele">应用名称：<span>{{projectInfo.envName}}</span><i></i>任务数：<span class="redColor">{{projectInfo.taskNum}}</span></p>
        </div>
        <div class="projectName filterSame" v-show="!isShow">
            <p ref="pele">请求数：<span class="redColor">{{projectInfo.reqNum}}</span>（已检测:<span class="redColor">{{projectInfo.testedReqNum}}</span>&nbsp;&nbsp;检测中:{{projectInfo.testingReqNum}}&nbsp;&nbsp;待检测:{{projectInfo.wattingTestReqNum}}）</p>
        </div>
        <div class="projectName holeNum" v-show="!isShow">
            <p ref="pele">漏洞数：<span class="redColor">{{projectInfo.vulNum}}</span>（未修复数:<span class="redColor">{{projectInfo.unFixedVulNum}}</span>）</p>
        </div>
        <div class="projectName projectAdd" v-show="!isShow">
            <p ref="pele">应用地址：<span>{{projectInfo.appAdress}}</span></p>
        </div>
    </div>
</div>
</template>

<script>
  import {getAppBasicInfo} from "@/api/data"
  import wTips from "@/components/common/Tips"
  import { mapGetters } from 'vuex'
  export default {
    name: 'BasicInfo',
    props:{
       projectInfo:{
         type:Object
       },
       isShow:{
         type:Boolean
       },
       msg:{
         type:String
       }
    },
    data () {
      return {
        show:true,
      }
    },
    methods:{
      setBasicInfoStyle(){
        setTimeout(()=>{
          let pEle = document.querySelectorAll('.projectName p');
          let spanEle = document.querySelectorAll('.projectName .redColor');
          for(let j = 0; j<spanEle.length; j++){
            spanEle[j].style.color = "#ff0000"
          }
          for(let i = 0; i<pEle.length; i++){
            pEle[i].style.color = '#807a7a';
            if(pEle[i].children[1] && pEle[i].children[1].tagName === 'I'){
              pEle[i].children[1].style.backgroundColor = "#30a1c6"
            };
          }
        },800)
      }
    },
    components:{
      wTips
    },
    computed:{
      ...mapGetters([
        "appId"
      ])
    },
    mounted(){
      this.setBasicInfoStyle();
    },
    created(){
    },
    watch:{
      appId:function () {
        this.setBasicInfoStyle();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
