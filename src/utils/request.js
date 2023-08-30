import axios from 'axios'
import Cookies from 'js-cookie'
import {handleException} from '@/exception/globalExceptionHandle'

// 创建axios实例
const service = axios.create({
  baseURL: '/admin', // 接口请求地址 设置跨域代理基本路径前缀
  timeout: 60000, // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
        // 在发送请求之前做些什么
        // 判断是否存在token,如果存在将每个页面header添加token

        if (Cookies.get('Auth-Token')) {
            // config.headers.common['Authorization'] = sessionStorage.getItem("token");
            config.headers.common['token'] = Cookies.get('Auth-Token')
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
    handleException(res)
    return res;
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

