<template>
   <a-card>
  <div class="table-wrapper">
     <a-table
          :columns="columns"
          :data-source="tableData"
          :rowKey="record => record.employeeId"
          :pagination="pagination"
          @change="handleTableChange">
            <div slot="action" slot-scope="text, record">
              <a @click="rowResetBtn(record)">下线</a>
              <a-divider type="vertical"/>
              <router-link :to="{path: `/workContact/index?employeeId=${record.employeeId}`}">
                <a-button type="link">客户列表</a-button>
              </router-link>
            </div>
                <div slot="status" slot-scope="text, record">
                    <span v-if="record.status === 0">
                      <a-tag color="red">离线</a-tag>
                    </span>
                    <span v-if="record.status === 1">
                        <a-tag color="green">在线</a-tag>
                    </span>
              </div>
        </a-table>
  </div>
   </a-card>
</template>

<script>
  import { showEmployee } from '@/api/department';
  import store from '@/store';
  export default{
    data(){
      return {
        columns: [
          {
            title: '员工姓名',
            dataIndex: 'employeeName',
            align: 'left',
          },
          {
            title: '手机号码',
            dataIndex: 'phone',
            align: 'center'
          },
          {
            title: '企业微信状态',
            dataIndex: 'status',
            align: 'center',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '添加时间',
            dataIndex: 'createdAt',
            align: 'center'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        tableData: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true
        },
      }
    },
    async created() {
      //await store.dispatch('GetInfo')
      setTimeout(() => {
        this.getTableData()
      }, 1000);
    },
    methods: {
    handleTableChange ({ current, pageSize }) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.getTableData()
    },
      getTableData () { 
      const params = {
        departmentId: store.getters.userInfo.userDepartment,
        page: this.pagination.current,
        perPage: this.pagination.pageSize
      }
      showEmployee(params).then(res => {
        this.tableData = res.data.list.map( item => {
              item.status = 0;
              return item;
        } )
        this.pagination.total = res.data.page.total
      })
    },
    }
  }
</script>

<style lang="less" scoped>
</style>
