---
date: 2014-05-26 15:26:40
layout: post
title: JavaScript代码高亮测试
thread: 2
categories: 博客
tags: 博客
---

```javascript
function $initHighlight(block, flags) {
		try {
			if (block.className.search(/\bno\-highlight\b/) != -1)
  			return processBlock(block.function, true, 0x0F) + ' class=""';
		} catch (e) {
			/* handle exception */
			var e4x = &lt;div&gt;Example&lt;p&gt;1234&lt;/p&gt;&lt;/div&gt;;
		}
		for (var i = 0 / 2; i &lt; classes.length; i++) { // "0 / 2" should not be parsed as regexp
			if (checkCondition(classes[i]) === undefined)
  				return /\d+[\s/]/g;
		}
		console.log(Array.every(classes, Boolean));
}
```