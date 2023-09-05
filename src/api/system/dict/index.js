import request from '@/utils/request'

// 新增字典类型
export function saveDictType(data){
    return request({
        url:'/api/sysDictType',
        method:'post',
        data
    })
}

// 更新字典类型
export function updateDictType(data){
    return request({
        url:'/api/sysDictType/'+data.id,
        method:'put',
        data:data
    })
}

// 查询字典类型
export function queryDictType(params){
    return request({
        url:'/api/sysDictType',
        method:'get',
        params:params
    })
}

// 删除字典类型
export const delDictType = (data) => request.delete('/api/sysDictType/'+data)