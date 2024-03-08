<script setup>
import dome from './components/dome.vue'
</script>
<template>
    <div id="main">
        <div>
            <button @click="test()">33333</button>
            <div>{{ temp }}</div>
            <dome></dome>
        </div>
        <div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {
    props: {},
    components: {
        dome
    },
    data() {
        return {
            temp: '',
        }
    },
    watch: {},
    mounted() { },
    methods: {
        test() {
            this.openRouter('admin1')
        }
    },
}
</script>

<style scoped></style>
