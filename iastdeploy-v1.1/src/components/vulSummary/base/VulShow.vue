<template>
    <div class="vulShow">
      <div class="VulSummaryTitle">
        <h2>漏洞演示</h2>
      </div>
      <form action="">
        <div class="testEditReq">
          <div class="testEditTab">
            <ul>
              <li :class="{testEditTabOn:testEditActive==0}" @click="tabTestEdit(0)">原始请求</li>
              <li :class="{testEditTabOn:testEditActive==1}" @click="tabTestEdit(1)">原始响应</li>
            </ul>
          </div>
          <div class="editItem" v-show="testEditActive==0">
            <!--<textarea name="" id=""></textarea>-->
            <div class="testItemCon" >
              <div>
                <p>{{(vulSummary.busUrlMethod || '\t').split('\t')[0]}}</p>
                <p style="height: 8px;"></p>
                <p>{{(vulSummary.busUrlMethod || '\t').split('\t')[1]}}</p>
                <p style="height: 8px;"></p>
                <p v-for="(pro,index) in JSON.parse(vulSummary.busRequHeader)">
                  {{index}}{{index ? ":":""}}{{pro}}
                </p>
                <p style="height: 8px;"></p>
                <p>{{vulSummary.busRequBody}}</p>
              </div>
            </div>
          </div>
          <div class="testItem" v-show="testEditActive==1">
            <div class="testItemCon">
              <div>
                <!--<p v-for="(pro,index) in JSON.parse(vulSummary.busRespHeader)">
                  {{index}}{{index ? ":":""}}{{pro}}
                </p>-->
                <!--<p style="height: 8px;"></p>-->
                <pre>{{vulSummary.busRespBody ? vulSummary.busRespBody.replace(/^(\r\n)*|(\r\n)*$/g,'') : ""}}</pre>
              </div>
            </div>
          </div>

        </div>
        <!--<button class="showResBtn">展示响应</button>-->
        <div class="resWebview">
          <div class="testEditTab">
            <ul>
              <li :class="{resWebViewTabOn:resWebViewActive==0}" @click="tabResWebView(0)">测试请求</li>
              <li :class="{resWebViewTabOn:resWebViewActive==1}" @click="tabResWebView(1)">测试响应</li>
            </ul>
          </div>
          <div class="webviewItem" v-show="resWebViewActive==0">
            <div class="testItemCon" >
              <div>
                <p>{{(vulSummary.testUrlMethod || '\t').split('\t')[0]}}</p>
                <p style="height: 8px;"></p>
                <p>{{(vulSummary.testUrlMethod || '\t').split('\t')[1]}}</p>
                <p style="height: 8px;"></p>
                <p v-for="(pro,index) in JSON.parse(vulSummary.testRequHeader)">{{index}}{{index ? ":":""}}{{pro}}</p>
                <p style="height: 8px;"></p>
                <p>{{vulSummary.testRequBody}}</p>
              </div>
            </div>
          </div>
          <div class="resItem" v-show="resWebViewActive==1">
            <div class="testItemCon" >
              <div>
                <p v-for="(pro,index) in ((vulSummary.testRespHeader||'').split(/,(?![^[]*?])/))">
                  {{pro.replace(/\[|\]/g,'')}}
                </p>
                <p style="height: 8px;"></p>
                <!--<p>{{vulSummary.testRespBody}}</p>-->
                <pre>{{vulSummary.testRespBody ? vulSummary.testRespBody.replace(/^(\r\n)*|(\r\n)*$/g,'') : ""}}</pre>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
</template>

<script>
    export default {
      name: "VulShow",
      props:{
        vulSummary:{
          type:Object
        }
      },
      data(){
        return{
          testEditActive:0,
          resWebViewActive:0
        }
      },
      mounted(){

      },
      methods:{
        tabTestEdit(index){
          this.testEditActive = index;
          this.resWebViewActive = index;
        },
        tabResWebView(index){
          this.testEditActive = index;
          this.resWebViewActive = index;
        }
      },
      created(){

      },
      activated(){
        this.testEditActive = this.resWebViewActive = 0;
      }
    }
</script>

<style scoped>

</style>
