<template>
  <div class="hello">
    <Format></Format>
    <UseDirective :cssText="cssText" :title="title">
    </UseDirective>
    <ChaCao>
      <div class="main">这个案例主要用来学习 vue 中的插槽---匿名插槽</div>
      <template v-slot:footer>
        <div class="footer">底部---具名插槽</div>
      </template>
      <template v-slot:showChildData="slotProps">
        <div class="showData">作用域插槽使用--展示子组件的数据name：<font color="red">{{slotProps.userName}}</font></div>
      </template>

    </ChaCao>

    <p ref="count">{{count}}</p>
    <button @click="add" ref='add'>aad</button>
    <Drag></Drag>
  </div>
</template>

<script>
import Format from "../components/format/FormatTime"
import UseDirective from "../components/directive/UseDirective"
import ChaCao from "../components/slot/ChaCao"

export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '自定义指令使用123',
      cssText:"position:fixed;top:200px; left:200px; font-size:20px;color:red; font-weight:bold;",
      count:0
    }
  },
  components:{
    Format,
    UseDirective,
    ChaCao,
    Drag:()=>import('../components/drag/Drag')
  },
  methods: {
    add(){
      this.count +=1;
      
      this.$nextTick(function () {
        console.log(this.$refs.count.innerText);
      });
    }
  },
  mounted() {
    console.log(this.$slots);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
