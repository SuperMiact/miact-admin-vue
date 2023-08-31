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

// 查询角色-不分页
export function queryAll(params){
    return request({
        url:'/api/roles/queryAll',
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

// 给角色分配权限
export function allotRolePerms(data){
    return request({
        url:'/api/roles/allotRolePerms',
        method:'post',
        data
    })
}

// 通过用户id查询角色权限
export function allotRolePermsByUserId(data){
    return request({
        url:'/api/roles/allotRolePermsByUserId/'+data,
        method:'get',
    })
}

// 通过角色id查询角色权限
export function allotRolePermsByRoleId(data){
    return request({
        url:'/api/roles/allotRolePermsByRoleId/'+data,
        method:'get',
    })
}

// 删除角色
export const delRole = (data) => request.delete('/api/roles/'+data)