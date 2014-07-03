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

JS中，每个对象都保持着一块隐藏的状态——对另一个对象的引用，这就是原型。之前的数组对象和man对象都是有原型对象的。这个隐藏的原型引用可以通过 _proto_ 属性来访问。而目前可以通过 Object.getPrototypeOf 函数来代替 _proto_ 属性，取得对原型的引用。目前可以在Google Chrome，FIrefox 和 IE9 浏览器中使用 Object.getPrototypeOf 函数。
<br/>现在来找回数组push这个方法的来源——就是来源于array的原型对象。可以通过Chrome调试Watch Expressions来监听array。通过调用 Object.getPrototypeOf 方法查看其原型。

###工作原理

原型是普通的对象，可以给其添加方法和属性。但是这个原型对象的特殊是因为他还遵循其他规则。一个对象首先查找自己本身的方法，如果没有找到才会去调用_proto_的方法。这样的特性可以让我们重新定义例如push的方法，来屏蔽原型中的方法。原型对象提供继承的功能，对原型的方法实现共享，原型是链式的，因为原型对象是一个对象，所以可以继续继承原型，循环下去。所以我们需要将方法共享出来，这是js模式的一部分，例如使用构造函数。

###函数

JS中函数也是对象

```javascript
// 这将返回 true：
typeof (Array) === "function"
// 这样的表达式也是：
Object.getPrototypeOf(Array) === Object.getPrototypeOf(function () { })
// 这样的表达式同样：
Array.prototype != null
```

第一条说明数组是函数；第二条说明数组的原型和别的函数的原型是一样的；第三条说明Array函数都有一个 prototype 属性，而这个 prototype 属性指向一个有效的对象。 
<br/> _proto_和prototype的区别：Array._proto_ 提供的是 数组原型 – 请把它当作 Array 函数所继承的对象；Array.protoype 提供的的是 所有数组的原型，它提供的是像 array 这样数组对象的原型对象，也包含了所有数组将会继承的方法。

```javascript
var o = new Array();
o.push(3);
//等价于下面
var o = {};
o._proto_ = Array.prototype;//o的原型是继承所有数组
Array.call(o);
o.push(3);
```

这即是构造函数。JavaScript 中的 new 操作符有三个基本任务。首先，它创建新的空对象。接下来，它将设置新对象的 _proto_ 属性，以匹配所调用函数的原型属性。最后，操作符调用函数，将新对象作为“this”引用传递。

###构造函数
构造函数的特殊性质：1、通常构造函数的首字母是大写的（让识别构造函数变得更容易）；2、构造函数通常要和 new 操作符结合，用来构造新对象。

<br/>例如之前写的obj：

```javascript
var Obj = function(hands,head) {
	this.hands = hands;
	this.head = head;
	this.add = function(otherMan) {
		this.hands += otherMan.hands;
		this.head += otherMan.head;
	};
};

var man1 = new Obj(1,2);
var man2 = new Obj(3,4);
man1.add(man2);
```

<br/>有了继承，应该将 add 函数继承到Obj原型中，修改Obj.prototype:

```javascript
var Obj = function(hands,head) {
	this.hands = hands;
	this.head = head;
};
Obj.prototype.add = function (otherMan) {
	this.hands += otherMan.hands;
	this.head += otherMan.head;
};
var man1 = new Obj(1,2);
var man2 = new Obj(3,4);
man1.add(man2);
```