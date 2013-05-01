# git学习笔记

- date: 2011-06-18 22:32
- tags: git,版本控制,学习笔记
- category: Soft
----------------

Git --- The stupid content tracker。

用途：版本控制

流程：取代码 → 每次工作前更新代码到最新版本 → 修改代码 → 提交代码到服务器

git下载地址：<a href="http://git-scm.com/download" target="_blank">http://git-scm.com/download</a> （有win、linux、mac对应版本）

## 一、git设置

设置用户名与邮箱

	git config --global user.name "My Name"
	git config --global user.email "my@email.com"


上面设置命令中带了“--global"参数，是全局配置，影响本机上所有的git项目。也可以对一些单独的项目进行设置，进入要设置的项目目录，进行设置：

	cd dir
	git config user.name "My Name"
	git config user.email "my@email.com"


查看配置：

	cat .git/config

## 二、创建git仓库及获取代码

创建git仓库：
	
	mkdir project
	cd project
	git init #在当前的目录下建一个仓库

从已有的git仓库中提取代码:

	git clone git@server:app.git myrepo

## 三、更改代码的操作

更新本地代码到最新版本（需要merge才能合到本地代码中）:

	git fetch

合并更新后的代码到本地:

	git merge

更新代码方式的另一种方法(git pull是git fetch和git merge命令的一个组合):

	git pull

修改代码后，查看已修改的内容:

	git diff --cached

将新增加文件加入到git中:

	git add file1 file2 file3

所有文件全部加入到git中:

	git add .

从git中删除文件:

	git rm file1
	git rm -r dir1

提交修改:
	
	git commit -m 'this is memo'

如果想省掉提交之前的 git add 命令，可以直接用:

	git commit -a -m 'this is memo'

    commit和commit -a的区别, commit -a相当于：
    第一步：自动地add所有改动的代码，使得所有的开发代码都列于index file中
    第二步：自动地删除那些在index file中但不在工作树中的文件
    第三步：执行commit命令来提交

提交所有修改到远程服务器，这样，其它团队成员才能更新到这些修改
	
	git push

## 四、git 分支（branch）操作

创建dev分支：

	git branch dev

查看项目仓库中有几个分支：

	git branch

	//*号为当前所在分支
	  dev
	* master

分支切换：

	//切换到dev分支
	git checkout dev

查看master分支和dev分支差异：

	git diff dev

合并dev分支到master分支(如果合并发生冲突，需要自己解决冲突)：

	git merge branchname

解决冲突：

    当merge命令自身无法解决冲突的时候，它会将工作树置于一种特殊的状态，并且给用户提供冲突信息，以期用户可以自己解决这些问题。当然在这个时候，未发生冲突的代码已经被git merge登记在了index file里了。如果你这个时候使用git diff，显示出来的只是发生冲突的代码信息。

    在你解决了冲突之前，发生冲突的文件会一直在index file中被标记出来。这个时候，如果你使用git commit提交的话，git会提示：filename.txt needs merge

    在发生冲突的时候，如果你使用git status命令，那么会显示出发生冲突的具体信息。

在你解决了冲突之后，你可以使用如下步骤来提交：

第一步(如果需要增加文件)：

	git add file1

第二步：

	git commit

删除dev分支：

	git branch -d dev

如果要删除的分支没有被合并到其它分支中去，那么就不能用“git branch -d”来删除它，需要改用“git branch -D”来强制删除。

## 五、打标签

git可以对某一时间点上的版本打上标签。如在发布某个软件版本（比如 v0.1等），可以打版本标签。

列出已有的标签：

	git tag

打标签

	git tag -a v0.1 -m 'tag version 0.1'

## 六、其它常用命令

显示commit日志：

	git log

不仅显示commit日志，而且同时显示每次commit的代码改变：

	git log -p

查看当前仓库的状态：

	git status

回滚代码：

	git revert HEAD

你也可以revert更早的commit，例如：

	git revert HEAD^

销毁自己的修改

	git reset --hard


查看最新版本和上一个版本的差异(一个^表示向前推进一个版本)

	git diff HEAD HEAD^

git取消已经缓存的文件(慎用)：

	git reset

git恢复删除了的文件，git pull 从git服务器取出，并且和本地修改merge， 类似于SVN up，但是对删除的文件不管用，恢复删除文件用

	git checkout -f

## 七、githubb备忘

	Global setup:
	  Download and install Git
	  git config --global user.name "imbingdian"
	  git config --global user.email imbingdian@gmail.com
			
	Next steps:
	  mkdir projectname
	  cd projectname
	  git init
	  touch README
	  git add README
	  git commit -m 'first commit'
	  git remote add origin git@github.com:bingdian/projectname.git
	  git push -u origin master
		  
	Existing Git Repo?
	  cd existing_git_repo
	  git remote add origin git@github.com:bingdian/projectname.git
	  git push -u origin master


<a href="http://www.wlog.cn/usr/uploads/2011/07/2671512346.png" title="git.png" target="blank">Git 常用命令图示</a>--来源：<a href="http://www.cnblogs.com/1-2-3/archive/2010/07/18/git-commands.html" target="blank">http://www.cnblogs.com/1-2-3/archive/2010/07/18/git-commands.html</a>

## 扩展阅读：

* [Git 中文教程](http://www.linuxsir.org/main/doc/git/gittutorcn.htm)
* [Pro Git professional version control](http://progit.org/book/zh/)
* [Hosting Git repositories, The Easy (and Secure) Way)](http://scie.nti.st/2007/11/14/hosting-git-repositories-the-easy-and-secure-way)
