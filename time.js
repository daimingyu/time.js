/**
 * 标准日期格式 : 2018-10-31 13:22:39
 * time : 2018-10-31 13:22:39
 * date : 2018-10-31
 * year : 2018
 * month : 10
 * day : 31
 * minute : 22
 * hour : 13
 * second : 39
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Time = factory()
} (this, function() {
    'use strict';

    //一些变量或常量
    let _date = new Date();
    const PARTTEN_DATE = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    const PARTTEN_DATE_HOUR = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/;
    const ERROR_PARTTEN = -1;
    const ERROR_ILLEGAL = -2;
    const FLAG_DATA = 1;
    const FLAG_DATA_HOUR = 2;
    const UNIT_YEAR = 'year';
    const UNIT_MONTH = 'month';
    const UNIT_DAY = 'day';
    const UNIT_HOUR = 'hour';
    const UNIT_MINUTE = 'minute';
    const UNIT_SECOND = 'second';

    // 工具函数
    let _utils = {
        /**
         * year % 4 == 0     条件1：年份必须要能被4整除
         * year % 100 != 0   条件2：年份不能是整百数
         * year % 400 ==0    条件3：年份是400的倍数
         * 当条件1和条件2同时成立时 就肯定是闰年
         * 如果条件1和条件2不能同时成立 但如果条件3能成立 则仍然是闰年
         * [判断一个年份是否为闰年]
         * @param  {[string]}  year [年]
         * @return {Boolean}      [description]
         */
        isLeapYear(year){
            return (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0);
        },
        cahngeToStandardTime(){
            //将不合法的时间转化成合法的时间
        },
        /**
         * [校验用户输入的时间格式是否符合标准 注:只校验格式整不正确，而不校验是否合法]
         * @param  {[string]} time [description]
         * [-1] [不符合正则匹配]
         * [2] [正确 并且格式为 YYYY-MM-DD HH:MM:SS]
         * [1] [正确 并且格式为 YYYY-MM-D
         */
        validatePattern(time){
            return  PARTTEN_DATE_HOUR.test(time) === true ? FLAG_DATA_HOUR :
                    PARTTEN_DATE.test(time) === true ? FLAG_DATA :
                    ERROR_PARTTEN;
        },
        /**
         * [校验 年 是否合法，只要第一个字符不是0即是合法]
         * @param  {[type]} year [description]
         * @return {[type]}      [description]
         */
        validateYear(year){
            year = typeof year === 'number' ? String(year) : year;
            return year.charAt(0) === '0' ? false : true;
        },
        /**
         * [校验 月 是否合法]
         * @param  {[type]} month [description]
         * @return {[type]}       [description]
         */
        validateMonth(month){
            return parseInt(month) >= 1 && parseInt(month) <= 12 ? true : false;
        },
        /**
         * [校验 日 是否合法]
         * @param  {[type]} year  [description]
         * @param  {[type]} month [description]
         * @param  {[type]} day   [description]
         * @return {[type]}       [description]
         */
        validateDay(year,month,day){
            month = parseInt(month);
            day = parseInt(day);
            switch(month){
                case 1:
                    return day >= 1 && day <= 31 ? true : false;
                case 2:
                    return  this.isLeapYear(year)?
                            day >= 1 && day <= 29 ? true : false:
                            day >= 1 && day <= 28 ? true : false;
                case 3:
                    return day >= 1 && day <= 31 ? true : false;
                case 4:
                    return day >= 1 && day <= 30 ? true : false;
                case 5:
                    return day >= 1 && day <= 31 ? true : false;
                case 6:
                    return day >= 1 && day <= 30 ? true : false;
                case 7:
                    return day >= 1 && day <= 31 ? true : false;
                case 8:
                    return day >= 1 && day <= 31 ? true : false;
                case 9:
                    return day >= 1 && day <= 30 ? true : false;
                case 10:
                    return day >= 1 && day <= 31 ? true : false;
                case 11:
                    return day >= 1 && day <= 30 ? true : false;
                case 12:
                    return day >= 1 && day <= 31 ? true : false;
            }
        },
        /**
         * [校验 时 是否合法]
         * @param  {[type]} hour [description]
         * @return {[type]}      [description]
         */
        validateHour(hour){
            return parseInt(hour) >= 1 && parseInt(hour) <= 24 ? true : false;
        },
        /**
         * [校验 分 是否合法]
         * @param  {[type]} minute [description]
         * @return {[type]}        [description]
         */
        validateMinute(minute){
            return parseInt(minute) >= 1 && parseInt(minute) <= 60 ? true : false;
        },
        /**
         * [校验 秒 是否合法]
         * @param  {[type]} second [description]
         * @return {[type]}        [description]
         */
        validateSecond(second){
            return parseInt(second) >= 1 && parseInt(second) <= 60 ? true : false;
        },
        /**
         * [校验 YYYY-MM-DD 是否合法]
         * @param  {[type]} time [description]
         * @return {[type]}      [description]
         */
        validateIsDateLegal(date){
            return this.validateYear(date.split('-')[0])?this.validateMonth(date.split('-')[1])?this.validateDay(date.split('-')[0],date.split('-')[1],date.split('-')[2])?true:false:false:false;
        },
        /**
         * [校验 HH:MM:SS 是否合法]
         * @param  {[type]} time [description]
         * @return {[type]}      [description]
         */
        validateIsHourLegal(hour){
            return this.validateHour(hour.split(':')[0])?this.validateMinute(hour.split(':')[1])?this.validateSecond(hour.split(':')[2])?true:false:false:false;
        },
        /**
         * [校验 用户输入的日期 是否合法]
         * @param  {[type]} time [description]
         * @return {[type]}      [description]
         */
        validateLegal(time){
            switch(this.validatePattern(time)){
                case FLAG_DATA_HOUR:
                    return this.validateIsDateLegal(time.split(' ')[0])?this.validateIsHourLegal(time.split(' ')[1])?true:false:false;
                case FLAG_DATA:
                    return this.validateIsDateLegal(time);
                case ERROR_PARTTEN:
                    return false;
            }
        },
        /**
         * [总体校验]
         * @param  {[type]} time [description]
         * @return 
         * [-1] [不符合正则匹配 格式错误]
         * [-2] [年 月 日 时 分 秒 不合法】
         * [2] [正确 并且格式为 YYYY-MM-DD HH:MM:SS]
         * [1] [正确 并且格式为 YYYY-MM-DD]
         */
        validate(time){
            return  this.validatePattern(time) === ERROR_PARTTEN ? ERROR_PARTTEN :
                    this.validateLegal(time) ? this.validatePattern(time) : 
                    ERROR_ILLEGAL;
        },
        /**
         * [校验用户输入的参数是否正确]
         * @param  {[type]}  funcName  [函数名]
         * @param  {[type]}  paramName [参数名]
         * @param  {Boolean} isTime    [参数是否为tine字符串]
         * @param  {[type]}  param     [参数]
         * @param  {[type]}  type      [参数值类型]
         * @return {[type]}            [description]
         */
        validateUserInput(funcName,paramName,isTime,param,type){
            param === undefined ? this.throwError(`${funcName}(): ${paramName} 参数不能为空`) : null;
            typeof param !== type ? _utils.throwError(`${funcName}(): ${paramName} 参数必须为 ${type}`) : null;
            if(isTime){ 
                this.validate(param) === ERROR_PARTTEN ? this.throwError(`${funcName}() ${paramName}: ${param} 参数格式错误`) : null;
                this.validate(param) === ERROR_ILLEGAL ? this.throwError(`${funcName}() ${paramName}: ${param} 不合法`) : null;
            }
        },
        /**
         * [报错函数]
         * @param  {[type]} msg [description]
         * @return {[type]}     [description]
         */
        throwError(msg){
            throw new Error(msg);
        },
        /**
         * [将0-9的数字转化为字符串]
         * @param  {[type]} num [description]
         * @return {[type]}     [description]
         */
        numStrAdd0(num){
            return (parseInt(num) <= 9 && parseInt(num) >= 0) ? ('0' + num) : num;
        },
        addSomeYear(obj,number){
            let date = `${parseInt(obj.year) + number}-${obj.month}-${obj.day}`;
            obj.time = obj.type === 1?date:`${date} ${obj.hour}:${obj.minute}:${obj.second}`;
            this.updateTimeObj(obj);
        },
        addSomeMonth(obj,number){
            let addYears = Math.floor((parseInt(number) + parseInt(obj.month))/13);
            let newMonth = (parseInt(number) + parseInt(obj.month))%12;
            newMonth = _utils.numStrAdd0(newMonth===0?12:newMonth);
            let newYear = parseInt(obj.year) + addYears;
            let date = `${newYear}-${newMonth}-${obj.day}`;
            obj.time = obj.type === 1?date:`${date} ${obj.hour}:${obj.minute}:${obj.second}`;
            this.updateTimeObj(obj);
        },
        /**
         * [判断某年 或者 某年某月有多少天]
         * @param  {[type]} year  [description]
         * @param  {[type]} month [description]
         * @return {[type]}       [description]
         */
        howManyDays(year,month){
            this.validateYear(year) === false ? this.throwError(`${year} 格式错误`) :null;
            if(!month){
                return this.isLeapYear(year) === true ? 366 : 365;
            }else{
                this.validateMonth(month) === false ? this.throwError(`${month} 格式错误`) :null;
                let res = 31;
                res = ((parseInt(month) === 4) || (parseInt(month) === 6) || (parseInt(month) === 8) || (parseInt(month) === 10))?30:31;
                res = (parseInt(month) !== 2)? res : this.isLeapYear(year) === true ? 29 : 28 ;
                return res;
            }
        },
        /**
         * [更新obj对象]
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        updateTimeObj(obj){
            var timeStr = obj.time;
            obj.year = timeStr.split(' ')[0].split('-')[0];
            obj.month = timeStr.split(' ')[0].split('-')[1];
            obj.day = timeStr.split(' ')[0].split('-')[2];
            obj.hour = timeStr.split(' ')[1]?timeStr.split(' ')[1].split(':')[0]:undefined;
            obj.minute = timeStr.split(' ')[1]?timeStr.split(' ')[1].split(':')[1]:undefined;
            obj.second = timeStr.split(' ')[1]?timeStr.split(' ')[1].split(':')[2]:undefined;
        }
    };

    let Time = function(timeStr){
        //需要对用户输入的timeStr进行校验校验
        _utils.validateUserInput('Time','timeStr',true,timeStr,'string')? _utils.throwError(`Time 参数格式错误`) : null;

        //返回Time对象
        return new Time.prototype.init(timeStr);
    }

    //构造函数
    Time.prototype.init = function(timeStr){
        this.time = timeStr;
        this.year = timeStr.split(' ')[0].split('-')[0];
        this.month = timeStr.split(' ')[0].split('-')[1];
        this.day = timeStr.split(' ')[0].split('-')[2];
        this.hour = timeStr.split(' ')[1]?timeStr.split(' ')[1].split(':')[0]:undefined;
        this.minute = timeStr.split(' ')[1]?timeStr.split(' ')[1].split(':')[1]:undefined;
        this.second = timeStr.split(' ')[1]?timeStr.split(' ')[1].split(':')[2]:undefined;
        this.type = timeStr.split(' ')[1]?FLAG_DATA_HOUR:FLAG_DATA;
    } 

    //将Time对象的原型指向Time的原型，这样Time构造出的对象 就能使用Time原型上的方法了
    Time.prototype.init.prototype = Time.prototype;

    //浅拷贝 合并一个或多个对象中的内容到第一个对象中
    Time.extend = Time.prototype.extend = function(){
        let funcObj = arguments[0];
        if(typeof arguments[0] !== 'object') return;
        for(let key in funcObj){
            this[key] = funcObj[key];
        }
    }

    //添加Time工具函数
    Time.extend({
        /**
         * [获取当前时间戳]
         * @return {[number]} [description]
         */
        getCurrentTimeStamp(){
            return _date.getTime();
        },
        /**
         * [获取当前年份]
         * @return {[number]} [description]
         */
        getCurrentFullYear(){
            return _date.getFullYear();
        },
        /**
         * [获取当前月份，1，2，3...]
         * @return {[number]} [description]
         */
        getCurrentMonth(){
            return _date.getMonth() + 1;
        },
        /**
         * [获取当前日数]
         * @return {[number]} [description]
         */
        getCurrentDate(){
            return _date.getDate()
        },
        /**
         * [获取当前小时数]
         * @return {[number]} [description]
         */
        getCurrentHours(){
            return _date.getHours();
        },
        /**
         * [获取当前分钟数]
         * @return {[number]} [description]
         */
        getCurrentMinutes(){
            return _date.getMinutes();
        },
        /**
         * [获取当前秒数]
         * @return {[number]} [description]
         */
        getCurrentSeconds(){
            return _date.getSeconds();
        },
        /**
         * [获取当前毫秒数]
         * @return {[string]} [description]
         */
        getCurrentMilliseconds(){
            return _date.getMilliseconds();
        },
        /**
         * [获取当前星期数，1，2，3，4，5，6，7]
         * @return {[number]} [description]
         */
        getCurrentDay(){
            if(_date.getDay() === 0){
                return 7;
            }
            return _date.getDay();
        },
        /**
         * [获取当前季度数]
         * @return {[number]} [description]
         */
        getCurrentQuarter(){
            return this.getCurrentMonth()%4 + 1;
        },
        /**
         * [获取格式化日期和时间]
         * @param  {Boolean} hasHour [是否需要具体时间 true:yyyy-MM-dd HH:MM:SS false:yyyy-MM-dd]
         * @return {[string]}          [description]
         */
        getCurrentFormatTime(hasHour){
            hasHour = hasHour === undefined?true:hasHour;
            let base = this.getCurrentFullYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDate();
            let result = hasHour === true?base + ' ' + this.getCurrentHours() + ':' + this.getCurrentMinutes() + ':' + this.getCurrentSeconds():base;
            return result;
        },
        /**
         * [判断是否是闰年]
         * @return {Boolean} [description]
         */
        isLeapYear(year){
            return _utils.isLeapYear(year);
        },
        /**
         * [判断某年 或者 某年某月有多少天]
         * @param  {[type]} year  [description]
         * @param  {[type]} month [description]
         * @return {[type]}       [description]
         */
        howManyDays(year,month){
            return _utils.howManyDays(year,month);
        },
        countDown(){
            //倒计时功能
        },
    });

    //添加Time对象函数
    Time.prototype.extend({
        /**
         * [判断时间是否在time之前]
         * @param  {[type]}  time [description]
         * @return {Boolean}      [description]
         */
        isBefore(time){
            _utils.validateUserInput('isBefore','time',true,time,'string');
            _utils.validate(this.time) !== _utils.validate(time) ? _utils.throwError(`${this.time} 和  ${time} 格式不一致,无法比较`) : null;
            return this.time < time ? true : false;
        },
        /**
         * [判断时间是否在time之后]
         * @param  {[type]}  time [description]
         * @return {Boolean}      [description]
         */
        isAfter(time){
            _utils.validateUserInput('isAfter','time',true,time,'string');
            _utils.validate(this.time) !== _utils.validate(time) ? _utils.throwError(`${this.time} 和  ${time} 格式不一致,无法比较`) : null;
            return this.time > time ? true : false;
        },
        /**
         * [判断time是否在time1和time2之间]
         * @param  {[type]}  time1 [description]D
         * @param  {[type]}  time2 [description]
         * @return {Boolean}       [description]
         */
        isBetween(time1,time2){
            _utils.validateUserInput('isBetween','time1',true,time1,'string');
            _utils.validateUserInput('isBetween','time2',true,time2,'string');
            ( _utils.validate(this.time) == _utils.validate(time1) && _utils.validate(this.time) == _utils.validate(time2) ) ? null : _utils.throwError(`${this.time}、${time1} 和 ${time2} 格式不一致,无法比较`) ;
            return (this.time > time1 && this.time < time2) ? true : false;
        },
        add(number,unit){
            switch(unit){
                case UNIT_YEAR:
                    _utils.addSomeYear(this,number);
                    return this;
                case UNIT_MONTH:
                    _utils.addSomeMonth(this,number);
                    return this;
                case UNIT_DAY:
                case UNIT_HOUR:
                case UNIT_MINUTE:
                case UNIT_SECOND:
                default :
                    _utils.throwError(`单位 ${unit} 错误`);
            }
        }
    });

    //返回对象
    return Time;
}));
