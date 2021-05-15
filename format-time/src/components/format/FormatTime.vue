<template>
    <div>
      <input type="text" v-focus>
      <p>{{pubTime}}</p>
    </div>
</template>

<script>
  import Moment from 'moment'
  export default {
      name: "FormatTime",
      data() {
          return {
            pubTime:Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            msg:"lxw",
            sex:'男'
          }
      },
      directives:{
        format:{
          bind(el,binding){
            el.innerHTML = Moment(binding.value).format("YYYY-MM-DD HH:mm:ss");
          }
        }
      },
      computed: {
        
      },
      components:{},
      methods: {
        clock(){
          setInterval(()=>{
            this.pubTime = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          },1000)
        }
      },
      created() {
        this.clock();
      },
      mounted() {
        
      }
  }
</script>

<style scoped>

</style>
