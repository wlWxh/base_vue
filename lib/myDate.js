/*
 * @Author: wlWxh
 * @Date: 2024-02-27 09:10:05
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-06 11:46:40
 * @FilePath: \sy-vue\lib\myDate.js
 * @Description: 自定义时间工具函数，直接修改Date原型，可以直接通过默认Date调用,在main导入即可
 */

/**
 * @description: 格式化当前时间对象
 * @param {String} fmt 格式化模板
 * @return {String} 格式化后时间字符串
 */
Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
    const o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * @description: 格式化指定时间对象
 * @param {*} date 指定时间（可以为时间对象以及可以被解析的字符串，数值等）
 * @param {String} fmt 格式化模板
 * @return {String} 格式化后的时间字符串
 */
Date.prototype.timeFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    return new Date(date).format(fmt);
}

/**
 * @description: 获取当前时间对象的真实月份（getMonth+1）
 * @return {number} 当前时间对象的月份数值
 */
Date.prototype.getRealMonth = function () {
    return this.getMonth() + 1
}

/**
 * @description: 获取当前时间对象的月份天数
 * @return {Number} 当前时间对象的月份天数
 */
Date.prototype.getMonthNum = function () {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
}

/**
 * @description: 返回指定时间对象的上一个自然月
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {*}{Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getLastNatureMonth = function (date = this) {
    date = new Date(date)
    date = new Date(date.getFullYear(), date.getMonth(),0)
    let month = Number(date.getDate())
    let res = [date.format('yyyy-MM-dd')]
    for (let i = 1; i < month; i++) {
        date.setDate(date.getDate() - 1)
        res.unshift(date.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 返回指定时间对象自然月
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {*}{Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getNatureMonth = function (date = this) {
    date = new Date(date)
    let month = Number(date.getDate())
    let res = [date.format('yyyy-MM-dd')]
    for (let i = 1; i < month; i++) {
        date.setDate(date.getDate() - 1)
        res.unshift(date.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 返回指定时间对象的上一个自然周
 * @param {Number} start 规定自然周起始时间默认为0（周日）以此类推
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getLastNatureWeek = function (start = 0, date = this) {
    date = new Date(date)
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() - start + 7) % 7)
    let res = []
    for (let i = 1; i <= 7; i++) {
        date.setDate(date.getDate() - 1)
        res.unshift(date.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 返回指定时间对象自然周
 * @param {Number} start 规定自然周起始时间默认为0（周日）以此类推
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getNatureWeek = function (start = 0, date = this) {
    date = new Date(date)
    let tempDate = new Date(date.getTime())
    let week = (tempDate.getDay() - start + 7) % 7
    let res = [tempDate.format('yyyy-MM-dd')]
    for (let i = 1; i <= week; i++) {
        tempDate.setDate(tempDate.getDate() - 1)
        res.unshift(tempDate.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 重构基础方法，获取当前时间戳的时间对象
 * @return {Date}
 */
Date.prototype.now = function () {
    return new Date()
}

/**
 * @description: 获取当前时间对象上一年的时间对象
 * @return {Data}
 */
Date.prototype.lastYear = function () {
    return new Date(this.getFullYear() - 1, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一月的时间对象
 * @return {Data}
 */
Date.prototype.lastMonth = function () {
    return new Date(this.getFullYear(), this.getMonth() - 1, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一月的时间对象
 * @return {Data}
 */
Date.prototype.lastMonth = function () {
    return new Date(this.getFullYear(), this.getMonth() - 1, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一季度的时间对象
 * @return {Data}
 */
Date.prototype.lastQuarter = function () {
    return new Date(this.getFullYear(), this.getMonth() - 3, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一周的时间对象
 * @return {Data}
 */
Date.prototype.lastWeek = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() - 7, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一天的时间对象
 * @return {Data}
 */
Date.prototype.lastDay = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() - 1, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一小时的时间对象
 * @return {Data}
 */
Date.prototype.lastHours = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours() - 1, this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一分钟的时间对象
 * @return {Data}
 */
Date.prototype.lastMinutes = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes() - 1, this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象上一秒的时间对象
 * @return {Data}
 */
Date.prototype.lastSeconds = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds() - 1, this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一年的时间对象
 * @return {Data}
 */
Date.prototype.nextYear = function () {
    return new Date(this.getFullYear() + 1, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一月的时间对象
 * @return {Data}
 */
Date.prototype.nextMonth = function () {
    return new Date(this.getFullYear(), this.getMonth() + 1, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一季度的时间对象
 * @return {Data}
 */
Date.prototype.lastQuarter = function () {
    return new Date(this.getFullYear(), this.getMonth() + 3, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一周的时间对象
 * @return {Data}
 */
Date.prototype.lastWeek = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + 7, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一日的时间对象
 * @return {Data}
 */
Date.prototype.nextDay = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + 1, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一小时的时间对象
 * @return {Data}
 */
Date.prototype.nextHours = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours() + 1, this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一分钟的时间对象
 * @return {Data}
 */
Date.prototype.nextMinutes = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes() + 1, this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象下一秒的时间对象
 * @return {Data}
 */
Date.prototype.nextSeconds = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds() + 1, this.getMilliseconds())
}

export default {}