<template>
  <div>
    <i-select v-model="SelectValue" filterable>
      <i-option
        v-for="(item,index) in columns"
        v-if="item.WhetherSearch"
        :value="item.key"
        :key="index"
      >{{ item.title }}</i-option>
    </i-select>
    <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
    <Button type="primary" icon="ios-search" @click="Search">Search</Button>
  </div>
</template>

<script>
import { EventBus } from "../../../components/common/eventBus";
export default {
  data() {
    return {
      SelectValue: "",
      value: ""
    };
  },
  props: {
    columns: Array
  },
  methods: {
    Search() {
      let SearchContext = {
        SelectValue: this.SelectValue,
        value: this.value
      };
      if (SearchContext.SelectValue == "") {
        this.$Message.error("搜索条件不能为空");
        return;
      }
      if (SearchContext.value == "") {
        this.$Message.error("搜索内容不能为空");
        return;
      }
      EventBus.$emit("Search", SearchContext);
    }
  }
};
</script>

<style>
.ivu-select {
  width: 20%;
}
</style>