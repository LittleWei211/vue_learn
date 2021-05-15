<template>
<div class="listPage">
    <div class="listTable">
        <table cellspacing="0" cellpadding="0" width="100%">
            <thead>
                <tr height="42">
                  <th width="6%" style="position: relative">
                    <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('vulIdSearch')">漏洞ID</span>
                    <form class="vulTypeSearch" ref="vulIdSearch">
                      <input id="vulIdInput" autocomplete="off" data="clickBtn" type="text" v-model="keyWords.vulId">
                    </form>
                  </th>

                  <th width="10%" style="position: relative">
                    <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('vulTypeSearch')">漏洞类型</span>
                    <form class="vulTypeSearch" ref="vulTypeSearch">
                      <select name="" style="padding: 0 2px 4px 2px;" id="vulNameInput" data="clickBtn" v-model="keyWords.vulName">
                        <option v-bind:value="pro.value" v-for="(pro) in vulNameStateOption">{{pro.text}}</option>
                      </select>
                    </form>
                  </th>

                  <th width="6%" style="position: relative">
                    <span class="screenCondition" data="clickBtn"  @click="showVulTypeSearchForm('vulServeritySearch')">严重性</span>
                    <form class="vulTypeSearch" ref="vulServeritySearch">
                      <select name="" id="vulServerityInput" data="clickBtn" v-model="keyWords.vulVerserity">
                        <option v-bind:value="pro.value" v-for="(pro) in vulVerserityStateOption">{{pro.text}}</option>
                      </select>
                    </form>
                  </th>



                  <th width="25%" style="position: relative">
                    <span>漏洞地址</span>
                  </th>
                  <th width="14%" style="position: relative">
                    <span class="screenCondition" data="clickBtn" @click="showVulTypeSearchForm('projectNameSearch')">项目名称</span>
                    <form class="vulTypeSearch userNoSearch" ref="projectNameSearch">
                      <select name="" style="padding: 0 2px 4px 2px;" id="appNameInput" data="clickBtn" v-model="keyWords.appName">
                        <option v-bind:value="pro.value" v-for="(pro) in appNameStateOption">{{pro.text}}</option>
                      </select>
                    </form>
                  </th>

                  <th width="8%" style="position: relative">
                    <span class="screenCondition" data="clickBtn" @click="showVulTypeSearchForm('userNoSearch')">用户编号</span>
                    <form class="vulTypeSearch userNoSearch" ref="userNoSearch">
                      <input id="userNoInput" autocomplete="off" data="clickBtn" type="text" v-model="keyWords.userNo">
                    </form>
                  </th>

                  <th width="11%" style="position: relative">
                    <span class="screenCondition" data="clickBtn" @click="showVulTypeSearchForm('testTimeSearch')">检测时间</span>
                    <form class="vulTypeSearch userNoSearch testTimeSearch" ref="testTimeSearch">
                      <date-picker v-model="keyWords.testTime" type="datetime" :show-time-panel="showTimeRangePanel" range @close="handleRangeClose" @change="getStartEndTime">
                        <template v-slot:footer>
                          <button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
                            {{ showTimePanel ? "select data" : " select time"}}
                          </button>
                        </template>
                      </date-picker>
                    </form>
                  </th>
                  <th width="6%" style="position: relative">
                    <span class="screenCondition" data="clickBtn" @click="showVulTypeSearchForm('vulStateSearch')">状态</span>
                    <form class="vulTypeSearch userNoSearch" ref="vulStateSearch">
                      <select name="" id="" data="clickBtn" v-model="keyWords.vulState">
                        <option v-bind:value="pro.value" v-for="(pro,index) in stateOption">{{pro.text}}</option>
                      </select>
                      <span style="height: 0;" id="vulStateInput">{{keyWords.vulState}}</span>
                    </form>
                  </th>
                </tr>
            </thead>
            <tbody>
                <router-link tag="tr" v-for="(vul,index) in allVulList" :key="index" :to="{path:'/vulSummary',query:{vulId:vul.vulId}}" title="点击获取漏洞详细信息">
                    <td>
                      <!--<input type="checkbox" name="">-->
                      {{vul.vulId}}
                    </td>

                    <td>
                        <!--<input type="checkbox" name="">-->
                        {{vul.vulName}}
                    </td>

                    <td>
                      <!--<input type="checkbox" name="">-->
                      {{vul.risk}}
                    </td>


                    <td>
                        <p>{{vul.url ? vul.url.substring(0,52):''}}</p>
                    </td>
                    <td>
                        <p>{{vul.appName}}</p>
                    </td>

                    <td>{{vul.userNo}}</td>

                    <td>
                        <p>{{vul.testTime ? vul.testTime.substring(0,19) : ''}}</p>
                    </td>
                    <td>
                        <!--<p v-if="!vul.vulState" style="color:#de2828;" class="fixedStatus">{{vul.vulState | fixedOrUnfixed}}</p>
                        <p v-if="vul.vulState" style="color:green;" class="fixedStatus">{{vul.vulState | fixedOrUnfixed}}</p>-->
                      <p :style="vul.vulState | colorFull">{{vul.vulState | fixedOrUnfixed}}</p>
                    </td>
                </router-link>
            </tbody>
        </table>
    </div>
    <wFlipPage :showItems="showItems" :totalPage="totalPage" :initPage="eventPage" @goPage="goPageFn" :keyWord="keyWord" :keyWords="keyWords"></wFlipPage>
</div>
</template>

<script>
import {getVulList,getVulListCount,getAppNames,getVulNames} from "@/api/data"
import wFlipPage from "@/components/common/FlipPage"
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
/*import $ from 'jquery'*/
export default {
  name: 'ListPage',
  props:{
    keyWord:{
      type:Object
    }
  },
  data () {
    return {
      allVulList:[],
      totalPage:0,
      eventPage:1,
      showItems:5,
      keyWords:{
        vulName:'',
        userNo:'',
        appName:'',
        vulState:'',
        vulId:'',
        vulVerserity:'',
        testStartTime:'',
        testEndTime:'',
        testTime:''
      },
      vulNameStateOption:[//漏洞类型下拉选项
        {text:'所有',value:''},
        {text:'task',value:'task'},
        {text:'tom',value:'tom'},
        {text:'帐号越权',value:'帐号越权'}
      ],
      vulVerserityStateOption:[//严重性下拉选项
        {text:'所有',value:''},
        {text:'低',value:'低'},
        {text:'中',value:'中'},
        {text:'高',value:'高'}
      ],
      appNameStateOption:[],//项目名称下拉选项
      stateOption:[//漏洞状态下拉选项
        {text:'所有',value:''},
        {text:'未修复',value:0},
        {text:'已修复',value:1}
      ],
      flag:true,
      showTimePanel:false,
      showTimeRangePanel:false
    }
  },
  components:{
    wFlipPage,
    DatePicker
  },
  methods:{
    goVulSummaryDetail(vulId,vulName){
      let vulSearchKey = vulId || vulName;
      this.$router.push({
        path:'/vulSummary',
        query:{
          vulId:vulSearchKey
        }
      })
    },
    goPageFn(data){

      if(!data.flipClick){
        this.getAllPageVulListVo(this.keyWords,data.page);
      }
    },
    showVulTypeSearchForm(ele){
      $(event.target).parent().siblings().find('.vulTypeSearch').css({display:'none'})
      this.$refs[ele].style.display = this.$refs[ele].style.display == 'block' ? 'none' : 'block';

    },
    async getAllPageVulListVo(keyWords,page){
      let {vulName,userNo,appName,vulState,vulId,vulVerserity,testStartTime,testEndTime} = keyWords;
      let {data} = await getVulList(userNo,vulName,appName,vulState,vulId,vulVerserity,testStartTime,testEndTime,page||this.eventPage);
      this.allVulList = data;
    },
    async getVulPageCountDataVo(keyWords){
      let {vulName,userNo,appName,vulState,vulId,vulVerserity,testStartTime,testEndTime} = keyWords;
      let vulCount = (await getVulListCount(userNo,vulName,appName,vulState,vulId,vulVerserity,testStartTime,testEndTime)).data;
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

      let {data} = await getAppNames();
      let appNameStateOption = data.map(function (item) {
        return {
          text:item.envName,
          value:item.envName
        }
      })

      this.appNameStateOption = [{text:'所有',value:''}].concat(appNameStateOption);

    },
    getSearchWords(fn){
      fn();
      this.getAllPageVulListVo(this.keyWords,1);
      this.getVulPageCountDataVo(this.keyWords)
    },
    transMonth(mStr){
      switch (mStr) {
        case "Jan":
          return '01';
          break;

        case "Feb":
          return '02';
          break;

        case "Mar":
          return '03';
          break;

        case "Apr":
          return '04';
          break;

        case "May":
          return '05';
          break;

        case "Jun":
          return '06';
          break;

        case "Jul":
          mStart = '07';
          break;

        case "Aug":
          return '08';
          break;

        case "Sep":
          return '09';
          break;

        case "Oct":
          return '10';
          break;

        case "Nov":
          return '11';
          break;

        case "Dec":
          return '12';
          break;
        default:
          break;
      }
    },
    getStartEndTime(date){
      if(date[0]){
        let [weekStart,monthStart,dayStart,yearStart,timeStart] = date[0].toString().split(' ');
        let [weekEnd,monthEnd,dayEnd,yearEnd,timeEnd] = date[1].toString().split(' ');
        let mStart = this.transMonth(monthStart);
        let mEnd = this.transMonth(monthEnd);
        this.keyWords.testStartTime = yearStart +'-' + mStart +'-' + dayStart + ' ' + timeStart;
        this.keyWords.testEndTime = yearEnd +'-' + mEnd +'-' + dayEnd + ' ' + timeEnd;
      }else{
        this.keyWords.testStartTime = '';
        this.keyWords.testEndTime = '';
      }
    },
    toggleTimePanel(){
      this.showTimePanel = !this.showTimePanel;
    },
    toggleTimeRangePanel(){
      this.showTimeRangePanel = !this.showTimeRangePanel
    },
    handleOpenChange(){
      this.showTimePanel = false;
    },
    handleRangeClose(){
      this.showTimeRangePanel = false;
    }
  },
  computed:{
    /*totalPage(){
      return Math.ceil(this.allVulList.length / 5);
    }*/
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
  created(){
    this.getAllPageVulListVo(this.keyWords,1);
    this.getVulPageCountDataVo(this.keyWords)
    this.getAllAppNames();
  },
  mounted(){
    let vm = this;
    $('body').click(function (e) {
      if(!e.target.getAttribute('data')){
        let isSendHttp = e.target.className.split(" ")[0].substring(0,2) === 'mx' || e.target.tagName === 'SPAN' || e.target.parentNode.className.split(" ")[0] === 'cell' || e.target.tagName === 'TH';
        if(isSendHttp){
          $('.testTimeSearch').css({display:'block'});
        }else{
          $('.vulTypeSearch').css({display:'none'});
        }
      };

    })
  },
  watch:{
    keyWords:{
      handler:function (keyWords) {
        let vm = this;
        vm.flag = true;
        $('.pageCon a').toArray().forEach((item)=>{
          item.setAttribute('data','flipClick')
        })
        $('body').unbind('click')
        $('body').click(function (e) {

          if(e.target.tagName === 'TD' || e.target.tagName === 'P'){
            vm.keyWords.vulName = '';
            vm.keyWords.userNo = '';
            vm.keyWords.appName = '';
            vm.keyWords.vulState = '';

            vm.keyWords.vulId = '';
            vm.keyWords.vulVerserity = '';
            vm.keyWords.testStartTime = '';
            vm.keyWords.testEndTime = '';
            vm.keyWords.testTime = '';
            return;
          }
          if(!e.target.getAttribute('data') && e.target.tagName !== 'A' && e.target.parentNode.className.split(" ")[0] !== 'cell'){
            $('.pageCon a').toArray().forEach((item)=>{
              item.removeAttribute('data')
            })
            let isSendHttp = e.target.className.split(" ")[0].substring(0,2) === 'mx' || e.target.tagName === 'SPAN' || e.target.parentNode.className.split(" ")[0] === 'cell' || e.target.tagName === 'TH';
            if(isSendHttp){
              $('.testTimeSearch').css({display:'block'});
            }else{
              $('.vulTypeSearch').css({display:'none'});
            }
            if(vm.flag && ! isSendHttp){
              vm.getSearchWords(function () {
                vm.flag = false;
                vm.eventPage = new Date().getTime();
              });
            }
          };
        })
      },
      deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .listPage,.listTable{
    overflow: visible;
  }
  .listTable table tr:hover {
    cursor: pointer;
  }
</style>
