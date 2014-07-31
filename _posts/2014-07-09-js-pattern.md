---
date: 2014-07-09 16:23:40(UTC+0800)
layout: post
title: JS模式的学习代码片段
thread: 24
categories: jsStudyLog
tags: jsStudyLog
---


```javascript
//在用for-in的时候，如何删选出自身的属性。
	var man = {
		hands : 2,
		legs : 2,
		head :1
	};
	if(typeof Object.prototype.clone === "undefined") {
		Object.prototype.clone = function (){};
	};
	for(var i in man){
		// console.log(i,":",man[i]);
		if(man.hasOwnProperty(i)){
			document.write(i,":",man[i],"</br>");
		};
	};



	var inspect_me = 0,
		result = '';
	switch(inspect_me){
	case 0://每个case和switch排列整齐
		result = "zero";//使用代码缩进
		document.write(result);
		break;//每个结尾都有一个break语句
	case 1:
		result = "one";
		document.write(result);
		break;
	default://用default做为结尾
		result = "unknown";
		document.write(result);
	}



	var Person = function(name){
		this.name = name;
		// this.say = function(){
		// 	document.write("I am ",this.name);
		// };//在任何时候调用new Person()的时候都会在内存中创建一个新的函数，因为这个方法是通用的，多个实例都是调用同一个方法，应该添加在Person的原型中。
	};
	Person.prototype.say = function(){
		document.write(this.name)
	}//这个函数在多个实例中不会变化，所以单独拿出来通用，对于重用的都应该放在原型中
	var personSay = new Person("llj");
	personSay.say();



	function a(){
		var i=0;
		function b(){
			console.log(++i);
		}
		return b;
	}
	var c = a();
	c();//最简单的闭包



	function foo(){
		console.log("global foo");
	}
	function bar(){
		console.log("global bar");
	}
	function whoisme(){
		console.log(typeof foo);
		console.log(typeof bar);
		foo();
		bar();
		function foo(){
			console.log("local foo");
		}
		var bar = function bar(){
			console.log("local bar");
		};
	}
	whoisme();



	//即时函数
	var getResult = (function() {
  		var res = 2+2;
  		return (function(){
    		return res;
		}());
	}());
	console.log(getResult);



	var MYAPP = MYAPP || {};
	MYAPP.namespace = function (ns_string){
		var parts = ns_string.split('.'),
			parent = MYAPP,
			i;
		//剥离最前面的冗余全局变量
		if(parts[0] === "MYAPP"){
			parts = parts.slice(1);
		}
		for(i = 0 ; i < parts.length ; i++){
			if(typeof parent[parts[i]] === "undefined"){
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};
	var modules1 = MYAPP.namespace("modules.modules1");//都是对象
	modules1.function = "1";
```