---
date: 2014-05-28 15:00:40
layout: post
title: 入门Git -- 本地仓库推送至远程仓库
thread: 10
categories: Git
tags: Git
---

##一
创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

```bash
$ ssh-keygen -t rsa -C "youremail@example.com"
```

##二
登陆GitHub，打开“Account settings”，“SSH Keys”页面，然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容

##三
在github上新建一个仓库，关联远程仓库

```bash
$ git remote add origin git@github.com:lanjeason/xxx.git
```

##四
把本地库的内容推送到远程，实际上是把当前分支master推送到远程，我们第一次推送master分支时，加上了-u参数

```bash
$ git push -u origin master
Counting objects: 19, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (19/19), done.
Writing objects: 100% (19/19), 13.73 KiB, done.
Total 23 (delta 6), reused 0 (delta 0)
To git@github.com:michaelliao/xxx.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.
```

之后就用此条推送

```bash
$ git push origin master
```
