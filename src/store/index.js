// 引入Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    mulations:{}, // mulations更改仓库中的数据
    actions:{}, // actions异步操作获取数据的
    getters:{}, // getters加工仓库中的数据
});

// 导出创建的store对象
export default store