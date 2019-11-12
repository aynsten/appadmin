<template>
  <i-table :columns="columns" :data="data" stripe border></i-table>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: Array,
    columns: Array
  },

};
</script>
