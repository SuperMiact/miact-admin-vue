import request from '@/utils/request'

// 获取菜单
export const getMenu = () => request.get('/mainMenu/getMenu')

// 添加菜单
export function addMenu(data){
    return request({
        url:'/mainMenu/addMenu',
        method:'post',
        data:data
    })
}

// 修改菜单
export function updateMenu(data){
    return request({
        url:'/mainMenu/updateMenu',
        method:'post',
        data:data
    })
}

// 删除菜单
export function delMenu(params){
    return request({
        url:'/mainMenu/delMenu',
        method:'get',
        params:params
    })
}