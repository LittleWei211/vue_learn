<template>
    <div class="addSearch">
        <!-- <div class="addProject">
            <span>新增项目</span>
        </div> -->
        <div class="searchProject">
            <form>
                <input type="" name="" v-model="searchWord" placeholder="请输入搜索关键字" @change="getSearchAppListData">
                <a href="" @click.prevent=""></a>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'addSearch',
  data () {
    return {
      initCurrPage:1,
      searchWord:'',
    }
  },
  methods:{
    getSearchAppListData(){
      this.$emit('sendSearchWord',this.searchWord,this.initCurrPage)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
