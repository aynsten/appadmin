<template>
  <div>
    <TempTemplate
      :BottonGroupStore="BottonGroupStore"
      :columns="columns"
      :data="data"
      :WhetherPage="WhetherPage"
      :paginginfo="paginginfo"
      :Whentershowsearch="Whentershowsearch"
      :WhetherDateSearch="WhetherDateSearch"
    />
  </div>
</template>
<script>
import TempTemplate from "../components/TempTemplate";
import { EventBus } from "../../../components/common/eventBus";
import { OrderQueryOrder } from "../../../api/data";
export default {
  data() {
    return {
      WhetherPage: true,
      Whentershowsearch: true,
      paginginfo: {},
      WhetherDateSearch:true,
      BottonGroupStore: [
        // { MethodName: "Add", title: "新增", data: null },
        // { MethodName: "Refresh", title: "刷新", data: null },
        // { MethodName: "Export", title: "导出", data: null }
      ],
      columns: [
        {
          title: "订单号",
          key: "orderNo",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "下单日期",
          key: "orderDate",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "订单状态",
          key: "newOrderStatusDes",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "用户",
          key: "customer",
          WhetherSearch: false,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "国家",
          key: "country",
          WhetherSearch: false,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "仓库",
          key: "wareHouse",
          WhetherSearch: false,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "收入",
          key: "incomeMoney",
          WhetherSearch: false,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "订单金额",
          key: "totalAmount",
          WhetherSearch: false,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "分销花费金额",
          key: "disMoney",
          WhetherSearch: false,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "额外费用",
          key: "otherMoney",
          WhetherSearch: false,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "货币单位",
          key: "currency",
          WhetherSearch: false,
          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "是否分销完结",
          key: "isClosed",
          WhetherSearch: true,

          WhetherEdit: true,
          WhetherShow: true
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          WhetherSearch: false,
          WhetherEdit: false,
          WhetherShow: true,
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
                        name: "订单编辑",
                        query: {
                          orderNo: params.row.orderNo,
                          customer: params.row.customer
                        }
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
      tempdata: {}
    };
  },
  components: {
    TempTemplate
  },
  created() {
    this.tempdata = {
      pageIndex: 1,
      pageSize: 12,
      sortBy: "Sc_TimeCreated",
      sortType: "desc"
    };
    OrderQueryOrder(this.tempdata).then(res => {
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
    this.paginginfo.requesturl = "/api/Order/QueryOrder";
    EventBus.$on("pagingdata", function(data) {
      that.data = data;
    });
    EventBus.$on("Search", function(data) {
      that.tempdata = {
        pageIndex: 1,
        pageSize: 12,
        sortBy: "Sc_TimeCreated",
        sortType: "desc"
      };
      that.tempdata[data.SelectValue] = data.value;
      OrderQueryOrder(that.tempdata).then(res => {
        if (res.data.statusCode == 1) {
          that.data = res.data.data.items;
          that.paginginfo.pageIndex = res.data.data.pageIndex;
          that.paginginfo.pageSize = res.data.data.pageSize;
          that.paginginfo.totalCount = res.data.data.totalCount;
          that.paginginfo.totalPages = res.data.data.totalPages;
        }
      });
    });
    EventBus.$on("handleChange", function(data) {
      that.tempdata = {
        pageIndex: 1,
        pageSize: 12,
        sortBy: "Sc_TimeCreated",
        sortType: "desc"
      };
      that.tempdata.orderDate = {
        beginTime: data[0],
        endTime: data[1]
      };
      OrderQueryOrder(that.tempdata).then(res => {
        if (res.data.statusCode == 1) {
          that.data = res.data.data.items;
          that.paginginfo.pageIndex = res.data.data.pageIndex;
          that.paginginfo.pageSize = res.data.data.pageSize;
          that.paginginfo.totalCount = res.data.data.totalCount;
          that.paginginfo.totalPages = res.data.data.totalPages;
        }
      });
    });
  },
  methods: {}
};
</script>

<style scoped>
</style>