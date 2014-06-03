---
date: 2014-05-28 10:01:40(UTC+0800)
layout: post
title: 入门Git -- 版本切换
thread: 7
categories: Git
tags: Git
---

之前已经说了如何创建本地仓库，上传文件并建立版本库。但是如果已经在创建很多个版本库的前提下，需要回到过去的版本，那么就要用到版本切换的代码了，并且切换版本后，代码也跟着恢复到此版本的状态哦。

##查看当前仓库的状态
目前看来，仓库有3种状态，分别如下：

```bash
$ git status 
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#    modified:   git.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
```

说明版本库中git.txt文件已经修改，但是没有add至缓存区。

```bash
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   readme.txt
#
```

说明版本库中git.txt文件已经修改，已经add，但是没有commit正式提交

```bash
$ git status
# On branch master
nothing to commit (working directory clean)
```

说明已经正确建立了一个本地版本

##查看版本之间的修改区别
查看工作区和暂存区的区别

```bash
$ git diff readme.txt 
diff --git a/readme.txt b/readme.txt
index 46d49bf..9247db6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed version control system.
 Git is free software.
```

查看工作区和版本库里面最新版本的区别

```bash
$ git diff HEAD -- readme.txt 
diff --git a/readme.txt b/readme.txt
index 76d770f..a9c5755 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,4 +1,4 @@
 Git is a distributed version control system.
 Git is free software distributed under the GPL.
 Git has a mutable index called stage.
-Git tracks changes.
+Git tracks changes of files.
```

##版本切换
详细查看版本提交日志

```bash
$ git log
commit 3628164fb26d48395383f8f31179f24e0882e1e0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Tue Aug 20 15:11:49 2013 +0800
```

简单查看版本提交日志(注意版本号的前7位，作为版本切换之用)

```bash
$ git log --pretty=oneline
3628164fb26d48395383f8f31179f24e0882e1e0 append GPL
ea34578d5496d7dd233c827ed32a8cd576c5ee85 add distributed
cb926e7ea50ad11b8f9e909c05226233bf755030 wrote a readme file
```

查看所有提交日志，因为之前的两个代码只能查看当前版本开始之前的各个版本，如果切换至原来的某个版本，逻辑上在此之后的版本不会显示，需要通过如下代码，查看所有提交的版本，切换更为方便：

```bash
$ git reflog
ea34578 HEAD@{0}: reset: moving to HEAD^
3628164 HEAD@{1}: commit: append GPL
ea34578 HEAD@{2}: commit: add distributed
cb926e7 HEAD@{3}: commit (initial): wrote a readme file
```

返回上一个版本

```bash
$ git reset --hard HEAD^
HEAD is now at ea34578 add distributed
```

返回指定版本

```bash
$ git reset --hard 3628164
HEAD is now at 3628164 append GPL
```
