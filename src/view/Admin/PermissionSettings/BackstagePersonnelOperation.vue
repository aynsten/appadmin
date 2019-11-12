<template>
  <Row>
    <Col :span="12">
      <Form :model="data" :label-width="100">
        <FormItem label="主键">
          <Input v-model="data.newId" placeholder="newId ..." disabled />
        </FormItem>
        <FormItem label="创建时间">
          <Input v-model="data.sc_TimeCreated" placeholder="sc_TimeCreated ..." disabled />
        </FormItem>
        <FormItem label="修改时间">
          <Input v-model="data.sc_TimeLastMod" placeholder="sc_TimeLastMod ..." disabled />
        </FormItem>
        <FormItem label="修改人">
          <Input v-model="data.sc_UserIdLastMod" placeholder="sc_UserIdLastMod ..." disabled />
        </FormItem>
        <FormItem label="账号">
          <Input v-model="data.account" placeholder="account ..." />
        </FormItem>
        <FormItem label="角色">
          <Select v-model="data.newUserType">
            <Option :value="0">超级管理员</Option>
            <Option :value="1">管理员</Option>
          </Select>
        </FormItem>
        <FormItem label="用户类型描述">
          <Input v-model="data.newUserTypeDes" placeholder="newUserTypeDes ..." />
        </FormItem>
        <FormItem label="部门">
          <Input v-model="data.department" placeholder="department ..." />
        </FormItem>
      </Form>
      <BtnGroup @cancel="cancel" @preserve="preserve" />
    </Col>
    <Col :span="12">
      <Form :model="data" :label-width="100">
        <FormItem label="修改密码"></FormItem>
        <FormItem label="新密码">
          <Input v-model="password" type="password" />
        </FormItem>
        <FormItem label>
          <Button @click="submit">提交</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
import {
  AccountGetUserDetail,
  AccountSaveUser,
  AccountUpdateSysPwd
} from "../../../api/data";
import BtnGroup from "../components/BtnGroup";
import {EventBus} from '../../../components/common/eventBus'
export default {
  data() {
    return {
      data: {},
      password: ""
    };
  },
  created() {
    AccountGetUserDetail(this.$route.query.id).then(res => {
      if (res.data.statusCode == 1) {
        this.data = res.data.data;
      }
    });
  },
  methods: {
    cancel() {},
    preserve() {
      let template = {
        newId: this.data.newId,
        account: this.data.account,
        newUserType: this.data.newUserType,
        department: this.data.department
      };
      console.log(template);
      AccountSaveUser(template).then(res => {
        if (res.data.statusCode == 1) {
          this.$Message.success("信息保存成功");
          setTimeout(() => {
            EventBus.$emit("preserve", this.$route);
          }, 1000);
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    submit() {
      let template = {
        passWord: this.password,
        newId: this.data.newId
      };
      if (template.passWord == "") {
        this.$Message.error("密码不能为空");
        return;
      }
      AccountUpdateSysPwd(template).then(res => {
        if (res.data.statusCode == 1) {
          this.$Message.success("修改成功！");
          setTimeout(() => {
            EventBus.$emit("preserve", this.$route);
          }, 1000);
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    }
  },
  components: {
    BtnGroup
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

