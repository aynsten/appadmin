<template>
  <div>
    <TempTemplate
      :BottonGroupStore="BottonGroupStore"
      :columns="columns"
      :data="data"
      :WhetherPage="WhetherPage"
      :paginginfo="paginginfo"
    />
    <Modal v-model="modal1" title="操作" @on-ok="ok" @on-cancel="cancel">
      <Input v-model="remark" type="textarea" :rows="4" placeholder="请输入审核备注" />
    </Modal>
  </div>
</template>
<script>
import TempTemplate from "../components/TempTemplate";
import { EventBus } from "../../../components/common/eventBus";
import {
  QueryCustomerWalletFlowPagedLists,
  SetCustomerWalletFlowStatus
} from "../../../api/data";
export default {
  data() {
    return {
      modal1: false,
      remark: "",
      paginginfo: {},
      ToExamineData: {},
      Whethertopass: 0,
      WhetherPage: true,
      BottonGroupStore: [
        // { MethodName: "Add", title: "新增", data: null },
        // { MethodName: "Refresh", title: "刷新", data: null },
        // { MethodName: "Export", title: "导出", data: null }
      ],
      columns: [
        {
          title: "ID",
          key: "newId",
          WhetherSearch: false,
          WhetherEdit: false
        },
        {
          title: "微信号",
          key: "wechatId",
          WhetherSearch: false,

          WhetherEdit: true
        },
        {
          title: "真实姓名",
          key: "name",
          WhetherSearch: false,

          WhetherEdit: true
        },
        {
          title: "创建时间",
          key: "sc_TimeCreated",
          WhetherSearch: false,

          WhetherEdit: true
        },
        {
          title: "修改时间",
          key: "sc_TimeLastMod",
          WhetherSearch: false,

          WhetherEdit: true
        },
        {
          title: "提取金额",
          key: "amount",
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
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          WhetherSearch: false,
          WhetherEdit: false,
          render: (h, params) => {
            if (params.row.auditStatus === 0) {
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
                        this.modal1 = true;
                        this.ToExamineData = params.row;
                        this.Whethertopass = 1;
                      }
                    }
                  },
                  "通过"
                ),
                h(
                  "Button",
                  {
                    style: {
                      color: "#ffffff",
                      border: "none",
                      background: "#f30"
                    },
                    props: { type: "text", size: "small" },
                    on: {
                      click: () => {
                        console.log(params);
                        this.modal1 = true;
                        this.ToExamineData = params.row;
                        this.Whethertopass = 2;
                      }
                    }
                  },
                  "不通过"
                )
              ]);
            }
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
    this.getQueryCustomerWalletFlowPagedLists();
  },
  methods: {
    getQueryCustomerWalletFlowPagedLists() {
      let tempdata = {
        pageIndex: 1,
        pageSize: 10,
        sortBy: "Sc_TimeCreated",
        sortType: "desc"
      };
      QueryCustomerWalletFlowPagedLists(tempdata).then(res => {
        if (res.data.statusCode == 1) {
          this.data = res.data.data.items;
          this.paginginfo.pageIndex = res.data.data.pageIndex;
          this.paginginfo.pageSize = res.data.data.pageSize;
          this.paginginfo.totalCount = res.data.data.totalCount;
          this.paginginfo.totalPages = res.data.data.totalPages;
        }
      });
    },
    ok() {
      if (this.Whethertopass == 1) {
        let tempdata = {
          newId: this.ToExamineData.newId,
          auditStatus: 1,
          remark: this.remark
        };
        SetCustomerWalletFlowStatus(tempdata).then(res => {
          this.getQueryCustomerWalletFlowPagedLists();
          if (res.data.statusCode == 1) {
            // this.$Message.success("");
          }
          if (res.data.statusCode == 2) {
            this.$Message.error(res.data.msg);
          }
        });
      }
      if (this.Whethertopass == 2) {
        let tempdata = {
          newId: this.ToExamineData.newId,
          auditStatus: 2,
          remark: this.remark
        };
        SetCustomerWalletFlowStatus(tempdata).then(res => {
          this.getQueryCustomerWalletFlowPagedLists();
          if (res.data.statusCode == 1) {
            // this.$Message.success("");
          }
          if (res.data.statusCode == 2) {
            this.$Message.error(res.data.msg);
          }
        });
      }
    },
    cancel() {}
  },
  mounted() {
    let that = this;
    this.paginginfo.requesturl =
      "/api/CustomerWalletFlow/QueryCustomerWalletFlowPagedLists";
    EventBus.$on("pagingdata", function(data) {
      that.data = data;
    });
  }
};
</script>

<style scoped>
</style>