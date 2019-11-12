import axios from '@/libs/api.request'

/**
 *
 * 登录
 * **/
export const login = data => {
  return axios.request({
    url: '/api/Account/LoginByPwd',
    data,
    method: 'post',
  })
}


/**
 *
 * 后台人员列表
 * **/
export const QuerySysUserPagedLists = (data) => {
  return axios.request({
    url: '/api/Account/QuerySysUserPagedLists',
    data,
    method: 'post',
  })
}
/**
 *
 * 获取用户详情
 * **/
export const AccountGetUserDetail = (data) => {
  return axios.request({
    url: '/api/Account/GetUserDetail?id='+data,
  })
}

/**
 *
 * 删除用户
 * **/
export const AccountDeleteUser = (data) => {
  return axios.request({
    url: '/api/Account/DeleteUser?newId='+data,
    method: 'post',
  })
}
/**
 *
 * 用户信息保存
 * **/
export const AccountSaveUser = (data) => {
  return axios.request({
    url: '/api/Account/SaveUser',
    data,
    method: 'post',
  })
}
/**
 *
 * 修改密码
 * **/
export const AccountUpdateSysPwd = (data) => {
  return axios.request({
    url: '/api/Account/UpdateSysPwd',
    data,
    method: 'post',
  })
}

/**
 * 
 * 区代审核列表
 * */

export const QueryCustomerWalletFlowPagedLists = (data) => {
  return axios.request({
    url: '/api/CustomerWalletFlow/QueryCustomerWalletFlowPagedLists',
    data,
    method: 'post',
  })
}
/**
 *
 * 区代审核详情
 * */

export const CustomerAuditGetCustomerAuditDetail = (data) => {
  return axios.request({
    url: '/api/CustomerAudit/GetCustomerAuditDetail?id=' + data,
    method: 'get',
  })
}
/**
 *
 * 区代审核详情
 * */

export const CustomerAuditSetCustomerAuditStatus = (data) => {
  return axios.request({
    url: '/api/CustomerAudit/SetCustomerAuditStatus',
    data,
    method: 'post',
  })
}

/**
 *
 * 提现审核列表
 * */
export const QueryCustomerAuditPagedLists = (data) => {
  return axios.request({
    url: '/api/CustomerAudit/QueryCustomerAuditPagedLists',
    data,
    method: 'post',
  })
}

/**
 *
 * 提现审核详情
 * */

export const GetCustomerAuditDetail = (data) => {
  return axios.request({
    url: '/api/CustomerWalletFlow/GetCustomerAuditDetail',
    data,
    method: 'get',
  })
}
/**
 *
 * 提现审核状态修改
 * */

export const SetCustomerWalletFlowStatus = (data) => {
  return axios.request({
    url: '/api/CustomerWalletFlow/SetCustomerWalletFlowStatus',
    data,
    method: 'post',
  })
}

/**
 * 订单列表
 *
 * **/

export const OrderQueryOrder = (data) => {
  return axios.request({
    url: '/api/Order/QueryOrder',
    data,
    method: 'post',
  })
}

/**
 * 订单详情
 *
 * **/

export const OrderGetOrder = (data) => {
  return axios.request({
    url: '/api/Order/GetOrder?orderNo=' + data.orderNo + "&customer=" + data.customer,
    method: 'get',
  })
}

/**
 * 分销结账
 *
 * **/

export const OrderOrderClose = (orderNo, customer) => {
  return axios.request({
    url: `/api/Order/OrderClose?orderNo=${orderNo}&customer=${customer}`,
    method: 'post',
  })
}

/**
 * 修改订单信息
 * 
 * **/

export const UpdateOrder = (data) => {
  return axios.request({
    url: `/api/Order/UpdateOrder`,
    method: 'post',
    data
  })
}

/**
 * 分页
 *
 * **/
export const paging = (requesturl,data) => {
  return axios.request({
    url: requesturl,
    data,
    method: 'post',
  })
}

