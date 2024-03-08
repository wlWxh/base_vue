/*
 * @Author: wlWxh
 * @Date: 2023-12-01 10:48:57
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-06 13:43:22
 * @FilePath: \sy-vue\lib\pendingControl.js
 * @Description: 用来控制一异步消息队列，优化页面加载的工具
 */
const pendingMap = new Map();

/**
 * @description: 获取当前请求的url
 * @param {Object} config 请求句柄
 * @return {String}  返回当前请求的url
 */
function getUrl(config) {
    return [config.baseURL, config.url].join('&')
}

/**
 * @description: 创建AbortSignal请求对象
 * @param {Object} config 请求句柄
 * @return {AbortSignal} AbortSignal实例对象
 */
export function create(config) {
    const temp = new AbortController
    const url = getUrl(config)
    if (pendingMap.has(url)) {
        clearOnes(url)
    }
    pendingMap.set(url, temp)
    return temp.signal
}

/**
 * @description: 清除指定请求
 * @param {String} url 请求url
 */
export function clearOnes(url) {
    if (typeof (url) != 'string') {
        url = getUrl(url)
    }
    if (pendingMap.has(url)) {
        const temp = pendingMap.get(url)
        temp.abort()
        pendingMap.delete(url)
    }

}

/**
 * @description: 清除全部请求
 */
export function clear() {
    pendingMap.forEach((_, key) => {
        clearOnes(key)
    })
}