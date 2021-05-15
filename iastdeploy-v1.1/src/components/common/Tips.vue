<template>
    <div class="noData" ref="tip">{{this.msg}}</div>
</template>

<script>
  export default {
    name: "Tips",
    props:{
      msg:{
        type:String,
      }
    },
    mounted(){
      /*setTimeout(()=>{
        this.$refs.tip.style.color = "#999";
      },300)*/
    },
  }
</script>

<style scoped>
  /*.noData{
    animation-name: show;
    animation-duration: 1s;
    -moz-animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: .5s;
    opacity: 0;
  }
  @-webkit-keyframes show {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }*/
</style>
