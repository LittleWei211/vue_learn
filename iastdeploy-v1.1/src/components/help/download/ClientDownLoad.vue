<template>
  <div class="download">
    <div class="instruTitle">
      <h2>客户端下载</h2>
    </div>
    <div class="instrucText">
      <ul>
        <li><a href="/download/icbc-iast.zip" title="点击下载客户端" >安全测试客户端</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ClientDownLoad",
    props:{
      data:{
        type:Object
      }
    },
    methods:{
      download(src,name){
        let xhr = new XMLHttpRequest();
        xhr.open('GET',src,true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
          let url = window.URL.createObjectURL(xhr.response);
          let a = document.createElement('a');
          a.href = url;
          a.download = name;
          a.click();
        }
        xhr.send();
      }
    },
    mounted(){
      setTimeout(()=>{
        console.log(this.data);
      },1000)
    }
  }
</script>

<style scoped>

</style>
