<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="采集地点" prop="shortCode">
        <el-input
          v-model="queryParams.shortCode"
          placeholder="请选择采集地点"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采集时间" prop="addr">
        <el-input
          v-model="queryParams.addr"
          placeholder="请选择采集地点"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="采集编号" align="center" prop="id" width="55"/>
      <el-table-column label="登记编码" align="center" prop="code"  width="55"/>
      <el-table-column label="居民姓名" align="center" prop="residentInfo.name"/>
      <el-table-column label="采集人" align="center" prop="sysUser.nickName"/>
      <el-table-column label="条形码" align="center" prop="barCode" width="180"/>
      <el-table-column label="采集点" align="center" prop="collectAddrInfo.addr"/>
      <el-table-column label="检验结果" align="center" prop="muterResult"/>
      <el-table-column label="检验结果日期" align="center" prop="resultDate" width="180"/>
      <el-table-column label="采集时间" align="center" prop="collectTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.collectTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改岗位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="社区名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入社区名称"/>
        </el-form-item>
        <el-form-item label="社区简码" prop="shortCode">
          <el-input v-model="form.shortCode" placeholder="请输入社区简码"/>
        </el-form-item>
        <el-form-item label="社区序号" prop="sorting">
          <el-input-number v-model="form.sorting" controls-position="right" :min="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listResidentRegist,exportResidentRegist } from '@/api/basic/residentRegist'

  export default {
    name: 'residentRegist',
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 岗位表格数据
        postList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          postName: [
            { required: true, message: '岗位名称不能为空', trigger: 'blur' }
          ],
          postCode: [
            { required: true, message: '岗位编码不能为空', trigger: 'blur' }
          ],
          postSort: [
            { required: true, message: '岗位顺序不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList()
      this.getDicts('sys_normal_disable').then(response => {
        this.statusOptions = response.data
      })
    },
    methods: {
      /** 查询岗位列表 */
      getList() {
        this.loading = true
        listResidentRegist(this.queryParams).then(response => {
          this.postList = response.rows
          this.total = response.total
          this.loading = false
        })
      },
      // 岗位状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          postId: undefined,
          postCode: undefined,
          postName: undefined,
          postSort: 0,
          status: '0',
          remark: undefined
        }
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.postId)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '添加岗位'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const postId = row.postId || this.ids
        getPost(postId).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改岗位'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.postId != undefined) {
              updatePost(this.form).then(response => {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              })
            } else {
              addPost(this.form).then(response => {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              })
            }
          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const postIds = row.postId || this.ids
        this.$confirm('是否确认删除岗位编号为"' + postIds + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delPost(postIds)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出所有岗位数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return exportResidentRegist(queryParams)
        }).then(response => {
          this.download(response.msg)
        })
      }
    }
  }
</script>
