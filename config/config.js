/*
 * @Author: wlWxh
 * @Date: 2023-11-28 09:46:03
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-08-30 16:00:41
 * @FilePath: \wp\vue_ui\config\config.js
 * @Description: 个性化基础配置，默认不上传仓库
 */

/**
 * @description: 跨域代理，匹配于vite.config.js中
 */

export const proxy = {
    port: '5174',
    /* '/sybi/public/api': {
        target: 'http://10.10.16.162:88',
        changeOrigin: true,
        ['/sybi/public/api']: '',
    } */
    '/test-sybi/public/api': {
        target: 'http://localhost',
        changeOrigin: true,
        /* bypass(req, res, options) {
            console.log('proxyURL',options);
            const proxyURL = options.target + options.rewrite(req.url);
            console.log('proxyURL', proxyURL);
            req.headers['x-req-proxyURL'] = proxyURL; // 设置未生效
            res.setHeader('x-req-proxyURL', proxyURL); // 设置响应头可以看到
        } */
    }
}

/**
 * @description: 异步请求（axios）基础配置，匹配于src\utils\request.js中
 */
export const request = {
    baseURL: '/sybi/public/api',
    timeout: 120000,
}

/**
 * @description: 异步请求（axios）基础配置，匹配于src\utils\request.js中
 */
export const test = {
    baseURL: '/test-sybi/public/api',
    timeout: 120000,
}

/**
 * @description: 异步请求（axios）基础配置，匹配于src\utils\request.js中
 */
export const sharePush = {
    baseURL: '/testIn.php',
    timeout: 120000,
}

/**
 * @description: 异步请求（axios）基础配置，匹配于src\utils\request.js中
 */
export const shareRequest = {
    baseURL: '/test.php',
    timeout: 120000,
}