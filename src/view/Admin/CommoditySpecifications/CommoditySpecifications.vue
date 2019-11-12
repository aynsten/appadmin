<template>
  <div>
    <TempTemplate 
    :BottonGroupStore="BottonGroupStore"
    :columns="columns"
    :data="data"
    :WhetherPage="WhetherPage"
    />
  </div>
</template>
<script>
import TempTemplate from "../components/TempTemplate";
export default {
  data() {
    return {
      WhetherPage:false,
      BottonGroupStore: [
        { MethodName: "Add", title: "新增", data: null },
        { MethodName: "Refresh", title: "刷新", data: null },
        { MethodName: "Export", title: "导出", data: null }
      ],
      columns: [
        {
          title: "ID",
          key: "id",
          WhetherSearch: true,
          WhetherEdit: true
        },
        {
          title: "规格名称",
          key: "sku",
          WhetherSearch: true,
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
                      this.$router.push({name:"商品规格新增/编辑"})
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
                      console.log(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [
        {
          id: "13165461",
          sku: "颜色",
        },
         {
          id: "13165461",
          sku: "尺码",
        },
       
      ]
    };
  },
  components: {
    TempTemplate
  },
  
};
</script>

<style scoped>
</style>