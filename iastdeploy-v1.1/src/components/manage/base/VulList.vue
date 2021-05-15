<template>
  <div class="mVulListPage">
    <div class="vulUrlListTab">
      <ul>
        <li :class="{vulUrlOn:active==0}" @click="tabVulUrl(0)">漏洞列表</li>
        <!--<li :class="{vulUrlOn:active==1}" @click="tabVulUrl(1)">url列表</li>-->
      </ul>
    </div>
    <div class="listTableCon" ref="listTableCon">
      <div class="listTable" v-show="active==0" style="min-height: 80px;">
        <table cellspacing="0" cellpadding="0" width="100%">
          <thead>
          <tr height="42">
            <th width="12%" style="position: relative">
              <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('vulTypeSearch')">漏洞类型</span>
              <form class="vulTypeSearch" ref="vulTypeSearch">
                <select name="" style="padding: 0px 1px 4px 1px;" id="vulServerityInput" data="clickBtn" v-model="appVulListSearchWords.vulName">
                  <option v-bind:value="pro.value" v-for="(pro) in vulNameStateOption">{{pro.text}}</option>
                </select>
              </form>
            </th>
            <th width="10%">
              <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('vulServeritySearch')">严重性</span>
              <form class="vulTypeSearch" ref="vulServeritySearch">
                <select name="" style="padding: 2px 1px; padding: 0px 1px 2px 1px;" id="vulServerityInput" data="clickBtn" v-model="appVulListSearchWords.vulVerserity">
                  <option v-bind:value="pro.value" v-for="(pro) in vulVerserityStateOption">{{pro.text}}</option>
                </select>
              </form>
            </th>
            <th width="42%">
              <span>漏洞地址</span>
            </th>
            <th width="16%">
              <span>检测时间</span>
            </th>
            <th width="8%">
              <span class="screenCondition" data="clickBtn" @click="showVulTypeSearchForm('vulStateSearch')">状态</span>
              <form class="vulTypeSearch userNoSearch" ref="vulStateSearch">
                <select name="" style="padding: 0px 1px 2px 1px;" id="vulStateSearch" data="clickBtn" v-model="appVulListSearchWords.vulState">
                  <option v-bind:value="pro.value" v-for="(pro) in fixedStateOption">{{pro.text}}</option>
                </select>
              </form>
            </th>
          </tr>
          </thead>
          <tbody>

          <router-link tag="tr" v-for="(vulItem,index) in vulList" :key="index" :to="{path:'/vulSummary',query:{vulId:vulItem.vulId}}" title="点击获取漏洞详细信息">
            <td>
              <span>{{vulItem.vulName}}</span>
            </td>
            <td>
              <span>{{vulItem.risk}}</span>
            </td>
            <td>
              <p :title="vulItem.url">{{vulItem.url ? vulItem.url.substring(0,76) : ""}}</p>
            </td>
            <td>
              <p>{{vulItem.testTime ? vulItem.testTime.substring(0,19) : ""}}</p>
            </td>
            <td>
              <p class="fixedStatus" :style="vulItem.vulState | colorFull">{{vulItem.vulState | fixedOrUnfixed}}</p>
            </td>
          </router-link>
          </tbody>
        </table>
        <wFlipPage  :showItems="showItems" :totalPage="totalPage" :initPage="eventPage" @goPage="goPageFn"></wFlipPage>
      </div>
      <!--<div class="url" v-show="active==1">url</div>-->
    </div>

  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import {getVulListByApp,getVulCountByApp,getVulNames} from "@/api/data"
  import wFlipPage from "@/components/common/FlipPage"
  export default {
    name: 'VulListPage',
    props:{
    },
    data () {
      return {
        active:0,
        vulList:[],
        totalPage:0,
        eventPage:1,
        showItems:1,
        vulNameStateOption:[],
        fixedStateOption:[
          {text:'所有',value:''},
          {text:'未修复',value:0},
          {text:'已修复',value:1},
        ],
        vulVerserityStateOption:[
          {text:'所有',value:''},
          {text:'低',value:'低'},
          {text:'中',value:'中'},
          {text:'高',value:'高'}
        ],
        appVulListSearchWords:{
          vulName:'',
          vulState:'',
          vulVerserity:''
        },
        flag:true
      }
    },
    components:{
      wFlipPage
    },
    computed:{
      ...mapGetters([
        "appId"
      ])
    },
    methods:{
      tabVulUrl(index){
        this.active = index
      },
      async getSingleVulList(id,appVulListSearchWords,page){//获取对应appId的漏洞列表
        let {vulName,vulState,vulVerserity} = appVulListSearchWords;
        let {data} = await getVulListByApp(id,vulName,vulState,vulVerserity,page);
        this.vulList = data;
      },
      async getSigleVulCountData(id,appVulListSearchWords){//获取对应appId的漏洞数量用来做翻页
        let {vulName,vulState,vulVerserity} = appVulListSearchWords;
        let vulCount = (await getVulCountByApp(id,vulName,vulState,vulVerserity)).data;
        this.totalPage = Math.ceil(vulCount / 10);
        if(this.totalPage > 5){
          this.showItems = 5
        }else{
          this.showItems = this.totalPage
        }
      },
      async getAllAppNames(){
        let dataVulNames = (await getVulNames()).data;
        let vulNameStateOption = dataVulNames.map(function (item) {
          return {
            text:item.vulName,
            value:item.vulName
          }
        })
        this.vulNameStateOption = [{text:'所有',value:''}].concat(vulNameStateOption).concat(vulNameStateOption);

      },
      goPageFn(data){
        if(!data.flipClick){
          this.getSingleVulList(this.appId,this.appVulListSearchWords,data.page);
        }
        this.eventPage = data.page
      },
      showVulTypeSearchForm(ele){
        $(event.target).parent().siblings().find('.vulTypeSearch').css({display:'none'})
        this.$refs[ele].style.display = this.$refs[ele].style.display == 'block' ? 'none' : 'block';

      },
      getSearchWords(fn){
        fn();
        this.getSingleVulList(this.appId,this.appVulListSearchWords,1);
        this.getSigleVulCountData(this.appId,this.appVulListSearchWords);
      },
      setWidth(){
        setTimeout(()=>{
          if(document.getElementById('statis')){
            let statisW = document.getElementById('statis').offsetWidth;
            let scanW = parseInt((statisW-42))/statisW*100;
            this.$refs.listTableCon.style.width = scanW +"%";
          }
        },100)
      }
    },
    created(){
      if(this.appId){
        this.getSingleVulList(this.appId,this.appVulListSearchWords,this.eventPage);
        this.getSigleVulCountData(this.appId,this.appVulListSearchWords);
        this.getAllAppNames();
      }
    },
    filters:{
      colorFull:function (value) {
        switch (parseInt(value)) {
          case 0:
            return "color:#d6cf4a;"
            break;
          case 1:
            return "color:rgb(152, 149, 149);"
            break;
          case 2:
            return "color:#34d846;"
            break;
          case 3:
            return "color:#d8670d;"
            break;
          case 4:
            return "color:#2006d8;"
            break;
          default:
            break
        }
      }
    },
    mounted(){
      this.setWidth();
      window.addEventListener('resize',()=>{
        this.setWidth();
      })

      $('body').click(function (e) {
        if(!e.target.getAttribute('data')){
          $('.vulTypeSearch').css({display:'none'});
        };
      })
    },
    watch:{
      appId:function(){
        this.eventPage = 1;
        this.appVulListSearchWords.vulName = '';
        this.appVulListSearchWords.vulState = '';
        this.appVulListSearchWords.vulVerserity = '';
        this.getSingleVulList(this.appId,this.appVulListSearchWords,this.eventPage);
        this.getSigleVulCountData(this.appId,this.appVulListSearchWords);
        this.getAllAppNames();
      },
      appVulListSearchWords:{
        handler:function (appVulListSearchWords) {
          let vm = this;
          vm.flag = true;
          $('.pageCon a').toArray().forEach((item)=>{
            item.setAttribute('data','flipClick')
          })
          $('body').unbind('click')
          $('body').click(function (e) {
            if(e.target.tagName === 'TD' || e.target.tagName === 'P'){
              vm.appVulListSearchWords.vulName = '';
              vm.appVulListSearchWords.vulState = '';
              vm.appVulListSearchWords.vulVerserity = '';
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
      },
      totalPage:function(){
        //console.log("totalPage changed!!!");
        //this.getSingleVulList(this.appId,this.eventPage);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .listTable{
    /*padding-bottom: 29px;*/
  }
  .listTable table td, .listTable table th{
    font-size: 14px;
  }
  .listTable table p{
    font-size: 12px;
  }
  .listTable table td span{
    font-size: 12px;
  }
  .listTableCon{
    width: 921px;
  }
  /*添加100%比布局样式*/
  .listTableCon{
    /*width: auto;
    flex-basis: 1141px;*/
    width: 96.2%;
  }
  .flipPage{
    /*margin-top: 15px;*/
  }

</style>
