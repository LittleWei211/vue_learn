<template>
  <div class="application">
      <div class="headCon"></div>
      <wHead></wHead>
      <div class="main">
        <wAppInfo :appTotalInfo="appTotalInfo"></wAppInfo>
        <wVulTopFive :isShow="isShow"></wVulTopFive>
        <wCircularGraph :mark="circularRef[0]" :vulDisData2="vulDisData2" :title="titleLevel" :isShow="isShow.levelStatus">
          <wTips :msg="msg.vulLevel" v-show="isShow.levelStatus" slot="zlVulStatus"></wTips>
        </wCircularGraph>
        <wCircularGraph :mark="circularRef[1]" :vulDisData1="vulDisData1" :title="titleTop10" :isShow="isShow.dis" :style="styleObj">
          <wTips :msg="msg.vulDis" v-show="isShow.dis" slot="zlDis"></wTips>
        </wCircularGraph>
        <wVulStatus :vulStatus="vulStatus" :isShow="isShow.levelStatus">
          <wTips :msg="msg.vulLevel" v-show="isShow.levelStatus" slot="zlVulStatus"></wTips>
        </wVulStatus>
      </div>
			<!--<wFoot></wFoot>-->
  </div>
</template>

<script>
import {getTotalInfo,getVulDistribution,getVulStatus} from '../../api/data'
import wHead from "@/components/common/Head"
import wFoot from "@/components/common/Foot"
import wAppInfo from "@/components/home/base/AppInfo"
import wVulTopFive from "@/components/home/base/VulTopFive"
import wCircularGraph from "@/components/manage/base/CircularGraph"
import wVulStatus from '@/components/manage/base/VulStatus'
import wTips from '@/components/common/Tips'
export default {
  name: 'Application',
  data () {
    return {
      isShow:{
        levelStatus:false,
        dis:false
      },
      msg:{
        vulLevel:'',
        vulDis:''
      },
      appTotalInfo:{},
      titleLevel: '漏洞等级',
      titleTop10:'漏洞类型分布Top10',
      circularRef:['vulLevel','top10'],
      styleObj:{
        margin:"20px 0",
        width:"417px"
      },
      vulDisData2:[
        {
          value:-1
        }
      ],
      vulDisData1:[
        {
          value:-1
        }
      ],
      vulStatus:[
        {}
      ]
    }
  },
  components:{
		wHead,
    wFoot,
    wAppInfo,
    wVulTopFive,
    wCircularGraph,
    wVulStatus,
    wTips
	},
  methods:{
    async getTotalInfoData(){//获取总览信息，应用数，任务数，请求数，漏洞数
      let {data} = await getTotalInfo();
      this.appTotalInfo = data;
    },

    getAllVulDisTopTenData(){//获取所有漏洞top10
      getVulDistribution().then(res => {
        let {data} = res;
        if(data.length > 0){
          //有数据
          this.vulDisData1 = data.map((item,index) => {
            return {
              value:item.vulNum,
              name:item.vulName
            }
          });
        }else{
          //无数据
          this.msg.vulDis = "暂无漏洞dis...";
          this.isShow.dis = true;
        }

      }).catch(err => {
        //网络异常
        this.isShow.dis = true;
        if(err.response){
          this.msg.vulDis = "接口请求异常，无法获取数据dis...";
        }else if(err.request){
          this.msg.vulDis = "接口请求异常，无法获取数据dis...";
        }else{
        }
      })


    },

    getVulStatusData(){//获取总览漏洞状态
      getVulStatus().then(res => {
        let {data} = res;
        //console.log(data);
        if(data.length > 0){
          //有数据
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
          this.vulDisData2 = data.map(function(item,index){
            return {
              value:item.vulNum,
              name:item.risk||"无"
            }
          });
          this.vulStatus = data;
        }else{
          //无数据

          this.msg.vulLevel = "暂无漏洞level..."
          this.isShow.levelStatus = true;
        }

      }).catch(err => {
        //网络异常
        this.isShow.levelStatus = true;
        if(err.response){
          this.msg.vulLevel = "接口请求异常，无法获取数据level...";
        }else if(err.request){
          this.msg.vulLevel = "接口请求异常，无法获取数据level...";
        }else{
        }
      })
    }
  },
  created(){
    this.getTotalInfoData();
    this.getAllVulDisTopTenData();
    this.getVulStatusData();
  },
  watch:{
    /*appTotalInfo:function () {
      this.getTotalInfoData();
    },*/
    /*vulDisData2:function () {
      this.getVulStatusData();
    },
    vulDisData1:function () {
      this.getAllVulDisTopTenData();
    }*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.application{
  background-color: #f9f9f9;
}
.circleGraphCon{
  width: 348px;
  width: 378px;
  height: 300px;
  float: left;
  margin:20px;
}
.vulStatusCon{
  width: 1196px;
  width: 1296px;
  margin-top:0;
}
</style>
