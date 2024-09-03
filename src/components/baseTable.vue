<script setup></script>
<template>
    <div class='base_table'>
        <div class="table-header" v-if="$slots.header">
            <slot name="header" class="table-header"></slot>
        </div>

        <slot></slot>
        <div class="table-footer" v-if="page">
            <el-pagination class="page" :current-page="pageContorls.page" :page-size="pageContorls.pageSize"
                :page-sizes="[10, 20, 50, 100, 200, 300, 400, 500]" layout="total, sizes, prev, pager, next, jumper"
                :total="pageContorls.total" @size-change="sizeChange" @current-change="currentChange">
            </el-pagination>
            <slot name="footer"></slot>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        page: Boolean,
        pageContorls: Object
    },
    components: {},
    data() {
        return {}
    },
    watch: {},
    mounted() { },
    methods: {
        sizeChange(size) {
            this.$emit('update:pageContorls',{
                total: this.pageContorls.total,
                page:  this.pageContorls.page,
                per_page: size,
            })
            this.$emit('check')
        },
        currentChange(page) {
            this.$emit('update:pageContorls', {
                total: this.pageContorls.total,
                page:  page,
                per_page: this.pageContorls.per_page,
            })
            this.$emit('check')
        },
    },
}
</script>

<style scoped>
.table-header {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
}

.table-footer {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 10px;
}
</style>