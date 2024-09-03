/*
 * @Author: wlWxh 2213746498@qq.com
 * @Date: 2023-11-06 13:29:20
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-07 08:43:09
 * @FilePath: \sy-vue\vite.config.js
 * @Description: vite默认环境配置，别名、跨域、端口等，均在此配置
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { proxy } from './config/config'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  resolve: {
    /* extensions: ['.vue', '.js', '.json', '.mjs'], */
    //设置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@p': path.resolve(__dirname, 'src/page'),
      '@r': path.resolve(__dirname, '/'),
    },
  },
  server: {
    proxy: proxy,
  }
})
