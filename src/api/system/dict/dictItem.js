import request from '@/utils/request'

// 新增字典项
export function saveDictItem(data){
    return request({
        url:'/api/sysDictItem',
        method:'post',
        data
    })
}

// 更新字典项
export function updateDictItem(data){
    return request({
        url:'/api/sysDictItem/'+data.id,
        method:'put',
        data:data
    })
}

// 查询字典项
export function queryDictItem(params){
    return request({
        url:'/api/sysDictItem',
        method:'get',
        params:params
    })
}

// 删除字典项
export const delDictItem = (data) => request.delete('/api/sysDictItem/'+data)