<template>
  <div>
    <TempTemplate
      :BottonGroupStore="BottonGroupStore"
      :columns="columns"
      :data="data"
      :WhetherPage="WhetherPage"
      :paginginfo="paginginfo"
    />
    <Modal v-model="modal1" title="提示" @on-ok="ok" @on-cancel="cancel">
      <p>确认删除该管理员吗？</p>
    </Modal>
  </div>
</template>

<script>
import TempTemplate from "../components/TempTemplate";
import { QuerySysUserPagedLists, AccountDeleteUser } from "../../../api/data";
export default {
  data() {
    return {
      WhetherPage: false,
      paginginfo: {},
      newId: null,
      modal1: false,
      BottonGroupStore: [
        // { MethodName: "Add", title: "新增", data: null }
        // { MethodName: "Refresh", title: "刷新", data: null },
        // { MethodName: "Export", title: "导出", data: null }
      ],
      columns: [
        {
          title: "主键",
          key: "newId",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "创建时间",
          key: "sc_TimeCreated",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow:true,
        },
         {
          title: "修改时间",
          key: "sc_TimeLastMod",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow:true,
        },
          {
          title: "修改人",
          key: "sc_UserIdLastMod",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "账号",
          key: "account",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow:true,
        },
        {
          title: "部门",
          key: "department",
          WhetherSearch: true,
          WhetherEdit: true,
          WhetherShow:true,
        },
        
        {
          title: "角色",
          key: "newUserTypeDes",
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
                        name: "新增/编辑",
                        query: {
                          id: params.row.newId
                        }
                      });
                    }
                  }
                },
                "编辑"
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
                      this.modal1 = true;
                      this.newId = params.row.newId;
                    }
                  }
                },
                "删除"
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
    this.getQuerySysUserPagedLists();
  },
  methods: {
    getQuerySysUserPagedLists() {
      let tepmdata = {
        pageIndex: 1,
        pageSize: 10
      };
      QuerySysUserPagedLists(tepmdata).then(res => {
        if (res.data.statusCode == 1) {
          this.data = res.data.data.items;
          console.log(this.data);
        }
      });
    },
    ok() {
      AccountDeleteUser(this.newId).then(res => {
        if (res.data.statusCode == 1) {
          console.log(res);
          this.getQuerySysUserPagedLists();
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    cancel() {}
  }
};
</script>

<style>
</style>