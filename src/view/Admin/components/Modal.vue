<template>
  <div>
    <Modal v-model="Modal" title="数据编辑" @on-ok="ok" @on-cancel="cancel">
       <Form  :label-width="80">
        <FormItem :label="item.title" v-for="(item,index) in columns" :key="index" v-if="item.WhetherEdit">
            <Input :v-model="ModalData[item.key]" />
        </FormItem>
    </Form>

    </Modal>
  </div>
</template>
<script>
export default {
  data() {
      return{

      }
  },
  props: {
    Modal: Boolean,
    ModalData:Object,
    columns: Array,
  },
   
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
      this.$emit("WhetherToDisplayModal", false);
    },
    cancel() {
      this.$Message.info("Clicked cancel");
      this.$emit("WhetherToDisplayModal", false);
    }
  }
};
</script>