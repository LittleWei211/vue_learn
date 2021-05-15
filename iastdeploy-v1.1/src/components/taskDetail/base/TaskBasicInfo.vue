<template>
    <div class="taskBasicInfo">
      <div class="basicInfo">
        <div class="biTitle"><h2>基础信息</h2></div>
        <div class="biContent">
          <table width="100%">
            <tr>
              <td>
                <p>任务ID：<span>{{taskBasicInfo.taskId ? taskBasicInfo.taskId : ''}}</span></p>
              </td>
              <td>
                <p>任务名：<span>{{taskBasicInfo.taskName}}</span></p>
              </td>
              <td>
                <p>涉及应用：<span>{{taskBasicInfo.relativeApp}}</span></p>
              </td>
              <td>
                <p>请求数：<span>{{taskBasicInfo.requestNum}}</span></p>
              </td>
            </tr>

            <tr>
              <td>
                <p>漏洞数：<span>{{taskBasicInfo.vulNum}}</span></p>
              </td>
              <td>
                <p>发起人：<span>{{taskBasicInfo.taskOwer}}</span></p>
              </td>
              <td>
                <p>客户端IP：<span>{{taskBasicInfo.clientIp}}</span></p>
              </td>
              <td>
                <p>记录开始时间：<span>{{taskBasicInfo.recordStartTime ? taskBasicInfo.recordStartTime.substring(0,19):''}}</span></p>
              </td>
            </tr>

            <tr>
              <td>
                <p>记录结束时间：<span>{{taskBasicInfo.recordEndTime ? taskBasicInfo.recordEndTime.substring(0,19):''}}</span></p>
              </td>
              <td>
                <p>检测开始时间：<span>{{taskBasicInfo.testStartTime ? taskBasicInfo.testStartTime.substring(0,19):''}}</span></p>
              </td>
              <td>
                <p>检测结束时间：<span>{{taskBasicInfo.testEndTime ? taskBasicInfo.testEndTime.substring(0,19):''}}</span></p>
              </td>
              <td>
                <p>任务状态：<span>{{taskBasicInfo.taskStatus | taskState}}</span></p>
              </td>
            </tr>
          </table>
        </div>
        <!--<div class="biContent" style="height: auto;">
          <div class="projectName">
            <p>任务ID：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>任务名：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>涉及应用：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>请求数：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>漏洞数：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>发起人：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>客户端IP：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>记录开始时间：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>记录结束时间：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>检测开始时间：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>检测结束时间：<span>111</span></p>
          </div>

          <div class="projectName">
            <p>任务状态：<span>111</span></p>
          </div>

        </div>-->
      </div>
    </div>
</template>

<script>

  export default {
    name: "TaskBasicInfo",
    props:{
      taskBasicInfo:{
        type:Object
      }
    },
    data(){
      return {
      }
    },
    filters:{
      taskState:function (value) {
        //return 1;
        switch (parseInt(value)) {
          case 1:
            return "录入中"
            break;
          case 2:
            return "录入结束"
            break;
          case 3:
            return "测试中"
            break;
          case 4:
            return "测试完成"
            break;
          case 5:
            return "未包含有效测试报文"
            break;
          default:
            break
        }
      }
    }
  }
</script>

<style scoped>

</style>
