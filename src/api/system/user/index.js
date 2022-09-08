import request from '@/utils/request'

// 查询当前用户信息
export const userInfo = () => request.get('/api/users/userInfo')

// 查询所有用户
// export const queryUsers = (params) => request.get('/api/users/',params)

// 查询所有用户
export function queryUsers(params){
    return request({
        url: '/api/users/',
        method: 'get',
        params: params
    })
}