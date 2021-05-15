<template>
    <div class="vulShow">
      <div class="VulSummaryTitle">
        <h2>请求响应</h2>
      </div>
      <form action="">
        <div class="testEditReq">
          <div class="testEditTab">
            <ul>
              <!--<li :class="{testEditTabOn:testEditActive==0}" @click="tabTestEdit(0)">测试请求</li>-->
              <li @click="tabTestEdit(1)">原始请求</li>
            </ul>
          </div>
          <!--<div class="testItem" v-show="testEditActive==0">
            <div class="testItemCon">
              <div>
                <p>{{vulSummary.testUrlMethod}}</p>
                <br/>
                <p v-for="(pro,index) in JSON.parse(vulSummary.testRequHeader)">{{index}}{{index ? ":":""}}{{pro}}</p>
                <br/>
                <p>{{vulSummary.testRequBody}}</p>
              </div>
            </div>
          </div>-->
          <div class="editItem" v-show="testEditActive==1">
              <!--<textarea name="" id=""></textarea>-->
              <div class="testItemCon" >
                <div>
                  <p v-for="(value,key) in JSON.parse(requestDetail.header)">{{key}}{{key!=''?":":""}}{{value}}</p>
                  <br/>
                  <p>
                    {{requestDetail.requestBody}}
                  </p>
                </div>
              </div>
          </div>
        </div>
        <!--<button class="showResBtn">展示响应</button>-->
        <div class="resWebview">
          <div class="testEditTab">
            <ul>
              <!--<li :class="{resWebViewTabOn:resWebViewActive==0}" @click="tabResWebView(0)">测试响应</li>-->
              <li @click="tabResWebView(1)">原始响应</li>
            </ul>
          </div>
          <!--<div class="resItem" v-show="resWebViewActive==0">
            <div class="testItemCon" >
              <div>
                &lt;!&ndash;<p>{{requestDetail.testUrlMethod}}</p>&ndash;&gt;
                &lt;!&ndash;<p v-for="(pro,index) in JSON.parse(requestDetail.testRespHeader)">{{index}}{{index ? ":":""}}{{pro}}</p>&ndash;&gt;
                <p v-for="(pro,index) in (requestDetail.testRespHeader.split(/,(?![^[]*?])/))">
                  {{pro.replace(/\[|\]/g,'')}}
                </p>
                <br>
                <p>{{requestDetail.testRespBody}}</p>
              </div>
            </div>
          </div>-->
          <div class="webviewItem" v-show="resWebViewActive==1">
            <div class="testItemCon" >
              <div>
                <!--<p>{{requestDetail.busUrlMethod}}</p>-->
                <p v-for="(value,key) in JSON.parse(requestDetail.responseHeader)">
                  {{key}}{{key!=''?":":""}}{{value}}
                </p>
                <br>
                <pre style="word-break: break-word; white-space: pre-wrap; font-size:14px; color:#000; font-family: '微软雅黑';">
                  {{requestDetail.responseBody}}
                </pre>
                <!--<pre style="word-break: break-word; white-space: pre-wrap; font-size:14px; color:#000; font-family: '微软雅黑';">
                  {{requestDetail.responseHeader}}
                </pre>-->
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
</template>

<script>
    export default {
      name: "RequestShow",
      props:{
        requestDetail:{
          type:Object
        }
      },
      data(){
        return{
          testEditActive:1,
          resWebViewActive:1
        }
      },
      methods:{
        tabTestEdit(index){
          this.testEditActive = index;
        },
        tabResWebView(index){
          this.resWebViewActive = index;
        }
      },
      mounted(){
        setTimeout(()=>{
          console.log(this.requestDetail.responseHeader.replace(/\\\\"/g,''));
        },1000)
      }
    }
</script>

<style scoped>

</style>
