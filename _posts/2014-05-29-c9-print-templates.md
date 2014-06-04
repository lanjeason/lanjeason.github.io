---
date: 2014-06-04 09:53:40(UTC+0800)
layout: post
title: C9开发日志 -- 快递单打印模版系统
thread: 12
categories: C9开发日志
tags: 快递单打印模版 C9
---

###本日志主要记录快递单打印模版coding过程和思考，过程中有什么更好的办法请大家帮助指正。

首先了解了后台给的api通过ajax json传输过来，在页面加载时测试所有的api是否get正确，并查看api传递过来的json数据结构以便做后期的数据处理。

##新增打印模版，预期需要处理
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
<br/>
总结：首先页面加载时载入快递公司名单，选择快递公司后载入快递单图片和需要的字段，数据加载完毕用户即可拖动字段至指定位置。

###2014/05/30更新
1、重新确定了需要，将物流公司和打印模版分开管理，物流公司可以选择打印模版，而打印模版可以单独CRUD。
<br/>2、如果一个模版用于多个物流公司，即复制过去。（有待研究）
<br/>3、物流公司需要备注名。

<br/>任务：
<br/>1、完成两块表单的数据完整展现；
<br/>2、完成打印模版的CRUD；
<br/>1>数据分为两类，一类是一些配置属性，一类是拖动块的属性。
<br/>2>拖动块需要首先获取个数，新建的时候默认右侧从上至下一溜，编辑的时候获取数据来定位。
<br/>3、需要解决厘米和像素的转化。

<br/>过程：
已经完成物流公司的数据展现，目前正在设计新建物流绑定淘宝传过来的物流code。
已经完成自定义物流公司code的选择绑定。
<br/>总结动态下拉框获取value值，涉及监听下拉列表click事件，提高性能。

```javascript
.done(function(data) {
    for(i=0 ; i<data.root.length ; i++){
        if(data.root[i].built_in == true){
            var name = data.root[i].name;
            var code = data.root[i].code;
            var logisticCompaniesDom = "<option value='" + code + "'>" + name + "</option>";
            $("#logistic_companies").append(logisticCompaniesDom);
        };
        if(data.root[i].code == document.getElementById("code").value){
            document.getElementById("logistic_companies").value = document.getElementById("code").value;//编辑时可以直接获取当前code
        }
    };
    document.getElementById("logistic_companies").addEventListener("click",function(e) {
        var value = e.target.value;
        document.getElementById("code").value = value;//事件委托，提高性能
    });            
})
```

<br/>下阶段任务：
<br/>1、新建按钮直接获取fileds初始化状态，即获取filed的初始化api，编辑获取已有模版数据，即获取该id的template模版中filed对象的数据。的目前已经完成filed的拖动，后期还需要设定filed的拖动范围。
<br/>2、图片载入通过动态下拉框选择载入。拖动后获取top、left、filedname等数据，更新或者上传api。
<br/>3、获取图片的实际宽度和传入电脑中的像素值，获得厘米和像素的比例值，再通过像素比例缩放。最后传的数据是缩放后的像素*像素比*像素.厘米比获得实际厘米值传至api。
<br/>4、研究模版之间的复制功能，可以直接传递相应被复制模版的api值，类似编辑。

###2014/06/03更新
1、完成了新建和编辑的代码重构，分别从不同的API获取数据，分别通过post和put来新建和更新数据。
<br/>2、拖动后数据获取成功，但是后期需要改进拖动的代码。
<br/>3、上传新数据发生错误需要解决，影响后期数据获取。

```javascript
'module' object has no attribute 'TaobaoLogisticTemplateLine'
'module' object has no attribute 'TaobaoLogisticTemplate'
```

更新：
<br/>1、已完成数据新建、修改、获取的操作。
<br/>2、待添加物流公司的选择，id和名称的转化，选择公司后载入物流单据图片。
<br/>3、编辑需要获取field的text。
<br/>4、像素和厘米的长度转化。

更新：
<br/>1、完成了物流公司的选择。

###2014/06/04更新
1、已完成了新建和编辑修改打印模版，可定位left和top并传值。
<br/>2、完成了物流公司的选择，id和名称的转化。
<br/>3、需要选择公司后载入物流单据图片，编辑页面需要获取field的text值。
<br/>4、需要完成像素和厘米的长度转化。



