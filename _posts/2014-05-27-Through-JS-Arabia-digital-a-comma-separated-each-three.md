---
date: 2014-05-27 11:23:40(UTC+0800)
layout: post
title: 通过JS将阿拉伯数字每三位一逗号分隔
thread: 5
categories: js_little_demo
tags: 数值转化
---

通过JS 将阿拉伯数字每三位一逗号分隔，如：1000000转化为1,000,000的多种转化形式

```javascript
'1500000000000'.replace(/\B(?=(\d{3})+$)/g,',');
```
```javascript
15000000..toLocaleString();
```
```javascript
"15000000".split("").reverse().join("").replace(/(\d{3})/g, "$1,").split("").reverse().join("");
```
```javascript
"115000000".split("").reverse().join("").replace(/(\d{3})(?=[^$])/g, "$1,").split("").reverse().join("");
```
```javascript
var cutStr = function(str)
{
  var newStr= new Array(str.length+ parseInt(str.length/3)); 
  newStr[newStr.length-1]=str[str.length-1]; 
  var currentIndex=str.length-1; 
  for(var i = newStr.length-1;i >= 0;i--) 
  { 
    if((newStr.length-i)%4==0) 
    { 
      newStr[i]=","; 
    }
    else
    { 
      newStr[i]=str[currentIndex--]; 
    } 
  } 
  return newStr.join("") 
} 
var num="15000000";
console.log(cutStr(num));
```
```javascript
function cutStr(str){
    var rmb='';
    var i2=0;
    for(var i=str.length-1; i>=0; i--){

        if(i%3==0&&i!=0){
            rmb+=str[i2]+',';
        }else{
            rmb+=str[i2];
        }
        i2++;
    }
    return rmb;
}
console.log(cutStr(num));
```
```javascript
function cutStr(num) {
    var aaa = num.toString();
    var arr1 = aaa.split("");
    var arr2 = [];
    for (var i = 0; i < arr1.length;) {

        for (j = 0; j < 3; j++) {

            arr2.unshift(arr1[i]);
            i++;
            if (j == 2 && i < arr1.length) {
                arr2.unshift(",");
            }
        }
    }
    alert(arr2.join(""));
}
cutStr(12345678);
```
```javascript
function formatNumber(value) {
    value = value.toString();
    if (value.length <= 3) {
        return value;
    } else {
        return formatNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
    }
}
console.log(formatNumber(12345678));
```
```javascript
var str = '123123211312.333123'.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1');
console.log(str);
```

