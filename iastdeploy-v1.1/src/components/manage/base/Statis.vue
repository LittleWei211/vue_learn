<template>
    <div class="statis" id="statis">
      <wScanDynamic :hideBar="hideScrollBar" :appId="appId"></wScanDynamic>
      <wCircularGraph :mark="circularRef[1]" :vulDisData="vulDisData" :title="title" :appId1="appId" :isShow="isShow.dis" ref="circleCon">
        <wTips v-show="isShow.dis" :msg="msg.topTen" slot="disTip"></wTips>
      </wCircularGraph>
      <wVulStatus :vulStatus="vulStatus" :isShow="isShow.status" ref="vulStatus">
        <wTips v-show="isShow.status" :msg="msg.vulState" slot="statusTip"></wTips>
      </wVulStatus>
      <wVulList :isShow="isShow" ></wVulList>
    </div>
</template>

<script>
    import {getVulDistribution,getVulStatus,getVulList} from '../../../api/data'
    import wScanDynamic from "./ScanDynamic"
    import wCircularGraph from "./CircularGraph"
    import wVulStatus from  "./VulStatus"
    import wVulList from "./VulList"
    import wTips from "../../common/Tips"
    import { mapGetters} from "vuex"
    export default {
        name: "Statis",
        props:{
          hideScrollBar:{
            type:Boolean
          }
        },
        data(){
          return {
            title:'漏洞类型分布TOP10',
            isShow:{
              dis:false,
              status:false
            },
            cssStyle:{

            },
            wObj:{
              width:null
            },
            msg:{
              topTen:'',
              vulState:''
            },
            vulDisData:[
              {
                value:-1
              }
            ],
            vulStatus:[
              {
              }
            ],
            circularRef:['vulLevel','top10']
          }
        },
        components:{
          wScanDynamic,
          wCircularGraph,
          wVulStatus,
          wVulList,
          wTips
        },
        computed:{
          ...mapGetters([
            "appId"
          ])
        },
        methods:{
          getVulDisTopTenData(id){//获取漏洞top10
            getVulDistribution(id).then(res =>{
              let {data} = res;
                //console.log(data)
              if(data.length > 0){
                //有数据
                this.isShow.dis = false;
                this.vulDisData = data.map((item,index) => {
                  return {
                    value:item.vulNum,
                    name:item.vulName

                  }
                });
              }else{
                //无数据
                //this.vulDisData = [];
                this.msg.topTen = "暂无数据..."
                this.isShow.dis = true;
              }
            }).catch(err =>{
              //网络请求异常

              this.isShow.dis = true;
              if(err.response){
                this.msg.topTen = "接口请求异常，无法获取数据topTen...";
              }else if(err.request){
                this.msg.topTen = "接口请求异常，无法获取数据topTen...";
              }else{
              }
            })

          },

          getVulStatusData(id){//获取漏洞状态
            getVulStatus(id).then(res  => {
              let {data} = res;
              if(data.length > 0){
                //有数据
                this.isShow.status = false;
                data.forEach((item)=>{
                  switch (item.risk) {
                    case "高":
                      item.risk = "高危";
                      item.level = 0;
                      break;
                    case "中":
                      item.risk = "中危";
                      item.level = 1;
                      break;
                    case "低":
                      item.risk = "低危";
                      item.level = 2;
                      break;
                    case "提示":
                      item.level = 3;
                      break;
                    default:
                      break;
                  }
                })
                data.sort(function (a,b) {
                  return a.level - b.level
                })
                this.vulStatus = data;
              }else{
                //无数据
                //this.vulStatus = [];
                this.msg.vulState = "暂无数据...";
                this.isShow.status = true;
              }
            }).catch(err =>{
              //网络请求异常
              this.isShow.status = true;
              if(err.response){
                this.msg.vulState = "接口请求异常，无法获取数据status...";
              }else if(err.request){
                this.msg.vulState = "接口请求异常，无法获取数据status...";
              }else{
              }
            })

          }
        },
        created(){
          if(this.appId){
            this.getVulDisTopTenData(this.appId)
            this.getVulStatusData(this.appId);
          }

          /*this.getVulDisTopTenData(this.appId)
          this.getVulStatusData(this.appId);*/
        },
        mounted(){
        },
        watch:{
          appId:function (o,n) {
            this.getVulDisTopTenData(this.appId)
            this.getVulStatusData(this.appId);
          }
        }
    }
</script>

<style scoped>
  .listPage{
    width:100%;
  }
  .vulStatusCon{
    width: 941px;
  }
  /*添加百分比布局样式*/
  .vulStatusCon{
    /*width: auto;
    flex-basis: 1141px;*/
    width: 98%;
  }
  .statis{
    /*display: flex;
    flex-wrap: wrap;
    justify-content: space-between;*/
  }
  .flexCon{
    /*flex-basis: 1158px;
    display: flex;
    justify-content: space-between;*/
  }


</style>
