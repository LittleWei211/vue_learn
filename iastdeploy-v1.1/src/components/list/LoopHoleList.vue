<template>
  <div class="loopHoleList">
      <div class="headCon"></div>
      <wHead></wHead>
      <div class="main" style="border-bottom: none; margin-bottom: 0; position: relative; padding: 0 30px">
        <!--<wVulSearch @sendKeyWord="receiveKeyWord"></wVulSearch>-->
        <!--<span id="inputTips"></span>
        <a href="javascript:void(0);" class="refreshBtn" @click="refreshData" title="刷新列表数据">刷&nbsp;&nbsp;&nbsp;&nbsp;新</a>-->
      </div>
      <div class="main" style="margin-top: 0; overflow: visible;border-top: none;">
          <wLoopHoleList :keyWord="keyWord"></wLoopHoleList>
      </div>
      <!--<wFoot></wFoot>-->
  </div>
</template>

<script>
import wHead from "@/components/common/Head"
import wFoot from "@/components/common/Foot"
import wLoopHoleList from "@/components/list/base/List"
import wVulSearch from "@/components/list/base/VulSearch"
export default {
  name: 'LoopHoleList',
  data () {
    return {
      //vulList: '',
      keyWord:{
        vulName:'',
        userNo:''
      },
      timeFlag:0
    }
  },
  components:{
    wHead,
    wLoopHoleList,
    wVulSearch,
    wFoot
  },
  methods:{
    receiveKeyWord(keyWord){
      this.keyWord.vulName = keyWord.vulName;
      this.keyWord.userNo = keyWord.userNo;
      console.log(this.keyWord);
    },
    /*refreshData(){
      let time = new Date().toLocaleString()
      this.keyWord.userNo = time.substring(0,time.length-1);
    }*/
  },
  beforeRouteLeave(from , to , next){
    $('.vulTypeSearch').css({display:'none'});
    $('body').unbind('click')
    $('.pageCon a').toArray().forEach((item)=>{
      item.removeAttribute('data')
    })
    next()
  },
  activated(){
    let timeFlag = new Date().getTime();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loopHoleList{
    background-color: #f9f9f9;
    height: 100%;
  }
  .main{
    width: 1160px;
    width: 1260px;
    padding: 15px 30px;
    border: 1px solid #eee;
    background-color: #fff;
  }
  .refreshBtn{
    width: 98px;
    text-align: center;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    position: absolute;
    right: 140px;
    top: 15px;
    border: none;
    color: #fff;
    padding: 3px 5px;
    background-color: #5fc65f;
    background-color: #3a8ee6;
    outline: none;
    border-radius: 2px;
    /*width: 30px;
    background-image: url("../../../static/images/refresh1.gif");
    background-size: 30px 30px;
    border:none;
    outline: none;*/
  }
</style>
