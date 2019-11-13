<template>
  <i-table :columns="tempcolumns" :data="data" stripe border></i-table>
</template>
<script>
export default {
  data() {
    return {
      tempcolumns: []
    };
  },
  props: {
    data: Array,
    columns: Array
  },
  mounted() {
    this.columns.forEach(item => {
      if (item.WhetherShow) {
        this.tempcolumns.push(item);
      }
    });
   
  }
};
</script>
