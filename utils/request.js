/*
 * @Author: wlWxh
 * @Date: 2023-11-06 13:30:54
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-02-26 11:19:44
 * @FilePath: \sy-vue\utils\request.js
 * @Description: 普通页面的异步请求（axios）基础封装，配置了请求和相应拦截器，配合cookies完成请求层面的状态管理
 */
import axios from 'axios'
import cookies from "vue-cookies";
import { Router } from '/router/router'
import * as pending from '/lib/pendingControl'

const service = axios.create({
    baseURL: '/sybi/public/api',
    timeout: 120000,
})

service.interceptors.request.use((config) => {
    config.signal = pending.create(config)
    if (cookies.get('token')) {
        config.headers.Authorization = cookies.get('token')
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

service.interceptors.response.use(function (res) {
    pending.clearOnes(res.config)
    if (res.data.code != '401') {
        return res
    }
    else {
        cookies.remove('token')
        Router.openRouter('/login')
        alert('登录已过期，请重新登录。')
    }
}, function (error) {
    return Promise.reject(error);
});

export default service