---
date: 2014-08-04 14:39:40(UTC+0800)
layout: post
title: 引用类型 -- Date
thread: 26
categories: JS基础
tags: JS基础
---

##Date 类型
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
var utcDate = new Date(Date.UTC("2010, 8, 14, 17, 55, 55"));
document.write(parseDate + "<br/>" + parseDate2 + "<br/>" + utcDate);
//前两种是一样的，后一种在Chrome中调试出Invalid Date
```

