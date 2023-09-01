import request from '@/utils/request'

// 查询当前用户信息
export const userInfo = () => request.get('/api/users/userInfo')

// 查询所有用户
export function queryUsers (params) {
  return request({
    url: '/api/users/',
    method: 'get',
    params: params
  })
}

// 添加用户
export function addUser (data) {
  return request({
    url: '/api/users/',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser (data) {
  return request({
    url: '/api/users/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除用户
export const delUser = (data) => request.delete('/api/users/' + data)

// 绑定角色
export function bindRole (data) {
  return request({
    url: '/api/users/bindRole',
    method: 'post',
    data:data
  })
}

// 导出用户数据
export function exportUser (data) {
  return request({
    url: '/api/users/export',
    method: 'get',
    params: data
  })
}

// 修改用户密码
export function editPasswd(data){
  return request({
    url: '/api/users/editPasswd',
    method: 'put',
    params: data
  })
}