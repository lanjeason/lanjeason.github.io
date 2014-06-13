---
date: 2014-06-13 18:51:40(UTC+0800)
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

<br/>进度：
<br/>1、完成了模版新建和更新的field整合。
<br/>2、完成数据移动范围设定。
<br/>3、需要选择公司后载入物流单据图片。
<br/>4、需要完成像素和厘米的长度转化。

###2014/06/05更新
1、完成了模块拖放、缩放、删除的功能。（整合了之前的代码）
2、需要选择公司后载入物流单据图片。
3、需要完成像素和厘米的长度转化。
4、三种订单需要打印。

###2014/06/07更新
1、需要完成像素和厘米的长度转化。(还是需要了解不同套打中像素和厘米的转化问题是在不同分辨率下的，不应该采取自己度量的方式进行，因为每张快递单的大小都是不同的，不同分辨率下会有不同的缩放比率，还有像素的缩放比率。用两个比率进行换算，这个是急需解决的问题。)
<br/>2、单据图片的导入需要和第一个问题一起解决。
<br/>3、之上的两个问题解决后方可解决三种打印单据的打印api和打印次数time参数的传递。
<br/>4、小问题：需要修正关闭按钮的形式，可以使用<i>标签加以修改，调用全局css的fontStyle。

###2014/06/08更新
像素和厘米之间的换算是需要知道图片的分辨率的。通常设计网页的时候，图片的分辨率一般都是用72dpi的，即72像素/英寸，由于1英寸= 2.54 厘米，所以在设计网页的时候，一般1厘米约为28像素。
[相关资料](http://www.360doc.com/content/13/0327/09/2006953_274183312.shtml)

###2014/06/09更新
<br/>1、需要解决出库单的逐单打印。
<br/>2、已完成备货单、出库单的打印。
<br/>3、还需要物流单的打印，像素厘米的转化和图片导入问题。

###2014/06/10更新
<br/>1、完成图片导入和像素厘米转化问题。
<br/>2、还需要完成物流单的打印。

###2014/06/11更新
<br/>*1、物流单打印需要研究无阻塞打印。
<br/>2、新建图片预定载入图片大小适应、编辑图片动态获取图片大小并适应1.3倍缩放比率、图片上传后缩放比率等物流单据图片的内容的bug已经修复。
<br/>3、全局表格类需要自适应高度，分为auto_container\auto_height\auto\bottom三个部分，auto_height是自适应部分，不得出现竖向滚动条。

###2014/06/12更新
<br/>1、批量批发单还有问题需要修改。
<br/>2、技术瓶颈：window.print()在弹出打印页面后无法进行别的操作，每次加载入打印页面时，需要onload后才能预览完整版，导致无法批量导入打印，目前没有解决办法。打印是阻塞的，在显示后无法继续添加打印服务进程，是整个批量打印的技术瓶颈。

###2014/06/13更新
<br/>1、解决了出库单的批量打印，需要序列化表单来提交。
<br/>2、已完成批量打印的dome，下周一用于实际。
<br/>3、最后只剩下物流单据的打印需求，其余已经全部解决。
