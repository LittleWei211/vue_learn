<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, a, img, ol, ul, li, form	 { margin:0; padding:0; border:0; 
list-style:none; font-family:"微软雅黑";}
table, tr,td,dl, dt, dd{ margin:0; padding:0; list-style:none; font-family:"微软雅黑";}
div, span, h1, h2, h3, h4, h5, h6, p, a, img, dl, dt, dd, ol, ul, li, form { overflow:hidden; outline: none;}
input,td,th { margin:0; padding:0; }
h1,h2,h3,h4,h5,h6 {font-size:12px; font-weight:normal;}  
a { text-decoration:none; color:#484849;}
.clear{ clear:both;}
.boxcenter{margin: 0 auto;}
table { border-collapse:collapse;border-spacing: 0; }/*重置表格*/
th{ text-align: left}
body{
  min-width: 1340px;
  /*overflow: hidden;*/
}
#app {
  min-width: 1340px;
}
.router-link-active{
    background-color: #c7000b;
}
</style>
