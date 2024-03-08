<script setup></script>
<template>
    <div id="main">
        <div>
            <button @click="test()">1111</button>
            <div>{{ temp }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    components: {},
    data() {
        return {
            temp: '',
        }
    },
    watch: {},
    mounted() {
        let object = new Date()
        console.log(object.now().format('yy-MM-dd'));
        console.log(object.format('yy-MM-dd'));
        console.log(object.lastYear().format('yy-MM-dd'));
        console.log(object.lastMonth().format('yy-MM-dd hh:mm:ss'));
        console.log(object.lastDay().format('yy-MM-dd hh:mm:ss'));
        console.log(object.lastHours().format('yy-MM-dd hh:mm:ss'));
        console.log(object.lastMinutes().format('yy-MM-dd hh:mm:ss'));
        console.log(object.lastSeconds().format('yy-MM-dd hh:mm:ss'));
        console.log(object.nextYear().format('yy-MM-dd hh:mm:ss'));
        console.log(object.nextMonth().format('yy-MM-dd hh:mm:ss'));
        console.log(object.nextDay().format('yy-MM-dd hh:mm:ss'));
        console.log(object.nextHours().format('yy-MM-dd hh:mm:ss'));
        console.log(object.nextMinutes().format('yy-MM-dd hh:mm:ss'));
        console.log(object.nextSeconds().format('yy-MM-dd hh:mm:ss'));
        console.log('本月天数：'+object.getMonthNum());
        console.log('本月是：'+object.getRealMonth());
        console.log(object.timeFormat(new Date())); 
        console.log('----------------------------------');
        console.log(object.getNatureWeek());
        console.log(object.getNatureWeek(1));
        console.log(object.getNatureWeek(2));
        console.log(object.getNatureWeek(3));
        console.log(object.getNatureWeek(4));
        console.log(object.getNatureWeek(5));
        console.log(object.getNatureWeek(6));
        console.log('----------------------------------');
        console.log(object.getLastNatureWeek());
        console.log(object.getLastNatureWeek(1));
        console.log(object.getLastNatureWeek(2));
        console.log(object.getLastNatureWeek(3));
        console.log(object.getLastNatureWeek(4));
        console.log(object.getLastNatureWeek(5));
        console.log(object.getLastNatureWeek(6));
        console.log('----------------------------------');
        console.log(object.getNatureMonth());
        console.log(object.getLastNatureMonth());
    },
    methods: {
        test() {
            /* this.api('login', '1111').then(res => {
                console.log(res);
            }) */
            this.api('login', {
                name: "chang",
                password: "changle123"
            }).then(res => {
                console.log(res);
            })
        }
    },
}
</script>

<style scoped></style>