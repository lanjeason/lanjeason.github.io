---
date: 2014-07-02 15:23:40(UTC+0800)
layout: post
title: 对原型和继承的学习做个小结
thread: 20
categories: jsStudyLog
tags: jsStudyLog
---

###引出对象

```javascript
var array = [1,2,3];
array.push(4);
array.reverse();
array.pop;
var length = array.length;
```

这是一个数组对象，包括push、reverse、pop获取数组长度等方法，这些方法的来源可以是自定义也可以从原型继承，下面是一个自定义的方法例子：

```javascript
var obj = {
	hands : 2,
	head :1,
	add : function(otherMan) {
		this.hands += otherMan.hands;
		this.head += otherMan.head;
	}
};
```

这是自己定义的一个对象中包含了一个方法，但是这样写扩展性并不好，在js模式中写道需要保证每个对象都含有一个 add 的方法，但同时也希望所有的man都共享同一个 add 方法，而不是手动添加这些方法，通过原型来实现。

###原型

JS中，每个对象都保持着一块隐藏的状态——对另一个对象的引用，这就是原型。之前的数组对象和man对象都是有原型对象的。这个隐藏的原型引用可以通过 __proto__ 属性来访问。而目前可以通过 Object.getPrototypeOf 函数来代替 __proto__ 属性，取得对原型的引用。目前可以在Google Chrome，FIrefox 和 IE9 浏览器中使用 Object.getPrototypeOf 函数。
<br/>现在来找回数组push这个方法的来源——就是来源于array的原型对象。可以通过Chrome调试Watch Expressions来监听array。通过调用 Object.getPrototypeOf 方法查看其原型。

##工作原理

