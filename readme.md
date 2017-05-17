# datePickerMobile
 一款基于vue2.X的移动端日期时间选择组件
 
 [![GitHub issues:](https://img.shields.io/github/issues/nobrokenboy/datepickerMoible.svg)](https://github.com/nobrokenboy/datepickerMoible/stargazers)&nbsp;&nbsp;&nbsp;&nbsp;[![GitHub forks:](https://img.shields.io/github/forks/nobrokenboy/datepickerMoible.svg)](https://github.com/nobrokenboy/datepickerMoible/stargazers)       &nbsp;&nbsp;&nbsp;&nbsp;[![GitHub stars:](https://img.shields.io/github/stars/nobrokenboy/datepickerMoible.svg)](https://github.com/nobrokenboy/datepickerMoible/stargazers)
## Feature

````
    1.简单简洁
    
    2.可以设置主题颜色
    
    3.提供5种方式可以选择，如“年月日时分秒”、“年月日”、“时分秒”等等
    
    4.重点在与操作数据，减少对dom的操作;
    
    5.可以设置起始年，结束年
````

## Installation

````
    npm install --save datepicker-mobile
````

## Usage

````
    1.引入src目录下datetimePicker.vue文件，如import DatetimePicker from "****/src/datetimePicker.vue";
    
    2.挂在vue实例的components钩子上;
    
    3.在父实例的模板中<datetime-picker></datetime-picker>这样子使用
````

## Prop

* `isShowSelector(Boolean)`:控制组件的显隐

* `datepickerType(String)`:目前只能指定以下5种形式

       1."common":可以选择“年月日时分秒”，格式为“yyyy-mm-dd hh:mm:ss”
       
       2."date":可以选择“年月日”,格式为“yyyy-mm-dd”
       
       3."month":可以选择“年月”,格式为“yyyy-mm”
       
       4."time":可以选择“时分秒”,格式为“hh:mm:ss”
       
       5."minute":可以选择“时分”,格式为“hh:mm”
       

* `transitionType(String)`:组件出现隐藏的过渡效果，具体可以参考vue官网的[过渡效果](https://cn.vuejs.org/v2/guide/transitions.html#多个组件的过渡)

* `shadeZIndex(Number)`:设置遮罩的z-index属性

* `themeColor(String)`:设置主题颜色，目前只应用在“确定”按钮上

* `beginYear(Number)`:设置起始年份，默认为1900年

* `endYear(Number)`:设置结束年份，默认为当前年份

* `dateValue(String)`:只有在datepickerType等于"common"、"date"、"month"时设置才有效，同时格式必须与datepickerType的格式相对应

## Effect Gif:
  

## A Demo:
["戳我试试呀"](http://nobrokenboy.me/datepickerMoible/index.html)或者扫我一下也可以![效果图]()