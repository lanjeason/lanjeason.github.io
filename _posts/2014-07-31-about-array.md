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

- 由于`alert()`要接收字符串参数，在用`valueOf()`方法的时候会在后台调用`toString()`方法，所以返回得到一样的结果。
- `toLocaleString()`也是返回字符串，可区别于`toString()`，自定义返回函数。
- 可以用`join()`来改变分隔符`array.join("||");`
##栈、队列方法
```javascript
var array = [1,2,3,4,5,6];
array.push("7","8");       //数组尾插入两个元素，返回长度
array.pop();			   //获取数组尾元素（删除），返回尾元素
array.unshift("-1"，"0");  //数组头插入两个元素，返回长度
array.shift();             //获取数组头元素（删除），返回头元素
```

- IE7以及更早的版本总是返回undefined，而不是长度，用`array.length()`代替
- IE8在非兼容模式下会返回正确的长度
##重排序方法
```javascript
var array = [1,2,3,4,5,6];
array.reverse();       //反向排序
array.sort();          //按升序排列数组，会调用每个数组项，但是有bug
```

- `sort()`会调用每个数组项的`toString()`转型方法，确定比较得到的字符串，以确定如何排序，即使是数值，比较的也是字符串！！！
- 比较方法：

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

- 如果遇到中文，在中文之前的数组元素不会进行排序
##操作方法
```javascript
var a = [1,2,3,4,5,6,7,8];
var b = a.concat("9",[10,11],[12,"13"],14,"15");
console.log(b);
```

- b是a生成a的数组的副本，并添加后续数组元素
- a不会发生变化

```javascript
var a = [1,2,3,4,5,6,7];
var b = a.slice(1);
var c = a.slice(1,4);
console.log(b);			//返回[2,3,4,5,6,7]
console.log(c);	        //返回[2,3,4]，也就是返回 4 - 1 = 3个
```

- 如果是`slice(-2,-1)`，在长度为5的数组中与返回`slice(3,4)`相同，5 + -2 = 3 ,5 + -1 = 4，如果结束位置小于开始位置，返回空数组

```javascript
//数组中最强大的方法splice()；可以删除、插入、替换
splice(0,1);        //删除数组第0个位置开始的1个元素
splice(0,0,"a");    //第0个位置插入"a"
splice(0,1,"a");    //删除数组第0个位子开始的1个元素，并插入"a"
``` 
##位置方法
```javascript
var a = [1,2,3,4,5,6,7,8,7,6,5,4,3,2,1];
console.log(a.indexOf(4)); //从前面开始数，第一次出现的位置 3
console.log(a.lastIndexOf(4)); //从后面开始数，最后一次出现的位置 3

var a = [1,2,3,4,5,4,6,7,8,9,4,10,11];
console.log(a.indexOf(4,3))； //3
console.log(a.indexOf(4,4))； //5
console.log(a.indexOf(4,6))； //10 从左向右第一次出现
console.log(a.lastIndexOf(4,4))  //3 
console.log(a.lastIndexOf(4,6))  //5
console.log(a.lastIndexOf(4,10)) //10 从右向左第一次出现
```

- IE 9+ 兼容
##迭代方法

1. `every()`把每项给函数，全部返回true，则返回true
1. `some()`把每项给函数，有返回true，则返回true
1. `filter`把每项给函数，返回true的组成数组返回
1. `map()`把每项给函数，把每次调用结果组成数组返回
1. `forEach()`把每项给函数，无返回

```javascript
var a = [1,2,3,4,5,6];
var everyFun = a.every(function(item,index,array) {
	return (item > 2);
});
var someFun = a.some(function(item,index,array) {
	return (item > 2);
});
var filterFun = a.filter(function(item,index,array) {
	return (item > 2);
});
var mapFun = a.map(function(item,index,array) {
	return (item > 2);
});
var forEachFun = a.forEach(function(item,index,array) {
	return (item > 2);
});
//false true [3, 4, 5, 6] [false, false, true, true, true, true] undefined
```

- IE 9+ 兼容
##缩小方法

```javascript
//4个参数，前一个值，当前值，项的索引，数组对象
var a = [1,2,3,4,5];
var sum = a.reduce(function(prev,cur,index,array) {
	return prev + cur;
});
//15 reduceRight()只是方向相反，其余全部相同。
```

- IE 9+ 兼容


