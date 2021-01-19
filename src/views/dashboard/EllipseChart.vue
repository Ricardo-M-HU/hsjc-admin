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
        default: '330px'
      }
    },
    name: 'ellipse',
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
        var districtList = ['椒江', '黄岩', '路桥', '温岭', '玉环', '临海', '天台', '仙居', '三门']
        var lN = [12000, 20000, 15000, 8000, 7000, 11000, 10300, 5000, 8000],
          bN = [6000, 8008, 12000, 20000, 15000, 8000, 7000, 11000, 1300]

        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {//自动提示工具
              var params0Value = params[0].value + '%'
              var params1Value = params[0].value + '%'
              var params2Value = params[0].value + '%'
              if (params[0].value <= 0) {
                params0Value = params[0].value
              }
              if (params[1].value <= 0) {
                params0Value = params[1].value
              }
              if (params[2].value <= 0) {
                params0Value = params[2].value
              }
              return params[0].axisValue + '<br />' + params[0].marker + '初始量：' + params0Value + '<br />' + params[1].marker + '已确认量：' + params1Value + '<br />' + params[2].marker + '草稿/待确认：' + params2Value
            }
          },
          legend: {
            selectedMode: false,//取消图例上的点击事件
            data: ['初始量', '已确认量', '草稿/待确认']
          },
          grid: {
            left: '5px',
            right: '4%',
            bottom: '45px',
            containLabel: true
          },
          xAxis: [{
            axisLabel: {
              show: true,
              textStyle: {
                color: "#a9a9a9", //更改坐标轴文字颜色
                fontSize: 10 //更改坐标轴文字大小
              },
              rotate: 40,
              showMinLabel: true,//显示最小值
              showMaxLabel: true,//显示最大值
            },
            type: 'category',
            data: ['社区一', '社区二', '社区三', '社区四', '社区五', '社区六', '社区七', '社区一', '社区二', '社区三', '社区四', '社区五', '社区六', '社区七', '社区一', '社区二', '社区三', '社区四', '社区五', '社区六', '社区七', '社区一', '社区二', '社区三', '社区四', '社区五', '社区六', '社区七']
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          }],
          series: [
            {
              name: '初始量',
              type: 'bar',
              stack: '饱和度',
              data: [10, 13, 11, 13, 30, 23, 21, 12, 13, 10, 13, 20, 20, 12, 13, 10, 13, 20, 20, 10, 12, 13, 10, 13, 20, 20, 10]
            },
            {
              name: '已确认量',
              type: 'bar',
              stack: '饱和度',
              data: [20, 18, 19, 23, 29, 33, 31, 22, 12, 11, 24, 20, 33, 31, 12, 13, 10, 13, 20, 20, 10, 12, 13, 10, 13, 20, 20, 10]
            }
          ]
        }

        this.chart.setOption(option)
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style scoped>

</style>
