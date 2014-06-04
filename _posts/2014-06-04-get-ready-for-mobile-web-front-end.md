---
date: 2014-06-04 14:23:40(UTC+0800)
layout: post
title: 移动Web前端的准备工作
thread: 16
categories: 移动Web
tags: 移动Web
---

#浏览器
<br/>1.Trident (IE浏览器) 
<br/>2.Gecko:( FireFox )
<br/>3.Webkit: ( Chrome/ Safari / UC )
<br/>4.Presto: ( 欧朋 )
##手机浏览器
<br/>浏览器已经逐渐从传统桌面转向手机端，竞争也越来越激烈。目前国内市场主流的手机浏览器有：UC、百度、欧朋、QQ、海豚、safari、Chrome，这些浏览器都是基于webkit内核的，兼容性方面不存在问题，同时对html5和css3的支持很好，开发可以使用Chrome进行调试。
<br/>因此，所需要的准备是熟悉HTML5+CSS3的基本知识，标签和一些特性。
##分辨率
<br/>手机分辨率比PC分辨率要庞杂得多，各种分辨率有木有？大小差距那么大有木有？这在一定程度上给页面制作带来了不小的麻烦。所以针对这样的因素，必须有充分的考虑。考虑到浏览器自适应，需要设计和制作完成各种不同的方法。
<br/>1) 市场上主流手机生产商的产品分辨率。经过调研发现，目前主流的手机分辨率为：480*800像素、320*480像素，而1280*720像素（720P）会是接下来的趋势。这些都是很粗略的统计，要有精确的数据需要花费不少的精力，那是数据分析人员的工作。
<br/>2) 项目目标群所持设备的分辨率。项目目标群即用户，用户拥有什么样的手机分辨率，从一定程度上来说比第一点来得更加重要，它决定着项目开发的方向。
##响应式Web开发
响应式web开发不是一项开创性的技术变革，简单地说，响应式web设计采用了媒体查询、流式布局、液态图片三项技术，把它们组合在一起来制作页面，使得页面不只在传统桌面，在平板电脑和手机上，各种不同的分辨率都能够完美显示。

#移动端需要注意的
##特殊的meta标签
因为现在我们用的智能手机（iOS，Android）的浏览器都是基于webkit内核，这里有一些针对webkit的特殊meta标签，在开发移动端web是起到很重要的作用。

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
```

<br/>强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览。

```html
<meta content="yes" name="apple-mobile-web-app-capable" />
```

<br/>iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览。

```html
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
```

<br/>iphone的私有标签，它指定的iphone中safari顶端的状态条的样式。

```html
<meta content="telephone=no" name="format-detection" />
```

<br/>告诉设备忽略将页面中的数字识别为电话号码。

```html
<meta content="email=no" name="format-detection" />
```

<br/>Android中禁止自动识别页面中的邮件地址，iOS中不会自动识别邮件地址。

##百分百布局
拿到设计师的640px（以iPhone4的比例做的设计稿）的设计稿后，它的实际大小应该是减半的，所以在写代码时一切的高度／字号都要是设计稿的1/2。接着说百分比布局：
在做移动web页面时，我们要用百分比布局来实现自适应屏幕宽度。那我想要一个元素100%显示，又必须有一个固定的padding-left／padding-right，还有1px的边框，怎么办？css3为我们提供了box-sizing属性：

```css
element{
    width: 100%;
    padding-left: 10px;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    border: 1px solid blue;
}
```

##rem设置字体大小
以根节点为准，不会变动

##一般效果
圆角

```css
element{
    border: 1px solid blue;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
}
```

渐变

```css
element{
    background-image: -moz-linear-gradient(top, #2288cc, #389de2); /* Firefox */
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #389de2), color-stop(1, #2288cc)); /* Saf4+, Chrome */
}
```

去掉手持设备点击时出现的透明层 （一般会在头部做格式化）

```css
a,button,input{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent; /* For some Androids */
}
```

改变盒子模型

```css
element{
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
}
```

未完待续。。。