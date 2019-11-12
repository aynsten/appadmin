<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <FormItem label="商品名称">
        <Input v-model="formItem.name" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="商品编码">
        <Select v-model="formItem.select">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="颜色">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="红"></Checkbox>
          <Checkbox label="白"></Checkbox>
        </CheckboxGroup>
      </FormItem>

      <FormItem label="尺码">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="S"></Checkbox>
          <Checkbox label="M"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="规格">
        <Tables :columns="columns" :data="data" />
      </FormItem>
      <FormItem label="商品简介">
        <Input
          v-model="formItem.textarea"
          type="textarea"
          :autosize="{minRows: 3,maxRows: 10}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem label="商品主图"></FormItem>
      <FormItem label="商品详情图"></FormItem>
    </Form>
    <BtnGroup @cancel="cancel" @preserve="preserve" />
  </div>
</template>

<script>
import BtnGroup from "../components/BtnGroup";
import { EventBus } from "../../../components/common/eventBus";
import Tables from "../components/Tables";
export default {
  data() {
    return {
      formItem: {
        name: "",
        select: "",
        checkbox: [],
        textarea: ""
      },
      columns: [
        {
          title: "颜色",
          key: "colour"
        },
        {
          title: "尺码",
          key: "size"
        },
        {
          title: "价格",
          key: "price"
        },
        {
          title: "区代价格",
          key: "areaprice"
        },
        {
          title: "省代价格",
          key: "provinceprice"
        },
         {
          title: "是否启用",
          key: "provinceprice"
        }
      ],
      data: [
        {
          colour: "红色",
          size: "S",
          price: 451,
          provinceprice: 315,
          areaprice: 384
        },
        {
          colour: "蓝色",
          size: "M",
          price: 451,
          provinceprice: 315,
          areaprice: 384
        },
        {
          colour: "粉色",
          size: "L",
          price: 451,
          provinceprice: 315,
          areaprice: 384
        }
      ]
    };
  },
  components: {
    BtnGroup,
    Tables
  },
  methods: {
    cancel() {
      EventBus.$emit("cancel", this.$route);
    },
    preserve() {
      setTimeout(() => {
        EventBus.$emit("preserve", this.$route);
      }, 2000);
    },
    add() {}
  }
};
</script>

<style lang="less" scoped>
// .ivu-table-wrapper {
//     margin-bottom: 20px;
// }
</style>
