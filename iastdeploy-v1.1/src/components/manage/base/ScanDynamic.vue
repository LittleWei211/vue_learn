<template>
    <div class="scanDynamic" ref="scanDynamic">
      <div class="scan">
        <div class="scanHead">
          <h2>扫描动态</h2>
          <!--<div class="refresh">刷新</div>-->
        </div>
        <div class="scanContent" ref="resize" id="resize">
          <wTips v-show="isShow" :msg="msg"></wTips>
          <ul class="ulScanContent">
            <li v-for="(appRunInfoItem,index) in appRunInfo" v-if="appRunInfoItem.testTime">
              <div class="scanTime">{{appRunInfoItem.testTime}}</div>
              <div class="scanResult">
                <p>
                  <span>{{appRunInfoItem.vulState}}</span>
                  <span>{{appRunInfoItem.url}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    import { mapGetters} from 'vuex'
    import wTips from "@/components/common/Tips"
    import {getAppRunInfos} from '../../../api/data'
    /*import $ from 'jquery'*/
    import 'jquery.nicescroll'
    export default {
        name: "ScanDynamic",
        props:{
          hideBar:{
            type:Boolean
          },
          /*appId:{
            type:String
          },*/
          scanW:{
            type:Object
          }
        },
        data(){
          return {
            isShow:false,
            msg:'',
            appRunInfo:[
              {

              }
            ]
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
        methods:{
          getAppRunInfoData(id){//获取扫描动态
            getAppRunInfos(id).then(res =>{
              let {data} = res;
              if(data.length > 0){
                //有数据
                this.isShow = false;
                this.appRunInfo = data;
              }else{
                //无数据
                this.isShow = true;
                this.appRunInfo = [];
                this.msg = "暂无数据...";
              }
            }).catch(err =>{
              //网络请求异常
              this.isShow = true;
              if(err.response){
                this.msg = "接口请求异常，无法获取扫描数据...";
              }else if(err.request){
                this.msg = "接口请求异常，无法获取扫描数据...";
              }else{
              }
            });

          },
          resizeScanContent(){
            this.$refs.resize.style.height = '241px';
            this.$refs.resize.style.height = '240px';
          }
        },
        created(){
          if(this.appId){
            this.getAppRunInfoData(this.appId);
          }

        },
        mounted(){
          $(".scanContent").niceScroll({
            cursorcolor:"#efefef",
            cursorcolor:"#ccc",
            //autohidemode:this.hideScrollBar,
            autohidemode:this.hideBar,
            //hwacceleration:true,
            cursorwidth:"3px",
            //railpadding: {right:-8,top:0,left:0,bottom:0}
            railpadding: {right:-5,top:0,left:0,bottom:0}
          })

          setTimeout(()=>{
            if(document.getElementById('statis')){
              let statisW = document.getElementById('statis').offsetWidth;
              let scanW = parseInt((statisW-45)/2)/statisW*100;
              this.$refs.scanDynamic.style.width = scanW +"%";
            }

          },100)
        },
        watch:{
          appId:function () {
            this.getAppRunInfoData(this.appId);
            this.resizeScanContent();
          }
        }
    }
</script>

<style scoped>
  .scan{
    width: 450px;
  }

  /*修改100%布局样式*/
  .scanDynamic{
    /*display: flex;
    flex-basis: 558px;
    position: relative;
    height: 292px;
    border:1px solid #eee;*/
    border:1px solid #eee;
    position: relative;
    width: 48%;
    height: 292px;
  }
  .scan{
    width: 96.5%;
    /*display: flex;
    flex-basis: 558px;*/
    border:none;
    height: 292px;
  }
</style>
