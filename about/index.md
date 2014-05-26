---
title: 关于
layout: page
comments: no
---

{{ site.about }}

----

###联系方式：

{% if site.qq %}
ＱＱ：[{{ site.qq }}](tencent://message/?uin={{ site.qq }})
{% endif %}
网站：[{{ site.name }}]({{ site.url }})

邮箱：[{{ site.email }}](mailto:{{ site.email }})

GitHub : [http://github.com/{{ site.github }}](http://github.com/{{ site.github }})

----


[![新浪微博](http://tp4.sinaimg.cn/1988277875/180/40027281562/1)](http://weibo.com/u/{{ site.weibo }})
