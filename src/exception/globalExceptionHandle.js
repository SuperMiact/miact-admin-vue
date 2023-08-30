import {Message, MessageBox} from 'element-ui'

export function handleException(res){
    // 沒有操作权限
    if(res.code === '2004'){
        Message.error(res.message)
    }
    // 请先登录
    if(res.code === '2003'){
    MessageBox.confirm('用户登录过期请重新登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
    .then(() => {
        window.location.href = '/login'
    })
    .catch(() => {
        
    })
    }
}
