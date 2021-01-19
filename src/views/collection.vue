<template>
  <div class="main">

    <div class="head">
      <div style="float: left;width: 30%">
        <!--  <span style="margin-left: 40px;">采集方式:</span>
          <el-radio-group v-model="radio1" style="margin-left: 10px;">
            <el-radio-button label="读卡"></el-radio-button>
            <el-radio-button label="手工"></el-radio-button>
            <el-radio-button label="混合采集"></el-radio-button>
          </el-radio-group>-->
      </div>
      <div style="float: right;width: 30%">
        <span>采集点：{{cureentCollection}}</span>
        <el-dropdown>
          <el-button type="primary" plain style="margin-left: 20px;">
            切换采集点<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in collections" @click.native="handleClick1(item)">{{item.addr}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="float: right;width: 30%">
        <span>社区：{{currentCommunity}}</span>
        <el-dropdown>
          <el-button type="primary" plain style="margin-left: 20px;">
            切换社区<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in communities" @click.native="handleClick2(item)">{{item.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div style="width: 10%;">
        <el-dropdown split-button type="primary" @command="handleCommand">
          设置
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">标本送检</el-dropdown-item>
            <el-dropdown-item command="2">基础设置</el-dropdown-item>
            <el-dropdown-item command="3">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
    <div class="content">
      <el-row>
        <el-col :span="8">
          <div>
            <el-form label-position="right" label-width="130px" size="small ">
              <el-form-item label="姓名：">
                <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：">
                <el-input v-model="formInline.idCard" placeholder="请输入身份证号码"></el-input>
              </el-form-item>
              <el-form-item label="手机号码：">
                <el-input v-model="formInline.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-select v-model="formInline.gender" placeholder="请选择性别" class="el-input el-input--small">
                  <el-option
                    v-for="item in genderOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期：">
                <el-date-picker
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  class="el-input el-input--small"
                  v-model="formInline.bornDay"
                  type="date"
                  default-value="1980-01-01"
                  placeholder="请选择出生日期">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form label-position="right" label-width="130px" size="small ">
              <el-form-item label="所属社区：">
                <el-select v-model="formInline.communityId" placeholder="请选择所属社区" class="el-input el-input--small">
                  <el-option
                    v-for="item in communities"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄：">
                <el-input v-model="formInline.age" placeholder="请输入年龄"></el-input>
              </el-form-item>
              <el-form-item label="民族：">
                <el-input v-model="formInline.nation" placeholder="请输入民族"></el-input>
              </el-form-item>
              <el-form-item label="户籍所在地：">
                <el-input v-model="formInline.certAddress" placeholder="请输入户籍所在地"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="formInline.remark" :rows="2" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="margin-top: 60px;">
            <el-form label-position="right" label-width="130px" size="small ">
              <el-form-item label="条形码：" v-show="showBar">
                <div id="print" style="width: 250px;height: 120px;display: flex;flex-flow: column;background: white;">
                  <img id="barcode" style="width: 250px;height: 80px;"/>
                  <span
                    style="width: 250px;text-align: center;font-size: 12px;line-height: 16px;">新冠病毒核酸检测 {{gettime}}<br/> {{formInline.name}}，{{formInline.gender}}，{{formInline.age}}岁</span>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div style="width: 100%;justify-content: center;display: flex;">
        <el-button type="primary" size="small " icon="el-icon-bank-card">读取身份证</el-button>
        <el-button type="success" size="small " @click="add" icon="el-icon-check">确认信息</el-button>
        <el-button type="primary" size="small " @click="print" icon="el-icon-printer" v-print="'#print'">打印条形码
        </el-button>
      </div>
    </div>
    <div class="footer">
      <div style="width: 70%;height: 100%;background: #fff;
      display: flex;justify-content: center;flex-flow: column;">
        <div style="margin: 10px;height: 8%; display: flex;align-items: center;">
          <span>采集列表</span>
          <el-input style="width: 200px;margin-left: 100px;" size="small" v-model="form.name"
                    placeholder="请输入姓名" clearable></el-input>
          <el-input style="width: 200px;margin-left: 20px;" size="small" v-model="form.idCard"
                    placeholder="请输入身份证号码" clearable></el-input>
          <el-button icon="el-icon-search" circle style="margin-left: 20px;" size="small" @click="getCs"></el-button>
        </div>
        <el-table
          stripe
          :data="tableData"
          height="550"
          style="width: 96%;" size="small">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="gender"
            align="center"
            label="性别"
            width="80">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="communityInfo.name"
            label="社区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="idCard"
            align="center"
            label="身份证号码">
          </el-table-column>
        </el-table>
        <div class="block" style="display: flex;justify-content: center;
        margin-top: 10px;">
        </div>
      </div>
      <div style="width: 28%;height: 50%;background: #D2F0FF;display: flex;flex-flow: column;justify-content: center;
          align-items: center;border:2px dashed #1890FF;">
        <div style="width: 100%;display: flex;align-items: center;
        justify-content: center;margin-top: 10px;">
          <span style="font-size: 22px;font-weight: 600;color: #5555FF;">合浦县人民医院核酸检测采集</span>
        </div>
        <div style="width: 100%;display: flex;flex-flow: column;
          justify-content: center;align-items: center;margin-top: 20px;">
          <span style="font-size: 20px;font-weight: 500;">采集人数：<span style="color: #5555FF;">{{tableData.length}}</span></span>
          <span style="margin-top: 20px;font-size: 20px;font-weight: 500;">男性：<span
            style="color: #5555FF;">{{tableData.filter(item=>item.gender == '男').length}}</span></span>
          <span style="margin-top: 20px;font-size: 20px;font-weight: 500;">女性：<span
            style="color: #5555FF;">{{tableData.filter(item=>item.gender == '女').length}}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { collectionList, communityList, addCollection, getCollectionList } from '@/api/business'
  import jsbarcode from 'jsbarcode'
  import Print from 'vue-print-nb'
  import Vue from 'vue'

  Vue.use(Print)

  export default {
    name: 'collection',
    data() {
      return {
        radio1: '读卡',
        radio2: '手工',
        radio3: '混合采集',
        value: false,
        formInline: {},
        form: {
          name: '',
          idCard: '',
          pageSize: 10,
          pageNum: 1
        },
        collections: [],//采集点集合
        cureentCollection: '',//当前采集点
        collectAddrId: '',
        communities: [],//社区集合
        currentCommunity: '',//当前社区
        cureentCommunityId: '',
        // 日期范围
        dateRange: [],
        genderOption: [
          {
            value: '男',
            label: '男'
          },
          {
            value: '女',
            label: '女'
          }
        ],
        tableData: [],
        showBar: false,//展示条形码
        gettime: ''
      }
    },
    created() {
      this.getCollectionList()
      this.getCommunityList()
      this.getCs()
    },
    methods: {
      getCs() {
        let param = {
          collectAddrId: this.collectAddrId,
         /* residentInfo: {
            name: this.form.name,
            idCard: this.form.idCard
          }*/
        }
        getCollectionList(param).then(res => {
          if (res.code == 200) {
            this.tableData = []
            if (res.rows.length > 0) {
              res.rows.forEach(item => {
                this.tableData.push(item.residentInfo)
              })
            } else {
              this.tableData = []
            }
          }
        })
      },
      reset() {
        this.formInline = {}
        this.formInline.communityId = this.cureentCommunityId
      },
      print() {
        this.reset()
        this.showBar = false
        this.$message({
          message: '条形码打印成功',
          type: 'success'
        })
      },
      add() {
        if (this.formInline.name == undefined || this.formInline.name == '') {
          this.$message({
            message: '姓名不能为空',
            type: 'error'
          })
          return
        }
        if (this.formInline.idCard == undefined || this.formInline.idCard == '') {
          this.$message({
            message: '身份证号码不能为空',
            type: 'error'
          })
          return
        }
        let barCode = Date.parse(new Date()) + this.formInline.idCard.substring(this.formInline.idCard.length - 4)
        let param = {
          collectAddrId: this.collectAddrId,
          residentInfo: this.formInline,
          barCode: barCode
        }
        addCollection(param).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '采集成功',
              type: 'success'
            })
            this.getCs()
            this.showBar = true
            jsbarcode(
              '#barcode',
              barCode,
              {
                displayValue: true // 是否在条形码下方显示文字
              }
            )
            let _this = this
            let yy = new Date().getFullYear()
            let mm = new Date().getMonth() + 1
            let dd = new Date().getDate()
            let hh = new Date().getHours()
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
            _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
          }
        })
      },

      getCollectionList() {
        let param = {}
        collectionList(param).then(res => {
          this.collections = res.rows
          if (this.collections.length > 0) {
            this.cureentCollection = res.rows[0].addr
            this.collectAddrId = res.rows[0].id
          }
        })
      },
      getCommunityList() {
        let param = {}
        communityList(param).then(res => {
          this.communities = res.rows
          if (this.communities.length > 0) {
            this.currentCommunity = res.rows[0].name
            this.cureentCommunityId = res.rows[0].id
            this.formInline.communityId = this.cureentCommunityId
          }
        })
      },
      handleClick1(item) {
        this.cureentCollection = item.addr
        this.collectAddrId = item.id
      },
      handleClick2(item) {
        this.currentCommunity = item.name
        this.cureentCommunityId = item.id
        this.communityId = this.cureentCommunityId
      },
      handleCommand(command) {
        if (command == '1') {
          this.$router.push({ path: 'inspection' })
        } else if (command == '2') {
          this.$router.push({ path: '/' })
        } else if (command == '3') {
          this.$confirm('确定注销并退出系统吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('LogOut').then(() => {
              location.href = '/index';
            })
          })
        }
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    background-color: #F1F4FB;
    overflow-y: scroll;
  }

  .head {
    width: 100%;
    height: 70px;
    background: white;
    display: flex;
    align-items: center;
  }

  .content {
    width: 100%;
    display: flex;
    flex-flow: column;
    margin-top: 20px;
    padding: 0 20px;
  }

  .footer {
    width: 100%;
    height: 550px;
    background: white;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 20px;
  }

  .form {
    width: 98%;
    background: white;
    display: flex;
    padding: 10px 20px;
    justify-content: space-around;
  }

  /deep/ .el-form-item--mini.el-form-item {
    margin-bottom: 0px;
    width: 150px;

  }
</style>
