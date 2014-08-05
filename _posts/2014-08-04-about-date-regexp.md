---
date: 2014-08-04 14:39:40(UTC+0800)
layout: post
title: 引用类型 -- Date&&regExp
thread: 26
categories: JS基础
tags: JS基础
---

##Date 类型 && regExp 类型
###Date 类型
- 创建默认当前日期

```javascript
var now = new Date();
console.log(now);
//默认output:Mon Aug 04 2014 14:45:05 GMT+0800 (中国标准时间)
```

- 创建固定日期

```javascript
var parseDate = new Date(Date.parse("May 25, 2004"));
var parseDate2 = new Date("May 25, 2004");
var utcDate = new Date(Date.UTC("2005, 8, 14, 17, 55, 55"));
document.write(parseDate + "<br/>" + parseDate2 + "<br/>" + utcDate);
//前两种是一样的，后一种在Chrome中调试出Invalid Date
```

###regExp 类型
- regExp基本知识

```javascript
var expression = / pattern / flags ;
//其中模式部分可以是任何正则表达式，有3个标志
//g 表示全局，应用于所有字符串，并非发现一个匹配项而停止
//i 表示不区分大小写
//m 表示多行，在到达一行文本末尾时还会继续查找下一行中是否存在模式相匹配项
```

- regExp简单例子

```javascript
var pattern1 = /[bc]at/i;		//匹配第一个bat或者cat，不区分大小写
var pattern2 = /\[bc\]at/i;		//匹配第一个[bc]at，不区分大小写
var pattern3 = /.at/gi;			//匹配所有以at结尾的字符串组合，不区分大小写
```

- 正则表达式字面量和regExp构造函数的区别

在ECMAScript 3中，正则表达式字面量始终会共享一个regExp实例，而构造函数每次创建都是一个新的实例

```javascript
var re = null,
	i;

for(i = 0 ; i < 10 ; i++){
	re = /cat/g;
	re.test("catlosdfafd");
}

for(i = 0 ; i < 10 ; i++){
	re = new RegExp("cat" , "g");
	re.test("catlosdfafd");
}
//例子来自JS高级程序设计第3版 感觉有问题 待定 只会输出一次true
```

- regExp实力属性

```javascript
var pattern = /\[bc\]at/i;
console.log(pattern.global);       //false
console.log(pattern.ignoreCase);   //true
console.log(pattern.multiline);    //false
console.log(pattern.lastIndex);    //0
console.log(pattern.source);       // \[bc\]at
```

