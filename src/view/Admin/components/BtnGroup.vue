<template>
  <div>
    <Button @click="cancel">取消</Button>
    <Button type="primary" @click="preserve">保存</Button>
  </div>
</template>

<script>
export default {
    methods: {
    cancel() {
      this.$emit("cancel", this.$route);
    },
    preserve() {
      setTimeout(() => {
        this.$emit("preserve", this.$route);
      }, 2000);
    }
  }
};
</script>


<style lang="less" scoped>

.ivu-btn {
  margin-right: 20px;
  padding-left: 30px;
  padding-right: 30px;
}
</style>>