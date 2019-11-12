<template>
  <div>
    <List border class="userinfor" v-if="datagruop.orderHead !=undefined">
      <ListItem>订单号 ：{{datagruop.orderHead.orderNo}}</ListItem>
      <ListItem>下单日期 ：{{datagruop.orderHead.orderDate}}</ListItem>
      <ListItem>用户名称 ：{{datagruop.orderHead.customerName}}</ListItem>
      <ListItem>国家 ：{{datagruop.orderHead.country}}</ListItem>
      <ListItem>仓库 ：{{datagruop.orderHead.wareHouse}}</ListItem>
      <ListItem>收入 ：{{datagruop.orderHead.totalAmount-datagruop.orderHead.disMoney-datagruop.orderHead.otherMoney}}</ListItem>
      <ListItem>订单金额 ：{{datagruop.orderHead.totalAmount}}</ListItem>
      <ListItem>分销花费金额 ：{{datagruop.orderHead.disMoney}}</ListItem>
      <ListItem>其他额外费用 ：{{datagruop.orderHead.otherMoney}}</ListItem>
      <ListItem>是否分销完结 ：{{datagruop.orderHead.isClosed}}</ListItem>
    </List>
    <Table :columns="columns" :data="datagruop.orderStyles" stripe border class="userinfor"></Table>
    <List border class="list-order-update" v-if="datagruop.orderHead !=undefined">
      <Form
        ref="formOrder"
        :rules="ruleValidate"
        :model="datagruop"
        :label-width="120"
        class="form"
      >
        <Form-item label="其他额外费用" prop="orderHead.otherMoney">
          <Input v-model="datagruop.orderHead.otherMoney" number />
        </Form-item>
        <Form-item label="订单状态">
          <Select v-model="datagruop.orderHead.newOrderStatus" placeholder="请选择">
            <Option :value="10">待付款</Option>
            <Option :value="20">已付款</Option>
          </Select>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="UpdateOrder('formOrder')">保存</Button>
          <Button
            type="warning"
            style="margin-left: 8px;"
            @click="OrderClose"
            v-if="datagruop.orderHead !=undefined && datagruop.orderHead.isClosed =='N'"
          >分销结账</Button>
        </Form-item>
      </Form>
    </List>
  </div>
</template>

<script>
import { EventBus } from "../../../components/common/eventBus";
import BtnGroup from "../components/BtnGroup";
import { OrderGetOrder, OrderOrderClose, UpdateOrder } from "../../../api/data";
import { checkNumber } from "@/libs/validate";

export default {
  data() {
    return {
      columns: [
        {
          title: "缩略图",
          key: "detailImg",
          fixed: "left",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.mainImg
                },
                style: {
                  width: "40px",
                  height: "40px"
                }
              })
            ]);
          }
        },
        {
          title: "下单时间",
          key: "orderDate",
          width: 150
        },
        {
          title: "交货地址",
          key: "storeName",
          width: 120
        },
        {
          title: "客户",
          key: "customer",
          width: 120
        },
        {
          title: "仓库",
          key: "wareHouse",
          width: 120
        },
        {
          title: "国家",
          key: "country",
          width: 120
        },
        {
          title: "商品",
          key: "style",
          width: 120
        },
        {
          title: "商品简介",
          key: "styleDesc",
          width: 200
        },
        {
          title: "颜色",
          key: "color",
          width: 120
        },
        {
          title: "颜色说明",
          key: "colorDesc",
          width: 120
        },
        {
          title: "尺寸",
          key: "size",
          width: 120
        },
        {
          title: "货币单位",
          key: "currency",
          width: 120
        },
        {
          title: "价格",
          key: "price",
          width: 120
        },
        {
          title: "数量",
          key: "orderQty",
          width: 120
        },
        {
          title: "总金额",
          key: "orderAmount",
          width: 120
        },

        {
          title: "商品详情编号",
          key: "itemNo",
          width: 120
        }
      ],
      data: [],
      model: "",
      datagruop: {},
      ruleValidate: {
        "orderHead.otherMoney": [
          { validator: checkNumber, message: "请输入数字", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let tempdata = {
      orderNo: this.$route.query.orderNo,
      customer: this.$route.query.customer
    };
    OrderGetOrder(tempdata).then(res => {
      this.datagruop = res.data.data;
    });
  },
  methods: {
    // cancel() {
    //   EventBus.$emit("cancel", this.$route);
    // },
    // preserve() {
    //   setTimeout(() => {
    //     EventBus.$emit("preserve", this.$route);
    //   }, 100);
    // },
    OrderClose() {
      OrderOrderClose(
        this.datagruop.orderHead.orderNo,
        this.datagruop.orderHead.customer
      ).then(res => {
        if (res.data.statusCode == 1) {
          this.$Message.success("分销结账成功！");
          setTimeout(() => {
            EventBus.$emit("preserve", this.$route);
          }, 1000);
        } else {
          this.$Message.success(res.data.msg);
        }
      });
    },
    UpdateOrder(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.datagruop.orderHead);
          UpdateOrder(this.datagruop.orderHead).then(res => {
            if (res.data.statusCode == 1) {
              this.$Message.success("保存成功！");
              setTimeout(() => {
                EventBus.$emit("preserve", this.$route);
              }, 1000);
            } else {
              this.$Message.success(res.data.msg);
            }
          });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    }
  },
  components: {
    BtnGroup
  }
};
</script>

<style lang="less" scoped>
.userinfor {
  margin-bottom: 20px;
}
.orderstore {
  line-height: 40px;
  margin-top: 20px;
}
.btngroup {
  margin-top: 20px;
}

.list-order-update {
  .form {
    margin-top: 20px;
    margin-right: 36px;
    margin-left: 16px;
  }
}
</style>>

