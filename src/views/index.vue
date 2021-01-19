<template>
  <div class="dashboard-editor-container">
    <div class="head">
      <span
        style="color: #03C2EC;font-size: 26px;font-weight: 600;margin-left: 45px;margin-bottom:25px;">合浦县人民医院核酸检测平台</span>
    </div>
    <div class="main">
      <div class="left">
        <div style="width: 98%;height: 300px; background: #181C41;">
          <div style="color: #03C2EC;font-size: 16px;font-weight: 600;height: 30px;
        display: flex;align-items: center;justify-content: center;">
            <span>总登记人数：1300</span>
          </div>
          <sex-chart></sex-chart>
        </div>

        <div style="width: 98%;height: 230px; background: #181C41;margin-top: 5px;">
          <div style="color: #03C2EC;font-size: 16px;font-weight: 600;height: 30px;
        display: flex;align-items: center;justify-content: center;">
            <span>样本送检总体情况</span>
          </div>
          <sample-chart></sample-chart>
        </div>

        <div style="width: 98%;height: 255px; background: #181C41;margin-top: 5px;
            display: flex;flex-flow: column;align-items: center;justify-content: center;">
          <div style="margin-top: 15px;"><span class="word">2021年</span></div>
          <div style="margin-top: 15px;"><span class="word">合浦县核酸检测统计</span></div>
          <div style="margin-top: 15px;"><span class="word">已采集：
            <span style="font-size: 30px;font-weight: 600;color: #F3A038;">32134 </span>
            <span style="margin-left: 5px;">人</span></span></div>
          <div style="margin-top: 15px;"><span class="word">已出报告：
            <span style="font-size: 30px;font-weight: 600;color: #8AED58;">12311 </span>
            <span style="margin-left: 5px;">人</span></span></div>
        </div>
      </div>

      <div class="mid">
        <div style="width: 98%;height: 380px; background: #181C41;">
          <div style="color: #03C2EC;font-size: 20px;font-weight: 600;height: 50px;
        display: flex;align-items: center;justify-content: center;">
            <span>社区登记人数总览</span>
          </div>
          <ellipse-chart/>
        </div>

        <div style="width: 98%;height: 405px; background:#181C41;margin-top: 5px;">
          <div style="color: #03C2EC;font-size: 20px;font-weight: 600;height: 50px;
        display: flex;align-items: center;justify-content: center;">
            <span>采集点登记人数总览</span>
          </div>
          <collect-chart></collect-chart>
        </div>
      </div>
      <div class="right">
        <div style="display: flex;flex-flow: row;width: 100%;">
          <div style="width: 50%;height: 200px; background: #181C41;">
            <div style="color: #03C2EC;font-size: 16px;font-weight: 600;height: 30px;
        display: flex;align-items: center;justify-content: center;">
              <span style="font-size: 16px;">阳性总人数：<span style="font-size: 22px;color: #E70606;margin-right: 5px;">1</span>人</span>
            </div>
            <count-chart></count-chart>
          </div>
          <div style="width: 50%;height: 200px; background: #181C41;">
            <div style="color: #03C2EC;font-size: 16px;font-weight: 600;height: 30px;
        display: flex;align-items: center;justify-content: center;">
              <span style="font-size: 16px;">今日阳性：<span style="font-size: 22px;color: #E70606;margin-right: 5px;">0</span>人</span>
            </div>
            <count-chart></count-chart>
          </div>
        </div>
        <div style="width: 100%;height: 585px; background:#181C41;margin-top: 5px;">
          <div style="color: #03C2EC;font-size: 20px;font-weight: 600;height: 50px;
        display: flex;align-items: center;justify-content: center;">
            <span>总体登记各年龄阶阳性占比</span>
          </div>
          <community-chart></community-chart>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import PieChart from './dashboard/PieChart'
  import PanelGroup from './dashboard/PanelGroup'
  import LineChart from './dashboard/LineChart'
  import RaddarChart from './dashboard/RaddarChart'
  import BarChart from './dashboard/BarChart'
  import EllipseChart from './dashboard/EllipseChart'
  import SexChart from './dashboard/SexChart'
  import CountChart from './dashboard/CountChart'
  import SampleChart from './dashboard/SampleChart'
  import CollectChart from './dashboard/CollectChart'
  import CommunityChart from './dashboard/CommunityChart'

  export default {
    name: 'index',
    components: {
      PanelGroup,
      LineChart,
      RaddarChart,
      PieChart,
      BarChart,
      EllipseChart,
      SexChart,
      CountChart,
      SampleChart,
      CollectChart,
      CommunityChart
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .head {
    width: 100%;
    background: url("../static/images/office_efficiency_header_bg.png") no-repeat 0px 0px;
    background-size: cover;
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    width: 100%;
    display: flex;
    flex-flow: row;
    margin-top: 5px;
  }

  .mid {
    width: 50%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .left {
    width: 25%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .right {
    width: 25%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }


  .dashboard-editor-container {
    width: 100%;
    background-color: #22284A;
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  .word {
    color: white;
    font-size: 22px;
    font-weight: 600;
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
