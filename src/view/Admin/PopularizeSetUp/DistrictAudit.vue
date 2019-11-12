<template>
  <div>
    <TempTemplate
      :BottonGroupStore="BottonGroupStore"
      :columns="columns"
      :data="data"
      :WhetherPage="WhetherPage"
      :paginginfo="paginginfo"
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
          WhetherSearch: true,
          WhetherEdit: true
        },
        {
          title: "修改时间",
          key: "sc_TimeLastMod",
          WhetherSearch: false,
          WhetherEdit: true
        },
        {
          title: "修改人",
          key: "sc_UserIdLastMod",
          WhetherSearch: false,
          WhetherEdit: true
        },
        {
          title: "用户",
          key: "customer",
          WhetherSearch: false,
          WhetherEdit: true
        },
        {
          title: "备注",
          key: "remark",
          WhetherSearch: false,
          WhetherEdit: true
        },
        {
          title: "状态",
          key: "auditStatusDes",
          WhetherSearch: false,
          WhetherEdit: true
        },
        {
          title: "申请级别",
          key: "newLevelDes",
          WhetherSearch: false,
          WhetherEdit: true
        },
        {
          title: "区域代理名称",
          key: "regionName",
          WhetherSearch: false,
          WhetherEdit: true
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          WhetherSearch: false,
          WhetherEdit: false,
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
      data: []
    };
  },
  components: {
    TempTemplate
  },
  created() {
    let parameter = {
      auditStatus: null,
      pageIndex: 1,
      pageSize: 10,
      sortBy: "Sc_TimeCreated",
      sortType: "desc "
    };
    QueryCustomerAuditPagedLists(parameter).then(res => {
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
    this.paginginfo.requesturl =
      "/api/CustomerAudit/QueryCustomerAuditPagedLists";
    EventBus.$on("pagingdata", function(data) {
      that.data = data;
    });
  }
};
</script>

<style>
</style>