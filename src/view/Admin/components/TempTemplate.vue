<template>
  <div>
    <TempButtonGroup :BottonGroupStore="BottonGroupStore" @emitevents="emitevents" />
    <SearchBar :columns="columns" v-if="Whentershowsearch"/>
    <br />
    <Tables :columns="columns" :data="data" />
    <br />
    <Paging :paginginfo="paginginfo"  v-if="Object.keys(paginginfo).length !==0 && WhetherPage"/>
    <!-- <TempModal :Modal="Modal" @WhetherToDisplayModal="WhetherToDisplayModal" :ModalData="ModalData" :columns="columns"/> -->
  </div>
</template>

<script>
import TempButtonGroup from "./ButtonGroup";
import SearchBar from "./SearchBar";
import Tables from "./Tables";
import Paging from "./Paging";
// import TempModal from './Modal'
export default {
  components: {
    TempButtonGroup,
    SearchBar,
    Tables,
    Paging
    // TempModal
  },
  props: {
    BottonGroupStore: Array,
    columns: Array,
    data: Array,
    Modal: Boolean,
    ModalData: Object,
    WhetherPage: Boolean,
    paginginfo:Object,
    Whentershowsearch:Boolean
  },
  mounted(){
    console.log(this.data)
  },
  methods: {
    // 新增 刷新  导出
    emitevents(data) {
      console.log(data);
    },
    // 搜索
  
    // WhetherToDisplayModal(data){
    //    this.$emit("WhetherToDisplayModal", data);
    // }
  }
};
</script>

<style>
</style>