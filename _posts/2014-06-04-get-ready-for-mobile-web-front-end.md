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

未完待续。。。