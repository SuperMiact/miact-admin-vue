import request from '@/utils/request'

// 获取菜单
// export const getMenu = () => request.get('/mainMenu/getMenu')
export function getMenu (data) {
  return request({
    url: '/api/mainMenu/getMenu',
    method: 'get',
    params: data
  })
}

// 获取菜单
export function getMenuAll (data) {
  return request({
    url: '/api/mainMenu/getMenuAll',
    method: 'get',
    params: data
  })
}

// 添加菜单
export function addMenu (data) {
  return request({
    url: '/api/mainMenu/addMenu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu (data) {
  return request({
    url: '/api/mainMenu/updateMenu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu (params) {
  return request({
    url: '/api/mainMenu/delMenu',
    method: 'delete',
    params: params
  })
}

export const getIcons = () => request.get(window.location.origin + '/admin/public/iconData.json')
