<template>
  <div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
      <!-- <Page :total="dataCount" :page-size="PageSize" show-total @on-change="changePage"></Page> -->

      <Page
        :total="paginginfo.totalCount"
        :page-size="paginginfo.pageSize"
        show-total
        v-if="Object.keys(paginginfo).length !==0"
        @on-change="changePage"
      ></Page>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../../components/common/eventBus";
import { deflate } from "zlib";
import { type } from "os";
import { paging } from "../../../api/data";
export default {
  data() {
    return {
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      tempdata: [],
      data: []
    };
  },
  props: {
    paginginfo: Object,
    PageSize: {
      type: Number,
      default: 12
    }
  },

  methods: {
    changePage(index) {
      let tempdata = {
        isClosed: null,
        pageIndex: index,
        pageSize: this.paginginfo.pageSize,
        sortBy: "Sc_TimeCreated",
        sortType: "desc"
      };
      let requesturl = this.paginginfo.requesturl;
      paging(requesturl, tempdata).then(res => {
        EventBus.$emit("pagingdata", res.data.data.items);
      });
    }
  }
};
</script>

<style>
</style>