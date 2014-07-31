---
date: 2014-07-31 14:23:40(UTC+0800)
layout: post
title: 引用类型 -- Array
thread: 25
categories: JS基础
tags: JS基础
---

##数组方法
1. 转换方法： `toString()`、`toLocaleString()`、`valueOf()`
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
console.log(array.valueOf());         //返回数组
alert(array.toString());              //返回字符串，并用逗号隔开，没有引号
alert(array.valueOf());               //返回字符串，并用逗号隔开，没有引号
```

1. 由于`alert()`要接收字符串参数，在用`valueOf()`方法的时候会在后台调用`toString()`方法，所以返回得到一样的结果。
2. `toLocaleString()`也是返回字符串，可区别于`toString()`，自定义返回函数。
3. 可以用`join()`来改变分隔符`array.join("||");`
##栈、队列方法
```javascript
var array = [1,2,3,4,5,6];
array.push("7","8");       //数组尾插入两个元素，返回长度
array.pop();			   //获取数组尾元素（删除），返回尾元素
array.unshift("-1"，"0");  //数组头插入两个元素，返回长度
array.shift();             //获取数组头元素（删除），返回头元素
```
1. IE7以及更早的版本总是返回undefined，而不是长度，用`array.length()`代替。
2. IE8在非兼容模式下会返回正确的长度
##重排序方法
```javascript
var array = [1,2,3,4,5,6];
array.reverse();       //反向排序
array.sort();          //按升序排列数组，会调用每个数组项，但是有bug
```
1. `sort()`会调用每个数组项的`toString()`转型方法，确定比较得到的字符串，以确定如何排序，即使是数值，比较的也是字符串！！！
2. 比较方法：
```javascript
function compare(value1,value2) {
	if(value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
 	} else {
		return 0;
	}
}
var values = [1,2,3,4,"5","a","z","e"];
values.sort(compare);
console.log(values);
//返回 [1, 2, 3, 4, "5", "a", "e", "z"] 升序，先排数字后排字母
```
3. 如果遇到中文，在中文之前的数组元素不会进行排序
##操作方法

