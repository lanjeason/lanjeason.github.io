---
date: 2014-06-18 15:02:40(UTC+0800)
layout: post
title: 蘑菇街总结
thread: 19
categories: jsdemo
tags: jsdemo
---

###js排序字母，遗憾的是我能想到ascii，为何没想着自己给他们定义呢？送上js操作字母的排序

```javascript
var abc = ['c','a','b','d','e','f']; //当然这个方法对于多个字母组成的字符串也是可以的
var obj = {a:0,b:1,c:2,d:3,e:4,f:5}; 
var obj1 = {0:'a',1:'b',2:'c',3:'d',4:'e',5:'f'}; 
for(var index in abc){ 
	var abc1 = abc[index]; 
	var abc3 = ""; 
	for(var i = 0; i< abc1.length; i ++ ){ 
		abc3 += obj[abc1[i]]; 
	}; 
	abc[index] = abc3;
};
abc.sort();
for(var index in abc){ 
	var abc1 = abc[index]; 
	var abc3 = ""; 
	for(var i = 0; i< abc1.length; i ++ ){ 
		abc3 += obj1[abc1[i]]; 
	}; 
	abc[index] = abc3 
}
console.log(abc);
```

来个更简单的，控制台测试了单字母字符串和多字母字符串的加减，显然是NAN。但是比较大小则会返回false和true，这使我非常惊喜。就不需要赋值和用双重循环来写这个比较算法了，而且移动位子我想到了冒泡的方法，只需要返回1或者-1即可移位，热泪盈眶啊。

```javascript
function compare_abc(val1,val2){
	if(val1 > val2){
		return 1;
	}else if(val1 < val2){
		return -1
	}
};
var abc = new Array("d","e","a","c","1","3","4","as");
abc.sort(compare_abc);
console.log(abc);
```

###setTimeout()

```javascript
for(i = 0 ; i < 10 ; i++){
	setTimeout(function(){
		console.log(i);
	},1000);
};
```

输出10个10，for的循环很快小于1s，但是setTimeout是异步的，当1s后，循环结束，并且i已经为10了，所以输出10个10。
ps：将1s缩短也是同样的结果。

<br/>补充：因为setTimeout是异步的，所以可以看成是两个小程序，一个负责i的plus，一个负责setTimeout。而i会在极其短的时间内变成10，setTimeout里的函数运行时，10个10就等待着一跃而出。

```javascript
for(i = 0 ; i < 10 ; ++i){
	console.log(i);
};

for(i = 0 ; i < 10 ; ++i){
		console.log(i+1);
};//输出1——10，这样是不等待一次性输出

(function write(i){
    if(i<10){
		console.log(i);
		i++;
		setTimeout(write,1000,i);
	}
})(0)//看了下闭包的用法，是不是用闭包的手法实现从0——9每隔1s的输出
```

###原型和继承
回去翻了翻书，原来我的项目里都在用这个，居然这个就是原型和继承，所以书还是得往细了看，别不知道自己码的是什么，也不知道为什么这个码

```javascript
//创建一个类并定义属性和方法
function Animal(name){
    this.name = name;
}

Animal.prototype = {   
    type : 'cat',
    jump : function(){
        alert (this.name + " is jumping...");
    },
    eat : function(){
        alert (this.name + " is eatting...");            
    }
}
var cat = new Animal("Kate");
alert(cat.name);
alert(cat.type);
cat.jump();
cat.eat();

//继承开始，实例化下就可以继承了，有点略后悔，之前做的初始化引导模块就是这么写的，居然不知道这就是原型和继承
function Dog(){};
Dog.prototype = new Animal("Henry");
var dog = new Dog();
dog.jump();
dog.eat();
```
