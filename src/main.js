/*
 * @Author: wlWxh
 * @Date: 2023-11-06 13:30:54
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-06 16:17:26
 * @FilePath: \sy-vue\src\main.js
 * @Description: 主js，挂载vue，加载全局模块以及初始化全局变量
 */
/* 基础环境引入 */
import { createApp } from 'vue'
import './style.css'
/* 第三方工具引入 */
import VueCookies from "vue-cookies";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
/* 自定义组件引入 */
import App from './App.vue'
import { Api } from "@/api/index"
import { Router } from "/router/router"
import '/lib/myDate.js'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('vueQr', vueQr)
app.config.globalProperties.$cookies = VueCookies;

app.use(Api)
app.use(Router)

app.mount('#app')

/* import test from './test.vue'
createApp(test).mount('#app') */
