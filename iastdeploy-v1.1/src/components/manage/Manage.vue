<template>
    <div class="home">
      <div class="headCon"></div>
			<wHead></wHead>
			<div class="main">
					<div class="left" ref="left" :style="heightLeft" style="position: relative;">
						<!--<wProjectSearch @sendSearchWord="getSearchWord"></wProjectSearch>-->
            <wProjectList :projectList="projectList" :searchWord="searchWord" @sendId="getAppBasicDataP" @sendCurrPage="getCurrPage" :msg="msg.appListMsg"></wProjectList>
					</div>

          <div class="right" ref="right" :style="heightRight">
              <wProjectInfo :projectInfo="projectInfo" :msg="msg.basicMsg" :isShow="isShow"></wProjectInfo>
              <div class="statisSiteMap">
                <div class="ssHead">
                  <ul>
                    <li v-for="(tab,index) in tabs" :class="{ssActive:active==index}" @click="toggle(index,tab.view)">{{tab.type}}</li>
                  </ul>
                </div>
                <div class="ssContainer">
                  <wStatis v-show="!active" :hideScrollBar="isHideScrollBar"></wStatis>
                </div>
              </div>
          </div>
			</div>
			<!--<wFoot ref="footer"></wFoot>-->
    </div>
</template>

<script>
import {getAppList,getAppBasicInfo} from "@/api/data"
import wHead from "@/components/common/Head"
import wFoot from "@/components/common/Foot"
import wProjectSearch from "@/components/manage/base/ProjectSearch"
import wProjectList from "@/components/manage/base/ProjectList"
import wProjectInfo from "@/components/manage/base/ProjectInfo"
import wStatis from "@/components/manage/base/Statis"
import wSiteMap from "@/components/manage/base/Sitemap"
import { mapGetters } from 'vuex'

export default {
  name: 'Manage',
  data () {
    return {
			firstId:'-1',
      //appId:'',
			projectInfo:{},
      projectList:[],
      active:0,
      currPage:1,
      searchWord:'',
      isShow:false,
      msg:{
			  basicMsg:'',
        appListMsg:''
      },
      currentView:'wStatis',
      tabs:[
        {
          type:"项目统计",
          view:"wStatis"
        }/*,
        {
          type:"sitemap",
          view:"wSiteMap"
        }*/
      ],
      heightLeft:{
			  height:''
      },
      heightRight:{
        height:''
      },
      heightDivCon:{
        height:''
      },
      isHideScrollBar:true,
    }
	},
	components:{
		wHead,
		wFoot,
		wProjectSearch,
		wProjectList,
		wProjectInfo,
    wStatis,
    wSiteMap
	},
	methods:{
    toggle(i,v){
      this.active=i;
      this.currentView = v;
      if(i==1){
        this.isHideScrollBar=true
      }else{
        this.isHideScrollBar=false
      }
      this.$nextTick(function(){
        if(document.getElementById('resize')){
          document.getElementById('resize').style.height = '250px';
          document.getElementById('resize').style.height = '240px';
        }
      })
    },
    initPage(){
      var clientHeight = document.documentElement.clientHeight;
      var topHeight = document.getElementById("head").offsetHeight;
      this.heightLeft.height = clientHeight - topHeight  -82 - 2 - 15 +'px';
      this.heightRight.height = clientHeight - topHeight - 40 -2  +'px';
      this.heightDivCon.height = clientHeight - topHeight +'px';
    },
    getAppListDateP(){//获取应用列表
      return new Promise((resolve, reject)=>{
        getAppList(this.currPage,this.searchWord).then(res => {
          let { data } = res;

          if(data.length > 0){
            this.projectList = data;
            //this.firstId = data[0].envId;//获取第一个应用的id
            this.firstId = data[0].envId;//获取第一个应用的id

            //this.firstId = data[1].envId;//获取第一个应用的id


            this.$store.commit("changeAppId",this.firstId+"")//store存储appId
          }else{
            //无数据
            this.isShow = true;
            this.projectList = [];
            this.msg.appListMsg = "暂无数据...";
          }
          resolve();

        }).catch(err => {
          reject();
          //网络请求异常
          this.$store.commit("changeAppId","-2")
          this.isShow = true;
          if(err.response){
            this.msg.appListMsg = "接口请求异常，无法获取应用列表数据...";
          }else if(err.request){
            this.msg.appListMsg = "接口请求异常，无法获取应用列表数据...";
          }else{

          }
        })

      })
    },


    getAppBasicDataP(id,envName){//获取基础信息
      return new Promise((resolve, reject)=>{
        this.$store.commit("changeAppId",(id||this.firstId)+"")
        getAppBasicInfo((this.appId||this.firstId)+'').then(res=>{
          let {data} = res;
          if(data.length > 0){
            //有数据
            this.isShow = false;
            this.projectInfo = data[0];

          }else{
            //无数据
            this.isShow = true;
            this.projectInfo = {};
            this.msg.basicMsg = "暂无数据...";
          }
          //resolve();
        }).catch(err =>{
          //reject();
          //网络请求异常
          this.isShow = true;
          if(err.response){
            this.msg.basicMsg = "接口请求异常，无法获取应用数据...";
          }else if(err.request){
            this.msg.basicMsg = "接口请求异常，无法获取应用数据...";
          }else{
            this.msg.basicMsg = "接口请求异常，无法获取应用数据...";
          }
        })
      })
    },

    getCurrPage(sendPage){//获取应用列表翻页当前页
      this.currPage = sendPage;
    },
    getSearchWord(searchWord,initCurrPage){
      this.searchWord = searchWord;
      this.currPage = initCurrPage;
    }

	},
  computed:{
    ...mapGetters([
      "appId"
    ]),
    currPageSearchWord(){
      const {currPage, searchWord} = this;
      return {
        currPage,
        searchWord
      }
    }
  },
	created(){
    //window.addEventListener('resize',this.initPage)
    //this.getAppListData();
    //this.getAppBasicData();
    // this.getCurrPage()

    this.getAppListDateP().then(this.getAppBasicDataP,() => {
      this.msg.basicMsg = "接口请求异常，无法获取应用数据"
    })

	},
  mounted(){
    this.initPage();
  },
  watch:{
    firstId:function(newValue,oldValue){
      //this.getAppBasicData();
      //this.getAppBasicDataP();
    },
    currPage:function () {
      //this.getAppListData();
      /*this.getAppListDateP().then(this.getAppBasicDataP,() => {
        this.msg.basicMsg = "接口请求异常，无法获取应用数据"
      })*/
    },
    currPageSearchWord:{//当页码或者搜索词发送变化时候执行
      handler:function () {
        this.getAppListDateP().then(this.getAppBasicDataP,() => {
          this.msg.basicMsg = "接口请求异常，无法获取应用数据"
        })
      },
      deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .home{
    background-color: #f9f9f9;
    min-width: 1200px;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity .5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }

  .footer{
    position: relative;
    z-index: 100;
  }
  body{
    overflow: hidden;
  }
  .right{
    width: 980px;
  }

  /*修改100%布局样式*/
  .main{
    width: 99%;
  }
  .left{
    margin-right: 20px;
    /*padding-bottom: 50px;*/
    padding-bottom: 35px;
    width: 309px;
    padding-right: 1px;
  }
  .right{
    width: auto;
    margin-left: 20px;
    float: none;
  }

</style>
