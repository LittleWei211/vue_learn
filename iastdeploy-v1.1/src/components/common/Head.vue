<template>
  <div class="head" ref="head" id="head" style="position: fixed; top: 0; z-index: 999">
    <div class="headInner">
			<div class="logo"><!--<img src="static/images/logo.jpg" width="160" alt="">-->ICBC IAST</div>
			<div class="login">
				<!--<a href="">登陆</a><span>|</span><a href="">注册</a>-->
			</div>
			<div class="menu">
				<ul>
					<li>
						<router-link to="/" exact>总&nbsp;&nbsp;&nbsp;览</router-link>
					</li>
					<li>
						<router-link to="/manage" exact>应&nbsp;&nbsp;&nbsp;用</router-link>
					</li>
					<li>
            <router-link to="/taskList" exact>任&nbsp;&nbsp;&nbsp;务</router-link>
          </li>
          <li>
            <router-link to="/requestList">请&nbsp;&nbsp;&nbsp;求</router-link>
          </li>
          <li>
            <router-link to="/vulList" exact>漏&nbsp;&nbsp;&nbsp;洞</router-link>
          </li>
          <li class="helpBtn" style="position: relative; overflow: visible">
            <!--<router-link to="/help" exact>帮&nbsp;&nbsp;&nbsp;助</router-link>-->
            <a href="javascript:void(0);" style="cursor: default">帮&nbsp;&nbsp;&nbsp;助</a>
            <ul class="helpMenu">
              <li><router-link to="/help/instruction">使用说明</router-link></li>
              <li><router-link to="/help/clientDownLoad">客户端下载</router-link></li>
              <li><router-link to="/help/update">更新日志</router-link></li>
            </ul>
          </li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Head',
  data () {
    return {
      /*imageSrc:{
        logo:'static/images/logo.jpg'
      }*/
    }
  },
  mounted(){

    $(".helpBtn").mouseenter(function () {
      $(".helpMenu").slideDown(100)
    }).mouseleave(function () {
      $(".helpMenu").slideUp(100)
    })
    if(/help/.test(this.$route.fullPath)){
      $(".helpBtn>a").addClass("router-link-active")
    };
  },
  watch:{
    $route(to , from){
      if(!/help/.test(to.path)){
        $(".helpBtn>a").removeClass("router-link-active")
        $(".helpMenu").css({display:'none'})
      }else{
        $(".helpBtn>a").addClass("router-link-active")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .helpMenu li{
    float: left;
  }
</style>
