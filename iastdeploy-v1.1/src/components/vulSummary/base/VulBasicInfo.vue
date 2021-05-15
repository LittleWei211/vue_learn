<template>
  <div class="vulBasicInfo">
    <div class="vulLevelStatus">
      <span><span style="color:#20a0ff; font-weight: bold;">漏洞等级：</span>{{vulSummary.risk || ""}}</span>&nbsp;&nbsp;
    </div>
    <div class="vulType">
      <span style="color:#20a0ff; font-weight: bold;">漏洞状态：</span>
      <p class="vulStateView" title="点击可修改" v-show="!isModify" v-on:click="modifyVulState">{{selectedState | vulState}}</p>
      <select name="" id="" style="width:64px;height: 21px; line-height: 21px; float: left; margin-top: 3px;" v-show="isModify" v-model="selectedState">
        <option v-bind:value="option.value" v-for=" option in modifyVulStateOption">
          {{option.text}}
        </option>
      </select>
      <i style="height: 28px; margin-left: 5px; float: left;" v-show="isModify" @click="modifyVulState"><svg t="1579229528406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6066" width="16" height="28"><path d="M997.888 70.144C686.592 261.12 460.8 502.272 358.912 623.104l-248.832-195.072-110.08 88.576 429.568 437.248c73.728-189.44 308.224-559.616 594.432-822.784l-26.112-60.928m0 0z" p-id="6067"></path></svg></i>
    </div>
    <div class="vulType">
      <span style="color:#20a0ff; font-weight: bold;">漏洞类型：</span><p>{{vulSummary.vulName || ""}}</p>
    </div>
    <div class="vulType">
      <span style="color:#20a0ff; font-weight: bold;">测试人员：</span><p>{{vulSummary.tester || ""}}</p>
    </div>
    <div class="vulType">
      <span style="color:#20a0ff; font-weight: bold;">检测时间：</span><p>{{vulSummary.requTime || ""}}</p>
    </div>
    <div class="vulType">
      <span style="color:#20a0ff; font-weight: bold;">漏洞地址：</span><p>{{vulSummary.busUrl || ""}}</p>
    </div>
    <!--<div class="payLoad">
      <span>payLoad：</span><p>"<"details ontoggle=alert(1)">"</p>
    </div>-->
  </div>
</template>

<script>
  import {changeVulStatus} from '../../../api/data'
  export default {
    name: "VulBasicInfo",
    props:{
      vulSummary:{
        type:Object
      },
      vulId:{
        type:String
      }
    },
    data(){
      return {
        isModify:false,
        modifyVulStateOption:[//漏洞状态下拉选项
          {text:'新发现',value:0},
          {text:'已确认',value:1},
          {text:'已修复',value:2},
          {text:'误报',value:3},
          {text:'忽略',value:4},
        ],
        selectedState:''
      }
    },
    filters:{
      vulState:function (value) {
        switch (parseInt(value)) {
          case 0:
            return "新发现"
            break;
          case 1:
            return "已确认"
            break;
          case 2:
            return "已修复"
            break;
          case 3:
            return "误报"
            break;
          case 4:
            return "忽略"
            break;
          default:
            break
        }
      }
    },
    methods:{
      modifyVulState(event){
        this.isModify = !this.isModify;
        //this.vulSummary.state = this.selectedState;
        if(event.target.tagName === 'I' || event.target.tagName === 'svg' || event.target.tagName === 'path'){
          changeVulStatus(this.vulId,this.selectedState);
        }
      }
    },
    created(){
       //this.selectedState = this.vulSummary.state
    },
    mounted(){
      $('body').click(function(e){
        if(e.target.className !== 'vulStateView' && e.target.tagName !== 'I' && e.target.tagName !== 'svg' && e.target.tagName !== 'path' && e.target.tagName !== 'SELECT'){
          //this.isModify = !this.isModify;
          this.isModify = false
        }

      }.bind(this))
    },
    watch:{
      vulSummary:{
        handler:function (vulSummary) {
          this.selectedState = vulSummary.state;

        },
        deep:true
      }
    }
  }
</script>

<style scoped>

</style>

