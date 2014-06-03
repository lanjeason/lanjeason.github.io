---
date: 2014-05-28 15:00:40(UTC+0800)
layout: post
title: 入门Git -- 撤销修改
thread: 9
categories: Git
tags: Git
---

```bash
$ git checkout -- readme.txt
```

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
<br/>
一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
<br/>
总之，就是让这个文件回到最近一次git commit或git add时的状态。