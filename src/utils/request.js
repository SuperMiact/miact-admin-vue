import axios from 'axios'
import { MessageBox } from 'element-ui'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 接口请求地址 设置跨域代理基本路径前缀
  timeout: 10000, // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
        // 在发送请求之前做些什么
        // 判断是否存在token,如果存在将每个页面header添加token
        if (sessionStorage.getItem('token')) {
            // config.headers.common['Authorization'] = sessionStorage.getItem("token");
            config.headers.common['token'] = sessionStorage.getItem('token')
        }
        return config
  }, 
  error => {
        return Promise.reject(error) 
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    let res = response.data
    // let resJson = JSON.parse(response.data);
    // if(resJson.code == "2004"){
    //   MessageBox.confirm('用户登录过期请重新登录, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //   .then(() => {
    //     router.push('/login')
    //   })
    //   .catch(() => {
    //     MessageBox.message({
    //       type: 'info',
    //       // message: ''
    //     })
    //   })
    // }


    return res;
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

