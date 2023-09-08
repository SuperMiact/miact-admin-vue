import Vue from 'vue'
import Vuex from 'vuex'

// 引入Vuex
Vue.use(Vuex)

import state from '@/store/state' // 共同维护的一个状态，state里面可以是很多个全局状态
import actions from '@/store/actions' // 数据的异步操作
import getters from '@/store/getters' // 获取数据并渲染
import mulations from '@/store/mulations' // 处理数据的唯一途径，state的改变或赋值只能在这里

// 引入各大模块
const store = new Vuex.Store({state,actions,getters,mulations});

// 导出创建的store对象
export default store