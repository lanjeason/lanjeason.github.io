---
date: 2014-05-27 10:11:40(UTC+0800)
layout: post
title: 入门Git -- 安装Git
thread: 3
categories: Git
tags: Git
---

想了很久，到底第一篇博文以什么内容为主。不过最基本的，应该还是从版本控制开始，我们暂时简称它为Git吧。
</br>Git是目前世界上最先进的版本控制系统，可以自由控制你的项目版本。但是要值得注意的是它不可以处理二进制文件：如图片、Word等这一类文件。注：部分内容来自互联网。

#安装Git
##在Linux上安装Git
首先，你可以输入git，看看系统是否安装了Git：

```bash
$ git
The program 'git' is currently not installed. You can install it by typing:
sudo apt-get install git
```

像上面的命令，有很多Linux会友好地告诉你Git没有安装，还会告诉你如何安装Git。
</br>如果你碰巧用Debian或Ubuntu Linux，通过一条“sudo apt-get install git”就可以直接完成Git的安装，非常简单。

```bash
sudo apt-get install git
```

##在Mac OS X上安装Git
两种方法：
</br>一、安装homebrew，然后通过homebrew安装Git，具体方法请参考[homebrew](http://brew.sh/)的文档。
</br>二、直接从AppStore安装Xcode，Xcode集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单“Xcode”->“Preferences”，在弹出窗口中找到“Downloads”，选择“Command Line Tools”，点“Install”就可以完成安装了。

##在Windows上安装Git
msysgit是Windows版的Git，从[http://msysgit.github.io/](http://msysgit.github.io/)下载，然后按默认选项安装即可。
</br>安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！
</br>之后还要经过一些配置：

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。