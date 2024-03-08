<!--
 * @Author: wlWxh
 * @Date: 2023-11-06 13:30:54
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-06 15:11:10
 * @FilePath: \sy-vue\src\App.vue
 * @Description: 根组件，用来挂载vue
-->
<script setup>
import zhCn from '@/zh-cn.js'
let locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script></script>