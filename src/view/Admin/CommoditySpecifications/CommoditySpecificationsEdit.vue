<template>
  <div>
    <Form :v-model="name" label-position="left" :label-width="100">
      <FormItem label="名称 ：">
        <Input v-model="name"></Input>
      </FormItem>
      <FormItem label="规格值 ：">
        <Button>红</Button>
        <Button>蓝</Button>
        <Button type="success" shape="circle" icon="md-add" @click="addSpecifications"></Button>
      </FormItem>
    </Form>
    <BtnGroup @cancel="cancel" @preserve="preserve" />
  </div>
</template>

<script>
import { EventBus } from "../../../components/common/eventBus";
import BtnGroup from "../components/BtnGroup";
export default {
  data() {
    return {
      name: ""
    };
  },
  components: {
    BtnGroup
  },
  methods: {
    addSpecifications() {
      if (this.name == "") {
        this.$Message.error("请输入规格名称");
      }
    },
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
.ivu-form-item-content {
  .ivu-btn {
    margin-right: 20px;
  }
}
</style>
