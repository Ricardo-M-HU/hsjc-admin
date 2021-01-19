<template>
  <div class="main">
    <div class="content">
      <div style="width: 100%;justify-content: center;display: flex;">
        <div style="width: 90%;display: flex;align-items: center;justify-content: center;">
          <span>签收人：</span>
          <el-input v-model="singfor" placeholder="请输签收人" style="width: 200px;"></el-input>
          <span style="margin-left: 50px;">送检机构：{{cureentOrg}}</span>
          <el-dropdown>
            <el-button type="primary" plain style="margin-left: 20px;">
              切换送检机构<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in orgs" @click.native="handleClick(item)">{{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="width: 10%;">
          <el-dropdown split-button type="primary" @command="handleCommand">
            设置
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">标本采集</el-dropdown-item>
              <el-dropdown-item command="2">基础设置</el-dropdown-item>
              <el-dropdown-item command="3">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-row style="margin-top: 10px;">
        <el-col :span="8">
          <div>
            <el-form label-position="right" label-width="130px" size="small ">
              <el-form-item label="姓名：">
                <el-input v-model="residentInfo.name" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：">
                <el-input v-model="residentInfo.idCard" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="手机号码：">
                <el-input v-model="residentInfo.phone" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-input v-model="residentInfo.gender" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form label-position="right" label-width="130px" size="small ">
              <el-form-item label="民族：">
                <el-input v-model="residentInfo.nation" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="所属社区：">
                <el-input v-model="residentInfo.communityInfo.name" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="年龄：">
                <el-input v-model="residentInfo.age" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form label-position="right" label-width="130px" size="small ">
              <el-form-item label="户籍所在地：">
                <el-input v-model="residentInfo.certAddress" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="出生日期：">
                <el-input v-model="residentInfo.bornDay" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="residentInfo.remark" :rows="2" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div style="width: 100%;display: flex;justify-content: center;">
        <el-input ref="inputdata" v-model="barCode" placeholder="请扫描条形码" style="width: 400px;" size="small"
                  @keyup.enter.native="read"></el-input>
        <el-button type="primary" style="margin-left: 40px;" size="small" @click="submit">确认送检</el-button>
      </div>
    </div>
    <div class="footer">
      <div style="width: 70%;height: 100%;background: #fff;
      display: flex;justify-content: center;flex-flow: column;">
        <div style="margin: 10px;height: 8%; display: flex;align-items: center;">
          <span>送检列表</span>
          <el-input style="width: 200px;margin-left: 100px;" size="small" v-model="input"
                    placeholder="请输入姓名"></el-input>
          <el-input style="width: 200px;margin-left: 20px;" size="small" v-model="input"
                    placeholder="请输入身份证号码"></el-input>
          <el-button icon="el-icon-search" circle style="margin-left: 20px;" size="small" @click="getList"></el-button>
        </div>
        <el-table
          stripe
          :data="tableData"
          max-height="550"
          style="width: 96%;height: 92%;" size="small">
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
      </div>
      <div style="width: 28%;height: 50%;background: #D2F0FF;display: flex;flex-flow: column;justify-content: center;
          align-items: center;border:2px dashed #1890FF;">
        <div style="width: 100%;display: flex;align-items: center;
        justify-content: center;margin-top: 10px;">
          <span style="font-size: 22px;font-weight: 600;color: #5555FF;">合浦县人民医院核酸检测送检</span>
        </div>
        <div style="width: 100%;display: flex;flex-flow: column;
          justify-content: center;align-items: center;margin-top: 20px;">
          <span style="font-size: 20px;font-weight: 500;">送检人数：<span style="color: #5555FF;">{{tableData.length}}</span></span>
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
  import { insOrg, getInfoByBarCode, sj, getInspections } from '@/api/business'

  export default {
    name: 'collection',
    data() {
      return {
        input: '',
        radio1: '读卡',
        radio2: '手工',
        value: false,
        orgs: [],
        cureentOrg: '',
        cureentOrgId: '',//inspectOrgId
        formInline: {},
        residentInfo: {
          communityInfo: {}
        },
        barCode: '',
        singfor: '',
        tableData: []
      }
    },
    created() {
      this.getOrgs()
      this.getList()
    },
    mounted() {
      this.$refs.inputdata.focus()
    },
    methods: {
      getList() {
        let param = {
          inspectOrgId: this.cureentOrgId,
         /* residentInfo: {
            name: this.residentInfo.name,
            idCard: this.residentInfo.idCard
          }*/
        }
        getInspections(param).then(res => {
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
      submit() {
        //采集点
        //送检人
        //条形码
        if (this.singfor == '') {
          this.$message({
            message: '请输入签收人',
            type: 'error'
          })
          return
        }
        let param = {
          signedBy: this.singfor,
          inspectOrgId: this.cureentOrgId,
          barCode: this.barCode
        }
        sj(param).then(res => {
          if (res.code == 200) {
            this.getList()
            this.$refs.inputdata.focus()
            this.barCode = ''
            this.$message({
              message: '送检成功',
              type: 'success'
            })
          }
        })

      },
      read() {
        let barCode = this.barCode
        getInfoByBarCode(barCode).then(res => {
          if (res.code == 200) {
            this.residentInfo = res.data.residentInfo
          }
        })
      },
      getInfo() {
        let barCode = this.barCode
        getInfoByBarCode(barCode).then(res => {
          if (res.code == 200) {
            this.residentInfo = res.data.residentInfo
          }
        })
      },
      getOrgs() {
        let param = {}
        insOrg(param).then(res => {
          if (res.code == 200) {
            this.orgs = res.rows
            this.cureentOrg = res.rows[0].name
            this.cureentOrgId = res.rows[0].id
          }
        })
      },
      handleClick(item) {
        this.cureentOrg = item.name
        this.cureentOrgId = item.id
      },
      handleCommand(command) {
        if (command == '1') {
          this.$router.push({ path: 'collection' })
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
    height: 100px;
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
