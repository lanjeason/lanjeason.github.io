---
date: 2014-05-27 10:37:40(UTC+0800)
layout: post
title: 入门Git -- 创建本地版本库
thread: 4
categories: Git
tags: Git
---

一、在本地新建一个文件夹为你的逻辑版本库。
<br/>二、双击进入文件夹，点击右键选择Git Bash Here，即可操作Git，输入如下内容即可将文件夹设置成新的版本库。

```bash
$ git init
```

当然如果你用的是Linux系统，可以通过cd来自由切换文件夹路径，注意一定要进入该文件夹哦。
<br/>三、此时在本地创建一个新的文件test.txt，即在版本库中多了一个文件需要缓存。

```bash
$ git add test.txt
```

该代码即可将test.txt文件加入到版本库缓存区，随后，

```bash
$ git commit -m "This is the first file to your git."
```

即可上传至版本库中，默认的分支为master，之后会介绍分支的概念。
<br/>如果之前add文件很多，$git commit -m 是将之前所有的add全部上传。