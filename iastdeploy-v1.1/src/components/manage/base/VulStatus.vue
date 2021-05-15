<template>
  <div class="vulStatusCon" style="position: relative;" ref="vulStatusCon">
    <!--<wTips v-show="isShow" :msg="msg"></wTips>-->
    <slot name="statusTip"></slot>
    <slot name="zlVulStatus"></slot>
    <h2>{{title}}</h2>
    <div class="vulStatus" id="vulStatus" ref="vulStatus" v-show="!isShow">
    </div>
  </div>
</template>

<script>
  import wTips from "@/components/common/Tips"
  import echarts from  'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/radar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  export default {
    name: 'VulStatus',
    props:{
      msg:{
        type:String
      },
      isShow:{
        type:Boolean
      },
      vulStatus:{
        type:Array
      }
    },
    data () {
      return {
        title:"漏洞状态",
        circle:"",
        dim:["product","漏洞数","已修复","新发现","已确认","误报","忽略"],
        option:{
          legend:{
            show:true,
            x:'left',
            icon:'circle',
            textStyle:{
              fontSize:12,
              //color:'red'
            }
          },
          tooltip:{
            show:true,
            textStyle:{
              fontSize:12
            }
          },
          dataset:{
            //dimensions:["product","漏洞数","已修复","未修复"],
            dimensions:["product","漏洞数","已修复","新发现","已确认","误报","忽略"],
            source:[]
          },
          xAxis:{
            type:"category",
            axisLine:{
              show:false
            },
            splitLine:{
              show:false
            },
            axisTick:{
              show:false
            }
          },
          yAxis:{
            //type:"",
            axisLine:{
              show:false
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#eee'
              }
            },
            axisTick:{
              show:false
            },
            max:function (value) {
              if(value.max <=10){
                return 10;
              }else if(value.max <=100){
                return 100;
              }else if(value.max <=1000){
                return 1000;
              }else if(value.max <=10000){
                return 10000;
              }else if(value.max <=100000){
                return 100000;
              }else if(value.max <=1000000){
                return 1000000;
              }else if(value.max <=10000000){
                return 10000000;
              }
            }
          },
          minInterval:1,
          series:[
            {
              type:"bar",
              barWidth:10,
              //barCategoryGap:"10%",
              //barMinHeight:20,
              itemStyle:{
                normal:{
                  barBorderRadius:[10,10,0,0],
                  color:function (params) {
                    var colorList = [
                      "#ed1f1f",
                      "#ed1f1f",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              emphasis: {
                itemStyle:{
                  color:'#4dd03c'
                }
              }
            },
            {
              type:"bar",
              barWidth:10,
              //barCategoryGap:"10%",
              //barMinHeight:20,
              itemStyle:{
                normal:{
                  barBorderRadius:[10,10,0,0],
                  color:function (params) {
                    var colorList = [
                      "#34d846",
                      "#34d846",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              emphasis: {
                itemStyle:{
                  color:'#4dd03c'
                }
              }
            },
            {
              type:"bar",
              barWidth:10,
              //barMinHeight:0,
              //barCategoryGap:"10%",
              itemStyle:{
                normal:{
                  barBorderRadius:[10,10,0,0],
                  color:function (params) {
                    var colorList = [
                      "#d6cf4a",
                      "#d6cf4a",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              emphasis: {
                itemStyle:{
                  color:'#4dd03c'
                }
              }
            },
            {
              type:"bar",
              barWidth:10,
              //barMinHeight:0,
              //barCategoryGap:"10%",
              itemStyle:{
                normal:{
                  barBorderRadius:[10,10,0,0],
                  color:function (params) {
                    var colorList = [
                      "#d6cece",
                      "#d6cece",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              emphasis: {
                itemStyle:{
                  color:'#4dd03c'
                }
              }
            },
            {
              type:"bar",
              barWidth:10,
              //barMinHeight:0,
              //barCategoryGap:"10%",
              itemStyle:{
                normal:{
                  barBorderRadius:[10,10,0,0],
                  color:function (params) {
                    var colorList = [
                      "#d8670d",
                      "#d8670d",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              emphasis: {
                itemStyle:{
                  color:'#4dd03c'
                }
              }
            },
            {
              type:"bar",
              barWidth:10,
              //barMinHeight:0,
              //barCategoryGap:"10%",
              itemStyle:{
                normal:{
                  barBorderRadius:[10,10,0,0],
                  color:function (params) {
                    var colorList = [
                      "#2006d8",
                      "#2006d8",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              emphasis: {
                itemStyle:{
                  color:'#4dd03c'
                }
              }
            }
          ]
        }
      }
    },
    components:{
      wTips
    },
    methods:{
      initData(){
        this.option.dataset.source = this.vulStatus.map(function (item,index) {
          return{
            product:item.risk,
            '漏洞数':item.vulNum,
            '已修复':item.recoveredNums,
            '新发现':item.newFoundNums,
            '已确认':item.confirmNums,
            '误报':item.misReportNums,
            '忽略':item.ignoreNums
          }
        })
        //this.circle = this.vulStatus
      },
      setWidth(){
        setTimeout(()=>{
          if(document.getElementById('statis')){
            let statisW = document.getElementById('statis').offsetWidth;
            let scanW = parseInt((statisW-22))/statisW*100;
            this.$refs.vulStatusCon.style.width = scanW +"%";
            this.$refs.vulStatus.style.width = parseInt((statisW-22)) +"px";
          }
        },100)
      }
    },
    created(){
      //this.option.dataset.source = this.vulStatus;
      //console.log(this.vulStatus);

    },
    mounted(){
      /*const charObj = echarts.init(this.$refs.vulStatus);
      charObj.setOption(this.option);*/
      this.setWidth();
      window.addEventListener('resize',()=>{
        this.setWidth();
      })

    },
    watch:{
      vulStatus:function () {
        this.initData();
        if(this.$refs.vulStatus){
          const charObj = echarts.init(this.$refs.vulStatus);
          charObj.clear();
          charObj.setOption(this.option);
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
