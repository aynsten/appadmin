<template>
  <div>
    <Row>
      <Col :span="12">
        <Form :model="data" :label-width="120">
          <FormItem label="姓名 :">
            <Input v-model="data.customer" placeholder="User Name ..." disabled />
          </FormItem>
          <FormItem label="审核状态 :">
            <Select v-model="data.auditStatus" :placeholder="auditStatusText">
              <Option value="0">待审核</Option>
              <Option value="1">通过</Option>
              <Option value="2">不通过</Option>
            </Select>
          </FormItem>
          <FormItem label="申请级别 :">
            <Input v-if="data.newLevel ==0" newLevel disabled value="省代" />
            <Input v-if="data.newLevel ==1" newLevel disabled value="市代" />
            <Input v-if="data.newLevel ==2" newLevel disabled value="区代" />
          </FormItem>
          <FormItem label="区域代理编码 :">
            <Input v-model="data.regionCode" placeholder disabled />
          </FormItem>
          <FormItem label="区域代理名称 :">
            <Input v-model="data.regionName" placeholder disabled />
          </FormItem>
          <FormItem label="审核说明 ：">
            <Input
              v-model="data.remark"
              type="textarea"
              :autosize="{minRows: 4,maxRows: 10}"
              placeholder="To Examine Explain ..."
            />
          </FormItem>
        </Form>
      </Col>
    </Row>
    <BtnGroup @cancel="cancel" @preserve="preserve" />
  </div>
</template>

<script>
import {
  CustomerAuditGetCustomerAuditDetail,
  CustomerAuditSetCustomerAuditStatus
} from "../../../api/data";
import { EventBus } from "../../../components/common/eventBus";

import BtnGroup from "../components/BtnGroup";
export default {
  components:{
    BtnGroup
  },
  data() {
    return {
      data: {},
      auditStatusText: ""
    };
  },
  created() {
    CustomerAuditGetCustomerAuditDetail(this.$route.query.id).then(res => {
      this.data = res.data.data;
      if (this.data.auditStatus == 0) {
        this.auditStatusText = "未审核";
      }
      if (this.data.auditStatus == 1) {
        this.auditStatusText = "通过";
      }
      if (this.data.auditStatus == 2) {
        this.auditStatusText = "未通过";
      }
    });
  },
  methods: {
    cancel() {
      EventBus.$emit("cancel", this.$route);
    },
    preserve() {
      if (this.data.remark == "") {
        this.$Message.error("请输入审核说明");
        return
      }
      let tempdata = {
        newId: this.data.newId,
        auditStatus: this.data.auditStatus,
        remark: this.data.remark
      };
      CustomerAuditSetCustomerAuditStatus(tempdata).then(res => {
        if (res.data.statusCode == 1) {
          this.$Message.success("操作成功！");
          setTimeout(() => {
            EventBus.$emit("preserve", this.$route);
          }, 2000);
        } else {
          this.$Message.error(res.data.msg);
        }
      });
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