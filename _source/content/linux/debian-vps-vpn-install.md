# Debian vps下 PPTP VPN 安装笔记

- date: 2011-11-21 22:28
- tags: linux,debian,vpn,pptp
- category: Discover

Debian vps下 PPTP VPN 安装笔记

----------------

## 一、安装环境检测

下面介绍两种检测方法，只要符合其中的一条就可以安装

	zgrep MPPE /proc/config.gz  


返回 CONFIG_PPP_MPPE=y

	cat /dev/net/tun

返回 cat: /dev/net/tun: File descriptor in bad state

## 二、安装pptp

	apt-get update
	apt-get install pptpd
	apt-get install ppp
	apt-get install iptables


## 三、配置PPTP服务器</h3>

1）编辑/etc/pptpd.conf

查找：

	#remoteip 192.168.0.234-238,192.168.0.245
	# or
	#localip 192.168.0.234-238,192.168.0.245


后面添加如下内容：

	llocalip 192.168.217.1
	remoteip 192.168.217.234-238,192.168.217.245


注：此处的remoteip指定的IP范围是用来给远程连接使用的。如果您远程访问VPN，VPN就会在remoteip范围内分配一个ip地址给你。localip的值直接影响到后面要说的iptables转发规则的编写，所以建议不要随意改动

2）添加PPTP VPN用户

编辑/etc/ppp/chap-secrets 添加如下内容：

	username pptpd password *


根据您的需要添加账号，每行一个。格式：“用户名 pptp 密码 ip地址”，中间用空格隔开。

3）修改DNS服务器

编辑/etc/ppp/options，添加如下内容：

	ms-dns 8.8.8.8
	ms-dns 8.8.4.4

4）修改内核设置，使其支持转发。

编辑/etc/sysctl.conf

将：

	#net.ipv4.ip_forward=1

改成：

	net.ipv4.ip_forward=1

将

	net.ipv4.tcp_syncookies = 1

改成

	#net.ipv4.tcp_syncookies = 1

保存关闭后，执行以下命令使修改后的内核生效

	sysctl -p

5）添加iptables转发规则

以下两条命令分别对应OpenVZ架构和XEN架构的VPS。

适合于OpenVZ架构的VPS,12.34.56.78为您VPS的公网IP地址

	iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -j SNAT --to-source 12.34.56.78

适合于XEN架构的VPS

	iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE

添加好规则后保存并重启iptables

	/etc/init.d/iptables save 
	/etc/init.d/iptables restart

在/etc/network/if-up.d/目录下创建iptables文件，内容如下：

	#!/bin/sh
	iptables-restore < /etc/iptables.pptp

给脚本添加执行权限：

	chmod +x /etc/network/if-up.d/iptables

6）重启pptp服务

	/etc/init.d/pptpd restart

7）设置pptp和iptables随系统启动

	chkconfig pptpd on 
	chkconfig iptables on

如果出现错误619则输入命令

	mknod /dev/ppp c 108 0

ok,enjoy it!