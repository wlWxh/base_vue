/*
 * @Author: wlWxh
 * @Date: 2023-11-09 13:40:28
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-06 16:44:24
 * @FilePath: \sy-vue\router\routes.js
 * @Description: 总路由表，路由路径与插件的映射关系表
 */
import { Routes } from "../lib/componentController"; 

const routeList = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        children: [
            {
                path: 'test/:type',
                name: 'test',
            }
        ]

    },
    {
        path: '/admin',
        name: 'admin',
    }


]



const routes = new Routes('@p', routeList)
export default routes.get()