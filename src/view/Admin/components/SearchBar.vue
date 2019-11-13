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
    &nbsp;&nbsp;
    <DatePicker
      type="daterange"
      placement="bottom-end"
      placeholder="Select date"
      style="width: 200px"
      @on-change="handleChange"
      v-if="WhetherDateSearch"
    ></DatePicker>
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
    columns: Array,
    WhetherDateSearch:Boolean
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
    },
    handleChange(date) {
      EventBus.$emit('handleChange',date)
    },
  }
};
</script>

<style>
.ivu-select {
  width: 20%;
}
</style>