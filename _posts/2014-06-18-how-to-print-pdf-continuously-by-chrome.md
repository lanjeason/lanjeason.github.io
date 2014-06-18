---
date: 2014-06-18 10:54:40(UTC+0800)
layout: post
title: 当后台加载多个pdf至前台自动连续打印 -- chrome版
thread: 18
categories: jsdemo
tags: jsdemo print chrome
---

这是最近做的比较久的一个功能，当后台传递多个数据包组成的pdf至前台时，如果让用户一个一个print是一件相当麻烦的事情，如何做到当加载入一个之后打印完后加载第二个呢？

###1、chrome的打印接口是阻塞的
类似alert之后，后面的代码会暂停是一个道理，并且利用window.print()即可调用print接口。

###2、打印流程
打印必须等到pdf数据呈现完毕才能调用加载，而第一个pdf是不需要等待上一个pdf的打印的，要分开执行。这就需要用到事件监听，下面是一个兼容IE的事件监听函数，之后的例子用的是chrome浏览器，因为还没有测试IE是否可以达到连续打印的效果。

```javascript
function LoadPDF(index) {       
    var iframe = top.document.getElementById("printIframe");
    if(iframe.attachEvent){
        iframe.attachEvent("onreadystatechange", function() {// for IE
            //此事件在内容没有被载入时候也会被触发，所以我们要判断状态
            //有时候会比较怪异 readyState状态会跳过 complete 所以我们loaded状态也要判断
            if (iframe.readyState === "complete" || iframe.readyState == "loaded") {
                //代码能执行到这里说明已经载入成功完毕了
                //要清除掉事件
                // iframe.detachEvent("onreadystatechange", arguments.callee);
            }
        });
    }else{
        iframe.addEventListener("load", function() { // for chrome
            //代码能执行到这里说明已经载入成功完毕了
            // this.removeEventListener("load", arguments.call, false);
            //这里是回调函数                                   
        }, false);
    };
};
```
###3、pdf的呈现原理
用from的submit提交序列化数据并返回后台生成的pdf，需要了解submit可能会打乱整个pdf的打印流程，经过测试，不会影响。

```javascript
function generate_form_and_submit(id_text,addr_text,contact_name_text,conutry_text,memo_text,phone_text,province_text,receiver_address_text,receiver_city_text,receiver_district_text,receiver_mobile_text,receiver_name_text,receiver_state_text,receiver_zip_text,zip_text){
    var url = "/api/taobao_logistic_templates/" + id_text + "?action=generate&format=pdf";
    var form = $("<form>");
    var arry = ["id","addr","contact_name","conutry","memo","phone","province","receiver_address","receiver_city","receiver_district","receiver_mobile","receiver_name","receiver_state","receiver_zip","zip"];
    var arry2 = [id_text,addr_text,contact_name_text,conutry_text,memo_text,phone_text,province_text,receiver_address_text,receiver_city_text,receiver_district_text,receiver_mobile_text,receiver_name_text,receiver_state_text,receiver_zip_text,zip_text];
    form.attr('style', 'display:none');
    form.attr('target', 'test');
    form.attr('method', 'post');
    form.attr('action', url);
    var input1 = $('<input>');
    input1.attr('type', 'hidden');
    input1.attr('name', 'Token');
    input1.attr('value', TokenChild);
    $("#printIframe").append(form);
    form.append(input1);
    for(k = 0 ; k< arry.length ; k++){
        var input = $('<input>');
        input.attr('type','hidden');
        input.attr('name',arry[k]);
        input.attr('value',arry2[k]);
        form.append(input);
    };//循环生成数据
    form.serializeArray();//序列化
    form.submit();
}
```

###全部代码，欢迎补充交流

```html
	<iframe name='test' src="about:blank" id="printIframe2" style="width:100%;height:600px"></iframe>
```

```javascript
var i = 0;
var iframe;
var dataChild;
var TokenChild;
var addr;
var contact_name;
var conutry;
var memo;
var phone;
var province;
var receiver_address;
var receiver_city;
var receiver_district;
var receiver_mobile;
var receiver_name;
var receiver_state;
var receiver_zip;
var zip;
var id;

function pdf_loaded(){
    var frm = iframe.contentWindow;
    frm.print();
    if (i >= (dataChild.logistic_documents.length - 1)){
        // window.close();
        return;
    }
    i += 1;
    addr = dataChild.logistic_documents[i].addr;
    contact_name = dataChild.logistic_documents[i].contact_name;
    conutry = dataChild.logistic_documents[i].conutry;
    memo = dataChild.logistic_documents[i].memo;
    phone = dataChild.logistic_documents[i].phone;
    province = dataChild.logistic_documents[i].province;
    receiver_address = dataChild.logistic_documents[i].receiver_address;
    receiver_city = dataChild.logistic_documents[i].receiver_city;
    receiver_district = dataChild.logistic_documents[i].receiver_district;
    receiver_mobile = dataChild.logistic_documents[i].receiver_mobile;
    receiver_name = dataChild.logistic_documents[i].receiver_name;
    receiver_state = dataChild.logistic_documents[i].receiver_state;
    receiver_zip = dataChild.logistic_documents[i].receiver_zip;
    zip = dataChild.logistic_documents[i].zip;
    id = dataChild.logistic_documents[i].taobao_logistic_template_id;
    generate_form_and_submit(id,addr,contact_name,conutry,memo,phone,province,receiver_address,receiver_city,receiver_district,receiver_mobile,receiver_name,receiver_state,receiver_zip,zip);
}

$(document).ready(function(){
    iframe = document.getElementById('printIframe2');
    iframe.addEventListener('load', pdf_loaded);
    dataChild = window.opener.dataChild;
    TokenChild = window.opener.TokenChild;
    addr = dataChild.logistic_documents[0].addr;
    contact_name = dataChild.logistic_documents[0].contact_name;
    conutry = dataChild.logistic_documents[0].conutry;
    memo = dataChild.logistic_documents[0].memo;
    phone = dataChild.logistic_documents[0].phone;
    province = dataChild.logistic_documents[0].province;
    receiver_address = dataChild.logistic_documents[0].receiver_address;
    receiver_city = dataChild.logistic_documents[0].receiver_city;
    receiver_district = dataChild.logistic_documents[0].receiver_district;
    receiver_mobile = dataChild.logistic_documents[0].receiver_mobile;
    receiver_name = dataChild.logistic_documents[0].receiver_name;
    receiver_state = dataChild.logistic_documents[0].receiver_state;
    receiver_zip = dataChild.logistic_documents[0].receiver_zip;
    zip = dataChild.logistic_documents[0].zip;
    id = dataChild.logistic_documents[0].taobao_logistic_template_id;
    generate_form_and_submit(id,addr,contact_name,conutry,memo,phone,province,receiver_address,receiver_city,receiver_district,receiver_mobile,receiver_name,receiver_state,receiver_zip,zip);    
});

function generate_form_and_submit(id_text,addr_text,contact_name_text,conutry_text,memo_text,phone_text,province_text,receiver_address_text,receiver_city_text,receiver_district_text,receiver_mobile_text,receiver_name_text,receiver_state_text,receiver_zip_text,zip_text){
    var url = "/api/taobao_logistic_templates/" + id_text + "?action=generate&format=pdf";
    var form = $("<form>");
    var arry = ["id","addr","contact_name","conutry","memo","phone","province","receiver_address","receiver_city","receiver_district","receiver_mobile","receiver_name","receiver_state","receiver_zip","zip"];
    var arry2 = [id_text,addr_text,contact_name_text,conutry_text,memo_text,phone_text,province_text,receiver_address_text,receiver_city_text,receiver_district_text,receiver_mobile_text,receiver_name_text,receiver_state_text,receiver_zip_text,zip_text];
    form.attr('style', 'display:none');
    form.attr('target', 'test');
    form.attr('method', 'post');
    form.attr('action', url);
    var input1 = $('<input>');
    input1.attr('type', 'hidden');
    input1.attr('name', 'Token');
    input1.attr('value', TokenChild);
    $("#printIframe").append(form);
    form.append(input1);
    for(k = 0 ; k< arry.length ; k++){
        var input = $('<input>');
        input.attr('type','hidden');
        input.attr('name',arry[k]);
        input.attr('value',arry2[k]);
        form.append(input);
    };
    form.serializeArray();
    form.submit();
}
```
