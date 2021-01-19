<template>
  <div :class="className" :style="{height:height,width:width}">
  </div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    name: 'SampleChart',
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        let colorArray = [
          {
            top: '#ffa800', //黄
            bottom: 'rgba(11,42,84,.3)'
          }, {
            top: '#1ace4a', //绿
            bottom: 'rgba(11,42,84, 0.3)'
          },
          {
            top: '#4bf3ff', //蓝
            bottom: 'rgba(11,42,84,.3)'
          }, {
            top: '#4f9aff', //深蓝
            bottom: 'rgba(11,42,84,.3)'
          },
          {
            top: '#b250ff', //粉
            bottom: 'rgba(11,42,84,.3)'
          }
        ]
        let option = {
          backgroundColor: '#181C41',
          tooltip: {
            show: true,
            formatter: '{b}:{c}'
          },
          grid: {
            left: '5%',
            top: '12%',
            right: '1%',
            bottom: '8%',
            containLabel: true
          },

          xAxis: {
            type: 'value',
            show: false,
            position: 'top',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: [{
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: false,
              length: 5

            },
            'splitLine': { //网格线
              'show': false
            },
            inverse: 'true', //排序
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            data: ['已采集', '已送检', '已报告']
          }

          ],
          series: [{
            name: '能耗值',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}',
                textStyle: {
                  color: 'white' //color of value
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: function(params) {
                  let num = colorArray.length
                  return {
                    type: 'linear',
                    colorStops: [{
                      offset: 0,
                      color: colorArray[params.dataIndex % num].bottom
                    }, {
                      offset: 1,
                      color: colorArray[params.dataIndex % num].top
                    }, {
                      offset: 0,
                      color: colorArray[params.dataIndex % num].bottom
                    }, {
                      offset: 1,
                      color: colorArray[params.dataIndex % num].top
                    }, {
                      offset: 0,
                      color: colorArray[params.dataIndex % num].bottom
                    }, {
                      offset: 1,
                      color: colorArray[params.dataIndex % num].top
                    }, {
                      offset: 0,
                      color: colorArray[params.dataIndex % num].bottom
                    }, {
                      offset: 1,
                      color: colorArray[params.dataIndex % num].top
                    }, {
                      offset: 0,
                      color: colorArray[params.dataIndex % num].bottom
                    }, {
                      offset: 1,
                      color: colorArray[params.dataIndex % num].top
                    }, {
                      offset: 0,
                      color: colorArray[params.dataIndex % num].bottom
                    }, {
                      offset: 1,
                      color: colorArray[params.dataIndex % num].top
                    }]
                    //globalCoord: false
                  }
                },
                barBorderRadius: 70,
                borderWidth: 0,
                borderColor: '#333'
              }
            },
            barGap: '0%',
            barCategoryGap: '50%',
            data: [132, 89, 60]
          }
          ]
        }
        this.chart.setOption(option)
      }
    }
  }
</script>

<style scoped>

</style>
