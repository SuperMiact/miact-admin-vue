import request from '@/utils/request'

// 新增角色
export function addRole(data){
    return request({
        url:'/api/roles',
        method:'post',
        data
    })
}

// 修改角色
export function updateRole(data){
    return request({
        url:'/api/roles/',
        method:'put',
        data
    })
}

// 查询角色
export function queryRoles(params){
    return request({
        url:'/api/roles/',
        method:'get',
        params:params
    })
}

// 通过角色名查找角色
export function queryRoleByRoleName(roleName){
    return request({
        url:'/api/roles/findRoleByRoleName',
        method:'get',
        params:roleName
    })
}

// 删除角色
export const delRole = (data) => request.delete('/api/roles/delete'+data)