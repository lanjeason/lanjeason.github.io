---
date: 2014-05-28 14:04:40(UTC+0800)
layout: post
title: 入门Git -- 工作区和暂存区
thread: 8
categories: Git
tags: Git
---

工作区（Working Directory）：就是你在电脑里能看到的目录。
<br/>
版本库（Repository）：工作区有一个隐藏目录“.git”，这个不算工作区，而是Git的版本库。
Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。
<br/>
![](/imgs/20140528001.jpg)
<br/>
第一步是用“git add”把文件添加进去，实际上就是把文件修改添加到暂存区。
![](/imgs/20140528002.jpg)
<br/>
第二步是用“git commit”提交更改，实际上就是把暂存区的所有内容提交到当前分支。
![](/imgs/20140528003.jpg)
<br/>
需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。