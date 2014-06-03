---
date: 2014-05-27 11:23:40(UTC+0800)
layout: post
title: JS基础 -- 数据类型
thread: 6
categories: JS基础
tags: JS基础 数据类型
---

#数据类型
ECMAScript中有5种简单的数据类型：Undefined、Null、Boolean、Number、String、Object
<br/>可以用typeof操作符来判断数据类型
##Undefined
Undefined类型只有一个值——undefined，使用var声明变量但未对其加以初始化，值即为undefined

```javascript
var message = undefined;
alert(message == undefined);//true
```
##Null
Null类型只有一个值——null，null值表示一个空对象指针，而这也正是使用typeof会返回object的原因

```javascript
var car = null;
alert(typeof car);//"object"
```
##Boolean
用得最多的类型，只有两个字面值——true和false;
<br/>在数值转化方面，由于Number()函数在转换字符串时比较负责而且不够合理，因此在处理整数的时候更常用的是parseInt()，在处理浮点时用parseFloat()。
##String
1、如果字符串中包含双字节字符，那么length属性可能不会精确地返回字符串中的字符字数；
<br/>2、字符串一旦创建，它们的值就不能改变，如果要改变就要销毁原来的字符串；
<br/>3、转换字符串用toString()
##Object
定义一个新的object

```javascript
var o = new Object();
```

