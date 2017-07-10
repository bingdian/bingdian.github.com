# 搭建通过 ssh 访问的 Git 服务器

- date: 2014-01-10 22:55
- tags: git,版本控制,ssh,debian,linux
- category: Soft
----------------

##  一、Git - 协议

Git 可以使用四种主要的协议来传输数据：本地传输，ssh 协议，Git 协议和 HTTP 协议。

Git 使用的传输协议中最常见的就是 ssh 了。大多数环境已经支持通过 ssh 对服务器的访问 ，ssh 也是唯一一个同时支持读写操作的网络协议。另外两个网络协议（HTTP 和 Git）通常都是只读的。ssh 同时也是一个验证授权的网络协议；而因为其普遍性，一般架设和使用都很容易。

本文主要介绍如何搭建 ssh 协议的 Git 服务器。

## 二、在服务器上部署 Git

首先，你需要一台 Linux 器并且拥有 sudo 权限，本文使用的是 Debian 7.0 x32 。下面就开始安装：

### 2.1 第一步，安装 git ：

    $ sudo apt-get install git
    
### 2.2 第二步，创建一个 git 用户，用来运行 git 服务：

    $ sudo adduser git
    
### 2.3 第三步，设置访问权限：

有几个办法可以让团队的每个成员都有访问权：

1. 给每个人建立一个账户。反复使用 adduser 并给所有人设定临时密码比较麻烦。
2. 在服务器上建立一个 Git 账户，让每个需要写权限的人发送一个 ssh 公钥，然后将其加入 Git 账户的 ~/.ssh/authorized_keys 文件。这样，所有人都将通过 Git 账户访问主机。
3. 另一个办法是让 ssh 服务器通过某个 LDAP 服务，或者其他已经设定好的集中授权机制，来进行授权。

这里我们使用第二种方法，收集所有需要登录该 Git 服务器用户的公钥，就是他们自己的 id_rsa.pub 文件，把所有公钥导入到 /home/git/.ssh/authorized_keys 文件里，每行一个。（注意：/home/git/.ssh/authorized_keys 这个文件的 owner 为 Git ，如果不是请使用 chown 命令修改）。

下面是创建公钥命令：

	$ ssh-keygen -t rsa -C  'your email@domain.com'
	
-t 指定密钥类型，默认即 rsa ，可以省略

-C 设置注释文字，比如你的邮箱
	
关于创建公钥的详细信息，可以参考 [http://github.com/guides/providing-your-ssh-key](http://github.com/guides/providing-your-ssh-key)。


### 2.4 第四步，禁用 shell 登录：

出于安全考虑，你可以用 Git 自带的 git-shell 工具限制 git 用户的活动范围。这可以通过编辑 /etc/passwd 文件完成。找到类似下面的一行：

把 bin/sh 改为 /usr/bin/git-shell （或者用 which git-shell 查看它的实际安装路径）

    git:x:1003:1003:,,,:/home/git:/bin/bash
    
改为：

    git:x:1003:1003:,,,:/home/git:/usr/bin/git-shell
   
现在 git 用户只能用 ssh 连接来推送和获取 Git 仓库，而不能直接使用服务器的 shell。尝试普通 ssh 登录的话，会被拒绝登录。


### 2.5 第五步，初始化Git仓库：

选定一个目录作为 Git 仓库，如 /home/git/project.git ，在 /home/git/ 目录下输入命令：

    $ sudo git init --bare project.git
    
Git 会创建一个裸仓库，裸仓库没有工作区，因为服务器上的 Git 仓库是为了共享，所以不让用户直接登录到服务器上去改工作区，并且服务器上的 Git 仓库通常都以 .git 结尾。然后，把 project.git 的 owner 改为 git ：

    $ sudo chown -R git:git project.git
    

### 2.6 第六步，克隆远程仓库：

ssh 指定私钥的配置管理，为本地添加 ssh 别名，编辑 ~/.ssh/config ，如果没有该文件，创建一个:

	$ vi ~/.ssh/config
	
在 config 中添加：

	# 注释说明
	Host 别名
	HostName  域名或 ip
	User 登陆服务器用的账号
	Port 端口号(默认22，可以不填，如果服务器修改了 ssh 登录端口号，此处需要修改)
	IdentityFile 密钥文件的位置

例如设置为:

	# bingdian's git server
	Host gitserver
	HostName 162.188.23.33
	User git
	Port 9000
	IdentityFile ~/.ssh/server_rsa

现在，可以通过 git clone 命令克隆远程仓库了：

	$ git clone ssh://git@gitserver:/home/git/project.git

接下来你就可以享受你的 Git 之旅了。

## 扩展阅读

* [http://git-scm.com/book/zh/服务器上的-Git-协议](http://git-scm.com/book/zh/服务器上的-Git-协议)
* [Custom identity file (id_rsa.pub) with git client](http://dracoblue.net/dev/custom-identity-file-idrsapub-with-git-client/)
* [Git config for mutiply ssh keys](http://84kids.com/git-config-for-mutiply-ssh-keys/)