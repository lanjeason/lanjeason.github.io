---
date: 2014-05-29 12:54:40
layout: post
title: C9开发日志 -- 快递单打印模版系统
thread: 12
categories: C9开发日志
tags: 快递单打印模版 C9
---

#本日志主要记录快递单打印模版coding过程和思考，过程中有什么更好的办法请大家帮助指正。

首先了解了后台给的api通过ajax json传输过来，在页面加载时测试所有的api是否get正确，并查看api传递过来的json数据结构以便做后期的数据处理。

##预期需要处理
1、快递公司数据结构
</br>
api地址

```javascript
/api/taobao_logistics_companies
```

数据结构

```json
[{
	code:"",
	id:1,
	name:"",
	reg_mail_no:""

},
...]
```

2、快递单信息数据结构
</br>
api地址

```javascript
/api/taobao_logistic_templates?action=fields
```

数据结构

```json
[{
	field:"",
	text:""
},
...]
```

3、再查找快递单图片和对应的快递公司就OK了。