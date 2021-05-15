<template>
    <div class="vulTopFiveCon" style="position: relative">
      <wTips v-show="isShow" :msg="msg"></wTips>
      <h2>{{title}}</h2>
      <div class="vulTopFive" id="vulTopFive">

      </div>
    </div>
</template>

<script>
    import {getTopFiveApp} from '../../../api/data'
    import wTips from "@/components/common/Tips"
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/radar'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    export default {
        name: "VulTopFive",
        /*props:{
          isShow:{
            type:Boolean
          }
        },*/
        data(){
          return {
            isShow:false,
            msg:'',
            title:"应用漏洞Top5",
            option:{
              legend:{
                show:false
              },
              tooltip:{
                show:true,
                textStyle:{
                  fontSize:12,
                },
                backgroundColor:'#999',

              },
              label:{

              },
              dataset:{
                //dimensions:[]
                /*source:[
                  {product:'靶场2dvwa','value':40},
                  {product:'境外API六月版','value':283.1},
                  {product:'靶场1','value':86.4},
                  {product:'API模拟器','value':72.4},
                  {product:'工银i服务','value':60.9},
                ],*/
                source:[]
              },
              xAxis:{
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
                type:'category',
                axisLine:{
                  show:false
                },
                splitLine:{
                  show:false
                },
                axisTick:{
                  show:false
                },
                axisLabel:{
                  formatter:function (val) {
                    val = val.substring(0,12);
                    let strs = val.split('');
                    let str = '',num = 6;
                    for(let i = 0,s; s = strs[i++];){
                      str += s;
                      if(val.length>6){
                        num = Math.ceil(val.length/2);
                      }

                      if(!(i%num) && val.length > num) str += '\n';
                    }
                    if(str[str.length-1] !== "\n"){
                      return str;
                    }else{
                      return str.substring(0,str.length-1);
                    }

                  }
                },

              },
              grid:{
                x:80,//设置图片x轴偏移量
                y:10,
              },
              series:[
                {
                  type:'bar',
                  barWidth:'8px',
                  itemStyle:{
                    normal:{
                      barBorderRadius:[10,10,10,10],
                      color: 'rgba(0,0,0,0.05)'
                    }
                  },
                  barGap:'-100%',
                  barCategoryGap:'50%',
                  data:[],
                  /*tooltip:{
                    show:true,
                    formatter:function(param){
                      return "<div>"+param.name+":"+param.data.realValue+"</div>";
                    }
                  }*/
                },
                {
                  type:'bar',
                  barWidth:'8px',
                  itemStyle:{
                    normal:{
                      barBorderRadius:[10,10,10,10],
                      colon:function (params) {
                        var colorList = [
                          "#ed1f1f"
                        ]
                        return colorList[params.dataIndex]
                      }
                    }
                  },
                },
              ]
            }
          }
        },
        components:{
          wTips
        },
        methods:{
          getTopFiveAppData(){//获取总览应用top5
            getTopFiveApp().then(res =>{
              let {data} = res;
              //console.log(data);
              if(data.length > 0){
                //有数据
                this.option.dataset.source = data;
                let max = this.option.dataset.source.sort(function(item1,item2){
                  return item1.value - item2.value
                },this)[this.option.dataset.source.length-1].value;
                if(max < 10){
                  max = 10
                }else if(max < 100){
                  max = 100
                }else if(max < 1000){
                  max = 1000
                }else if(max < 10000){
                  max = 10000
                }else if(max < 100000){
                  max = 100000
                }else if(max < 100000){
                  max = 100000
                }else if(max < 1000000){
                  max = 1000000
                }else if(max < 10000000){
                  max = 10000000
                }
                this.option.series[0].data = this.option.dataset.source.map(function (item) {
                  return max/*||100*/
                })
                this.$nextTick(function () {
                  const chartObj = echarts.init(document.getElementById('vulTopFive'));
                  chartObj.setOption(this.option)
                })
              }else{
                //无数据
                this.msg = "暂无漏洞topfive...";
                this.isShow = true;
              }

            }).catch(err =>{
              this.isShow = true;
              console.log("topfive网络请求异常");
              //网络请求异常
              if(err.response){
                this.msg = "接口请求异常，无法获取数据topfive...";
              }else if(err.request){
                this.msg = "接口请求异常，无法获取数据topfive...";
              }else{
              }
            })

          }
        },
        created(){
          this.getTopFiveAppData();
        },
        mounted(){
          /*this.$nextTick(function () {
            const chartObj = echarts.init(document.getElementById('vulTopFive'));
            chartObj.setOption(this.option)
          })*/
        }
    }
</script>

<style scoped>

</style>
