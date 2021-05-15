<template>
  <div class="circleGraphCon" style="position:relative;" ref="circleGraphCon">
    <!--<wTips v-show="isShow" :msg="msg"></wTips>-->
    <slot name="disTip"></slot>
    <slot name="zlDis"></slot>
    <slot name="zlVulStatus"></slot>
    <h2>{{title}}</h2>
    <div class="circleGrahp" id="circleGraph" ref="circleGraph" v-show="!isShow">

    </div>
  </div>
</template>

<script>
  import wTips from "@/components/common/Tips"
  import echarts from  'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/radar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  export default {
    name: 'CircleGraph',
    props:{
      msg:{
        type:String,
      },
      isShow:{
        type:Boolean
      },
      appId1:{
        type:String
      },
      vulDisData:{
        type:Array
      },
      vulDisData1:{
        type:Array
      },
      vulDisData2:{
        type:Array
      },
      title:{
        type:String
      },
      mark:{
        type:String
      }
    },
    data () {
      return {
        //title:"漏洞类型分布TOP10",
        circle1:[],
        option:{
          tooltip:{
            trigger:'item',
            //formatter:"{a}<br/>{b}:{c}({d}%)",
            formatter:"{b}:{c}({d}%)",
            textStyle:{
              fontSize:12
            }
          },
          markArea:{
            data:{
              0:{
                y:110
              }
            }
          },
          color:['#ff0000','#f15a24','#ffbe15','#c0ccda','#3cd0be','#039b95','#56a3f3','#ffa35d','#0071b9','#ff6a39','#ffb88c','#3cd0be'],
          series:[
            {
              name:'',
              type:'pie',
              radius:['50%','70%'],
              avoidLabelOverlap:true,
              minAngle:10,
              label:{
                normal:{
                  show:true,
                  position:'outside',
                  formatter(v){
                    let text = v.name;
                    if(text.length <= 6){
                      return text;
                    }else if(text.length > 6 && text.length <12){
                      return text = `${text.slice(0,6)}\n${text.slice(6)}`;
                    }else  if(text.length >12 && text.length <=18){
                      return text = `${text.slice(0,6)}\n${text.slice(6,12)}\n${text.slice(12)}`
                    }
                  }
                },
                emphasis:{
                  show:true,
                  textStyle:{
                    fontSize:'14',
                    fontWeight:'bold'
                  }
                },

              },
              labelLine:{
                show:true,
                normal:{
                  show:true,
                  smooth:false,
                  lineStyle:{
                  }
                },



              },
              data:[]
            },
          ]
        }
      }
    },
    components:{
      wTips
    },
    methods:{
      initData(newVal){
        //console.log(newVal);
        if(this.mark=='vulLevel'){
          /*this.option.color = ['#ff0000','#f15a24','#ffbe15','#c0ccda','#3cd0be','#039b95','#56a3f3','#ffa35d','#0071b9','#ff6a39','#ffb88c','#3cd0be'];*/
          this.option.series[0].data = newVal;
        }else if(this.mark=='top10'){
          if(newVal.length == 1 && newVal[0].value == 0){
            this.option.color = ['#cccccc'];
          }else{
            /*this.option.color = ['#ff0000','#f15a24','#ffbe15','#c0ccda','#3cd0be','#039b95','#56a3f3','#ffa35d','#0071b9','#ff6a39','#ffb88c','#3cd0be'];*/
          }
          this.option.series[0].data = newVal;
        }else{
          this.option.series[0].data = newVal;
        }
      }
    },
    created(){
    },
    mounted(){

      setTimeout(()=>{
        if(document.getElementById('statis')){
          let statisW = document.getElementById('statis').offsetWidth;
          let scanW = parseInt((statisW-45)/2)/statisW*100;
          this.$refs.circleGraphCon.style.width = scanW +"%";
        }

      },100)
    },
    watch:{
      vulDisData:{
        handler(n,o) {

          this.initData(n);
          //if(this.$refs.circleGraph){
            const charObj = echarts.init(this.$refs.circleGraph);
            charObj.clear();
            charObj.setOption(this.option)
          //}

        },
        deep:true
      },
      vulDisData1:{
        handler(n,o){
          this.initData(n);
          if(this.$refs.circleGraph){
            const charObj = echarts.init(this.$refs.circleGraph);
            //charObj.clear();
            charObj.setOption(this.option)
          }
        },
        deep: true
      },
      vulDisData2:{
        handler(n,o){
          this.initData(n);
          if(this.$refs.circleGraph){
            const charObj = echarts.init(this.$refs.circleGraph);
            //charObj.clear();
            charObj.setOption(this.option)
          }
        },
        deep:true
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #circleGraph{
    width: 396px;
    position: absolute;
    left: 0;
    right:0;
    margin: auto;
  }
</style>
