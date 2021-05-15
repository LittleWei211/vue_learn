<template>
    <div class="instruction">
      <div class="instruTitle">
        <h2>使用说明</h2>
      </div>
      <div class="instrucText" style="height: 540px;">
        <!--<ul>
          <li>说明1</li>
          <li>说明2</li>
          <li>说明3</li>
          <li>说明4</li>
          <li>说明5</li>
        </ul>-->
        <iframe style="overflow:hidden;" width="100%" height="100%" src="../../../../static/file/instructions.pdf" frameborder="0"></iframe>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Instruction",
    props:{
      data:{
        type:Object
      }
    },
    mounted(){
      console.log(this.$route)
    }
  }
</script>

<style scoped>

</style>
