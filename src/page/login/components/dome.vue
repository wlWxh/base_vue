<script setup></script>
<template>
    <div id="main">
        <div>
            <button @click="open()">1221</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    components: {},
    data() {
        return {}
    },
    watch: {},
    mounted() { },
    methods: {
        open() {
            this.api('login', {
                name: "chang",
                password: "changle123"
            }).then(res=>{
                console.log(res);
            })
        }
    },
}
</script>

<style scoped></style>