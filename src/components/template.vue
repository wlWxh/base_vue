<!--
 * @Author: wlWxh
 * @Date: 2023-11-23 10:01:53
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-11 10:07:01
 * @FilePath: \sybi-vue\src\page\admin\template.vue
 * @Description: 用来初始化数据展示等页面的模版
-->
<script setup>
</script>

<template>
    <div id="main">
        <div id="">
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
#main {
    height: 100%;
    display: flex;
    flex-direction: column;
}

#main>div {
    margin-bottom: 20px;
}

#main>div:last-child {
    margin-bottom: 0;
}

#head .el-breadcrumb {
    font-size: 1.5rem;
}

#head .el-row {
    align-items: center;
    height: 40px;
}

/* ****本页专有样式*** */



/* ****************** */

.cardHead {
    font-size: 1rem;
    font-weight: bold;
}

.cardMain {
    flex: 1;
}
</style>