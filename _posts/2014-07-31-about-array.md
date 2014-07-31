---
date: 2014-07-31 14:23:40(UTC+0800)
layout: post
title: 引用类型 -- Array
thread: 25
categories: JS基础
tags: JS基础
---

##数组方法
1. 转换方法： `toString()`、`toLocalString()`、`valueOf()`
2. 栈、队列方法：`push()`、`pop()`、`shift()`、`unshift()`
3. 重排序方法：`reverse()`、`sort()`
4. 操作方法：`concat()`、`slice()`、`splice()`
5. 位置方法：`indexOf()`、`lastIndexOf()`
6. 迭代方法：`every()`、`filter()`、`forEach()`、`map()`、`some()`
7. 缩小方法：`reduce()`、`reduceRight()`
##转换方法
```javascript
var array = [1,2,3,4,5,6,7];
console.log(array.toString());        //返回字符串，并用逗号隔开，没有引号
console.log(array.toLocalString());   //报错
console.log(array.valueOf());         //返回数组
```



