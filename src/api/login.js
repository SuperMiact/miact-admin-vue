import request from '@/utils/request'
import Cookies from "js-cookie";

// 用户登录
export function login(data){
    return request({
        url: '/api/users/login',
        method: 'post',
        data: data
    })
}

// 用户登出
export const logout = () => request.get('/api/users/logout?token=' + Cookies.get('Auth-Token'))
