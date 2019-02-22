# Time.js

## 一、工具方法

```
函数： getCurrentTimeStamp()
功能： 获取现在时间戳
输入： 无
输出： 现在时间戳
事例：
Time.getCurrentTimeStamp()  //1542701124216
```

```
函数： getCurrentFullYear()
功能： 获取现在年份
输入： 无
输出： 现在年份
事例：
Time.getCurrentTimeStamp()  //2018
```

```
函数： getCurrentMonth()
功能： 获取现在月份
输入： 无
输出： 现在月份 1,2,3,4...
事例：
Time.getCurrentMonth()  //11
```

```
函数： getCurrentDate()
功能： 获取现在月份
输入： 无
输出： 现在日期
事例：
Time.getCurrentDate()  //20
```

```
函数： getCurrentHours()
功能： 获取现在小时 24小时制
输入： 无
输出： 现在小时
事例：
Time.getCurrentHours()  //16
```

```
函数： getCurrentMinutes()
功能： 获取现在分钟
输入： 无
输出： 现在分钟
事例：
Time.getCurrentMinutes()  //5
```

```
函数： getCurrentSeconds()
功能： 获取现在秒数
输入： 无
输出： 现在秒数
事例：
Time.getCurrentSeconds()  //37
```

```
函数： getCurrentMilliseconds()
功能： 获取现在豪秒数
输入： 无
输出： 现在豪秒数
事例：
Time.getCurrentMilliseconds()  //957
```

```
函数： getCurrentDay()
功能： 获取现在是星期几
输入： 无
输出： 现在星期几 1,2,3,4,5,6,7
事例：
Time.getCurrentDay()  //3
```

```
函数： getCurrentQuarter()
功能： 获取现在是第几季度
输入： 无
输出： 现在季度 1,2,3,4
事例：
Time.getCurrentQuarter()  //3
```

```
函数： getCurrentFormatTime(hasHour) 
功能： 获取现在格式化的时间
输入： hasHour: 是否要时分秒,类型为Boolean,默认为true
输出： 格式化时间
事例：
Time.getCurrentFormatTime()  //2018-11-20 16:11:47
Time.getCurrentFormatTime(false)  //2018-11-20
```

```
函数： isLeapYear(year) 
功能： 判断是否是闰年
输入： year: 具体年份,类型为Boolean,默认为true
输出： true or false
事例：
Time.isLeapYear('2018')  //false
Time.isLeapYear(2012)  //true
```

```
函数：howManyDays(year,month)
功能：判断某年 或者 某年某月 一共有多少天
输入：year: 具体年份 类型number month：具体月份 类型number
事例：
Time.howManyDays(2018);   //365
Time.howManyDays(2018,2)  //28
Time.howManyDays(2012,2)  //29
```

```
函数：getWeek(year,month,day)
功能：判断某年 某月 某日 是 星期几
输入：year: 具体年份 类型number或string, month：具体月份 类型number或string， day: 具体日期 类型number或string
事例：
Time.getWeek(2018,2,12);  //1
Time.getWeek(2018,11,23);  //3
```

```
函数：formatTime(timeStamp)
功能：将时间戳转化为具体时间
通用规则：
         * 时间                 展示文案
         * 当天 [0,1) min       刚刚
         * 当天 [1,60)min       x分钟前
         * 当天 [1,24)h         x小时前
         * 1天前                昨天
         * 2天前                2天前
         * 3天前                3天前
         * 4天前                年-月-日
输入：时间戳 [类型：Number]
事例：
Time.formatTime(1550419200000);  //2019-8-18
Time.formatTime(1550635932000);  //两天前
```

## 二、对象方法

### 说明
构造函数说明： 时间选择器类似于jquery的选择器，不必使用 new 创建对象，只需要传入格式化的时间就可以 例如： Time('2018-12-1') Time('2018-10-2 12:34:22') , 如果传入的参数不和法，浏览器会报错。


```
函数：format(str)
功能：格式化输出当前对象表示的时间
输入：输出的时间类型 例如 YY/MM/DD hh:mm:ss 或 YY-MM-DD hh:mm:ss
输出：格式化的时间 例如 2018/12/23 12:23:34 或 2018-12-23 12:23:34
事例
Time('2019-12-11 12:34:56').add(1,'month').format();   //2020-1-11 12:34:56
Time('2019-12-11 12:34:56').add(1,'month').format('YY/MM/DD hh:mm:ss');   //2020/1/11 12:34:56
```

```
函数：isBefore(t)
功能：判断一个时间是否在另一个时间之前
输入：t: 类型可以使time对象或time字符串
输出：true 或 false
事例
Time('2019-12-11').isBefore('2018-1-1');   //false
Time('2019-12-12').isBefore(Time('2020-12-11'))  //true
```

```
函数：isAfter(t)
功能：判断一个时间是否在另一个时间之后
输入：t: 类型可以使time对象或time字符串
输出：true 或 false
事例
Time('2019-12-11').isAfter('2018-1-1');   //true
Time('2019-12-12').isAfter(Time('2020-12-11'))  //false
```

```
函数：isBetween(t1,t2)
功能：判断一个时间是否在另两个时间之间
输入：t1, t2: 类型可以使time对象或time字符串
输出：true 或 false
事例
Time('2019-12-11').isBetween('2018-1-1',Time('2020-1-1'));   //true
```

```
函数：add(number,unit)
功能：进行时间的加减法 支持链式调用
输入：number (正数加法，负数为减法),unit 单位 'year' 'month' 'day' 'hour' 'minute' 'second'
输出：无，会改变原来的时间对象
事例：
Time('2018-1-1').add(1,'year').format() //2019-1-1 0:0:0
```

```
函数：duration(t)
功能：计算两个时间相差多少天
输入：t: 类型可以使time对象或time字符串
输出：相差天数，有正有负
事例：
Time('2018-1-1').duration('2018-1-4') //3
Time('2018-1-1').duration('2017-12-30') //-2
```

```
函数：countDown(timer,fn)
功能：倒计时
输入：timer: 定时器，当时间到了自动能够清楚 fn:回调函数
输出：{ day: 0, hour: 0, minute: 0, second: 0 } 表示时间到，或者逾期
事例：
let timer = setInterval(function (){
    var targetTime = '2018-12-01 09:56:00';
    var obj = Time(targetTime).countDown(timer,() => {
        console.log('时间到了');
    });
    console.log(obj);
},1000);
事例输出：
{ day: 0, hour: 0, minute: 0, second: 5 }
{ day: 0, hour: 0, minute: 0, second: 4 }
{ day: 0, hour: 0, minute: 0, second: 3 }
{ day: 0, hour: 0, minute: 0, second: 2 }
{ day: 0, hour: 0, minute: 0, second: 1 }
时间到了
{ day: 0, hour: 0, minute: 0, second: 0 }
```

## 三、版本
+ 1.1.6 更新countDown()函数，添加timer参数和回调参数。
+ 1.2.0 增加formatTime()函数。