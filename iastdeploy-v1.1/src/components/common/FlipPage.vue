
<template>
    <div class="flipPage" v-if="totalPage > 0">
      <div class="pageCon">
        <a href="" @click.prevent="go(currentPage-1)" >上一页</a>
        <a href="" v-for="page in pageList" :class="{active:currentPage == page ? true : false}" @click.prevent="go(page)">{{page}}</a>
        <a href="" @click.prevent="go(currentPage+1)">下一页</a>
      </div>
      <div class="jumpCon">
        <span>共<em>{{totalPage}}</em>页，跳至</span>
        <input min="1" type="number" :max="totalPage" v-model="jumpPage" @keyup.enter="go(jumpPage)">
        <span>页</span>
        <a href="" @click.prevent="go(jumpPage)">确定</a>
      </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
      name: "FlipPage",
      props:{
        totalPage:{
          type:Number,
          default:5,
          require:true
        },
        showItems:{
          type:Number,
          default:2
        },
        showPrev:{
          type:Boolean,
          default:true
        },
        showNext:{
          type:Boolean,
          default:true
        },
        showJump:{
          type:Boolean,
          default:true
        },
        initPage:{
          type:Number
        },
        /*userNo:{
          type:String
        },*/
        taskListSearchWords:{
          type:Object
        },
        taskId:{
          type:String
        },
        keyWord:{
          type:Object
        },
        keyWords:{
          type:Object
        },
        userNoTest:{
          type:String
        }
      },
      data(){
        return{
          currentPage:1,
          jumpPage:1
        }
      },
      methods:{
        go(page){
          $('.vulTypeSearch').css({display:'none'});
          if(event.target.getAttribute('data')){
            return;
          }
          if(page < 1){
            page = 1
          }
          if(page > this.totalPage){
            page = this.totalPage;
          }
          if(page === this.currentPage){
            return
          }
          this.currentPage = parseInt(page,10);
          this.$emit('goPage',{
            page:this.currentPage,
            //flipClick:event.target.getAttribute('data')
          })

        }
      },
      computed:{
        pageList(){
          let getPages = (start,end) =>{
            if(start <= 1 || start > end || start >= this.totalPage){
              start = 1;
            }
            if(end >= this.totalPage || end < start || end <= 1){
              end = this.totalPage;
            }
            let arr = [];
            for(let i = start; i <= end; i ++){
              arr.push(i)
            }
            return arr
          }
          let counts = this.showItems;
          if(this.totalPage <= counts){
            return getPages(1,this.totalPage)
          }else{
            if(this.currentPage <= Math.ceil(counts/2)){
              return getPages(1,counts)
            }else if(this.currentPage >= this.totalPage - Math.floor(counts/2)){
              return getPages(this.totalPage - counts + 1 ,this.totalPage)

            }else{
              let half = Math.ceil(counts/2) - 1;
              let end  = this.currentPage + half;
              if(counts % 2 === 0){
                end ++;
              }
              return getPages(this.currentPage - half,end)
            }
          }
        }
      },
      created(){
        this.currentPage = this.initPage;
      },
      watch:{
        currentPage(newVal){
          this.jumpPage = newVal;
        },
        initPage(newVal){
          if(newVal.toString().length > 10){
            this.currentPage = 1;
          }else if(this.currentPage !== newVal && newVal.toString().length < 10){
            this.currentPage = newVal;
          }
        },
        /*userNo(newVal){
          this.currentPage = 1;
        },*/
        /*taskListSearchWords:{
          handler:function () {
            this.currentPage = 1;
          },
          deep:true
        },*/
        taskId(){
          console.log('taskId');
          this.currentPage = 1;
        },
        keyWord:{
          handler:function () {
            this.currentPage = 1;
          },
          deep:true
        }/*,
        keyWords:{
          handler:function () {
            this.currentPage = 1;
          },
          deep:true
        }*/
      }
    }
</script>

<style scoped>
  .flipPage{
    text-align: center;
    padding: 10px 0;
  }
  .pageCon,.jumpCon{
    display: inline-block;
    font-size: 14px;
  }
  .pageCon a{
    float: left;
    padding: 3px 10px;
    border:1px solid #ccc;
    font-size: 14px;
    border-radius: 2px;
    margin:0 2px;
  }
  .pageCon a.active{
    border-color:#0dd5e4;
    background-color: #0dd5e4;
    color: #fff;
  }
  .pageCon strong{
    float: left;
  }
  .jumpCon em{
    font-style: normal;
    font-size: 14px;
  }
  .jumpCon input{
    height: 24px;
    border: 1px solid #ccc;
    border-radius: 2px;
    -ms-text-align-last: right;
    text-align:center;
    width: 40px;
    outline: none;
  }
</style>
