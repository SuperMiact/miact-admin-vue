import request from '@/utils/request'

// 查询当前用户信息
export const userInfo = () => request.get('/api/users/userInfo')

// 查询所有用户
export function queryUsers(params){
    return request({
        url: '/api/users/',
        method: 'get',
        params: params
    })
}

// 添加用户
export function addUser(data){
    return request({
        url: '/api/users/',
        method: 'post',
        data: data
    })
}

// 修改用户
export function updateUser(data){
    return request({
        url: '/api/users/'+data.id,
        method: 'put',
        data: data
    })
}


// 删除用户
export const delUser = (data) => request.delete('/api/users/'+data)