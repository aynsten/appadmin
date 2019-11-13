<template>
  <div>
    <TempTemplate
      :BottonGroupStore="BottonGroupStore"
      :columns="columns"
      :data="data"
      :WhetherPage="WhetherPage"
      :paginginfo="paginginfo"
      :Whentershowsearch="Whentershowsearch"
    />
  </div>
</template>

<script>
import { EventBus } from "../../../components/common/eventBus";
import TempTemplate from "../components/TempTemplate";
import { QueryCustomerAuditPagedLists } from "../../../api/data";
export default {
  data() {
    return {
      WhetherPage: true,
      Whentershowsearch:true,
      paginginfo: {},
      BottonGroupStore: [
        // { MethodName: "Add", title: "新增", data: null },
        // { MethodName: "Refresh", title: "刷新", data: null },
        // { MethodName: "Export", title: "导出", data: null }
      ],
      columns: [
        {
          title: "创建时间",
          key: "sc_TimeCreated",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "修改时间",
          key: "sc_TimeLastMod",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "修改人",
          key: "sc_UserIdLastMod",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "用户",
          key: "customer",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "备注",
          key: "remark",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
         {
          title: "状态",
          key: "auditStatus",
          WhetherSearch: true,
          WhetherEdit: false,
          WhetherShowt:false,
        },
        {
          title: "状态",
          key: "auditStatusDes",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "申请级别",
          key: "newLevelDes",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "区域代理名称",
          key: "regionName",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          WhetherSearch: false,
          WhetherEdit: false,
          WhetherShow:true,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  style: {
                    color: "#fff",
                    border: "none",
                    background: "#39f",
                    margin: "0 5px"
                  },
                  props: { type: "text", size: "small" },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "区代审核编辑",
                        query: { id: params.row.newId }
                      });
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data: [],
      parameter:{}
    };
  },
  components: {
    TempTemplate
  },
  created() {
    this.parameter = {
      auditStatus: null,
      pageIndex: 1,
      pageSize: 12,
      sortBy: "Sc_TimeCreated",
      sortType: "desc "
    };
    QueryCustomerAuditPagedLists(this.parameter).then(res => {
      if (res.data.statusCode == 1) {
        this.data = res.data.data.items;
        this.paginginfo.pageIndex = res.data.data.pageIndex;
        this.paginginfo.pageSize = res.data.data.pageSize;
        this.paginginfo.totalCount = res.data.data.totalCount;
        this.paginginfo.totalPages = res.data.data.totalPages;
      }
    });
  },
  mounted() {
    let that = this;
    that.paginginfo.requesturl = "/api/CustomerAudit/QueryCustomerAuditPagedLists";
    EventBus.$on("pagingdata", function(data) {
      that.data = data;
    });
    EventBus.$on('Search',function(data){
      that.parameter = {
      auditStatus: null,
      pageIndex: 1,
      pageSize: 12,
      sortBy: "Sc_TimeCreated",
      sortType: "desc "
    };
    that.parameter[data.SelectValue] = data.value
     QueryCustomerAuditPagedLists(that.parameter).then(res => {
      if (res.data.statusCode == 1) {
        that.data = res.data.data.items;
        that.paginginfo.pageIndex = res.data.data.pageIndex;
        that.paginginfo.pageSize = res.data.data.pageSize;
        that.paginginfo.totalCount = res.data.data.totalCount;
        that.paginginfo.totalPages = res.data.data.totalPages;
      }
    });
    })
  }
};
</script>

<style>
</style>