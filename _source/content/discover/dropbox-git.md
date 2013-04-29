# Dropbox 做私有 Git 服务器

- date: 2012-12-06 12:00
- tags: git,dropbox,共享
- category: Discover

使用Dropbox 做私有 Git 服务器，实现多人协作

----------------

原理：在dropbox中建立git仓库，然后共享文件夹，从而实现多人协作。例如我们要在Dropbox/project/目录下建立demo.git项目：

一、在Dropbox的文件夹下创建远程repository文件夹(.git后缀)，

	cd ~/Dropbox/project
	mkdir demo.git


二、进入demo.git文件夹并初始化repository


	cd demo.git
	git init --bare


三、创建完毕，现在创建一份本地clone，如要创建在～/lab/demo/目录下

	cd ~/lab/
	git clone  ～/Dropbox/project/demo.git demo

四、测试git

	cd demo
	touch README
	git add README
	git commit -m "fisrt commit"
	git push origin master

五、共享/Dropbox/project/demo.git文件夹，其他指定用户同步后，本地clone git项目。


enJoy it!