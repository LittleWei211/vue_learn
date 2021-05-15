<template>
  <div class="appInfo">
    <ul>
      <li>
        <router-link  to="/manage">
          <div class="icon1"></div>
          <div class="appNum">
            <h2>{{appTotalInfo.appNum}}</h2><span>应用数</span>
          </div>
        </router-link>
      </li>

      <li>
        <router-link to="/taskList">
            <div class="icon1 icon2"></div>
            <div class="appNum">
              <h2>{{appTotalInfo.taskNum}}</h2><span>任务数</span>
            </div>
        </router-link>
      </li>

      <li>
        <router-link to="/requestList">
            <div class="icon1 icon3"></div>
            <div class="appNum">
              <h2>{{appTotalInfo.requestNum}}</h2><span>请求数</span>
            </div>
        </router-link>
      </li>

      <li>
        <router-link to="/vulList">
          <div class="icon1 icon4"></div>
          <div class="appNum appNumVul">
            <h2>{{appTotalInfo.vulNum}}</h2><span>漏洞数</span>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppInfo',
  props:{
    appTotalInfo:{
      type:Object
    }
  },
  data () {
    return {
      totalInfo:{
        appNum:30,
        taskNum:43,
        rquestNum:140890,
        vulNum:948
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
