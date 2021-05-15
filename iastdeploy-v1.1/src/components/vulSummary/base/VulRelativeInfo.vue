<template>
  <div class="vulRalatievInfo">
    <div class="infoItem">
      <h2 class="attackDetail">漏洞信息</h2>
      <div class="infoItemText">
        <p>{{vulSummary.remark}}</p>
      </div>
    </div>

    <div class="infoItem">
      <h2 class="vulDes">漏洞描述</h2>
      <div class="infoItemText">
        <!--<p>{{vulSummary.vulKnoInfo.describle || ""}}</p>-->
        <p v-html="vulSummary.vulKnoInfo.describle">{{vulSummary.vulKnoInfo.describle || ""}}</p>
      </div>
    </div>

    <!--<div class="infoItem">
      <h2 class="vulDanger">漏洞危害</h2>
      <div class="infoItemText">
        <p>存在漏洞位置是post方法的0.data.initilation.cretrare.name参数payload作为负载，在返回页面中的details标签中匹配到details ontoggle=alert(1),确定漏洞存在<br>存在漏洞位置是post方法的0.data.initilation.cretrare.name参数payload作为负载，在返回页面中的details标签中匹配到details ontoggle=alert(1),确定漏洞存在</p>
      </div>
    </div>-->

    <div class="infoItem">
      <h2 class="vulFixed">修复建议</h2>
      <div class="infoItemText">
        <p v-html="vulSummary.vulKnoInfo.suggestion">{{vulSummary.vulKnoInfo.suggestion || ""}}</p>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "VulRalatievInfo",
      props:{
        vulSummary:{
          type:Object
        }
      },
      data(){
        return {}
      },
      created(){
      },
      mounted(){
        /*setTimeout(()=>{
          console.log(this.vulSummary.vulKnoInfo);
        },1000)*/
      }
    }
</script>

<style scoped>

</style>
