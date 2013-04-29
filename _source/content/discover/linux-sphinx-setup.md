# linux下安装Sphinx- Python documentation

- date: 2011-03-25 22:12
- tags: linux,sphinx,setup
- category: Discover

----------------

## 一、什么是Sphinx？

Sphinx 是种令人可以轻松撰写出明智/优美的文档工具, 由 Georg Brandl 在BSD 许可证下创造.

Sphinx 已在支持是 the 新版Python 文档的生成, 也成为Python项目首选的文档工具,同时也对 C/C++ 工程有很好的支持; 进一步的,也将对其它开发语言进行特殊支持. 当然,本站就是使用 Sphnix 从新结构化文本中架构而成!

Sphnix还在继续开发. 下列特性工作良好,并在Python官方文档中有“体现”:

* 丰富的输出格式: HTML (包括M$帮助), LaTeX (为PDF输出), manual pages(man), 纯文本
* 完备的交叉引用: 语义化的标签,并对 函式,类,引文,术语以及类似片段消息可以自动化链接
* 明晰的分层结构: 轻松定义文档树,并自动化链接同级/父级/下级文章
* 美观的自动索引: 可自动生成美观的模块索引
* 精确的语法高亮: 基于 Pygments 自动生成语法高亮
* 开放的扩展: 支持代码块的自动测试,自动包含Python 的模块自述文档,等等
* Sphinx 使用新结构化文本 作为标记语言,因而直接享受了来自Docutils 为 reStructuredText 提供的多种工具和能力!

## 二、安装Sphinx

本次测试安装环境：debian5

### 1）安装python

python：[http://www.python.org/download/](http://www.python.org/download/)

### 2）安装setuptools</h4>

[setuptools下载地址](http://pypi.python.org/pypi/setuptools#downloads)

windows安装方法：

直接下载对应python版本的setuptools exe安装文件，安装即可[http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20](http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20)

Mac OS X, Linux安装方法：

下载对应版本setuptools文件，我的python版本是2.6.6

	wget http://pypi.python.org/packages/2.6/s/setuptools/setuptools-0.6c11-py2.6.egg#md5=bfa92100bd772d5a213eedd356d64086

安装setuptools

	sh setuptools-0.6c11-py2.6.egg

现在就可以使用easy_install命令了。

### 3）安装Sphinx

	easy_install -U Sphinx

安装完成，enjoy it!

## 扩展阅读：

[http://sphinx.pocoo.org/](http://sphinx.pocoo.org/)
[http://zoomquiet.org/sphnix_zh/](http://zoomquiet.org/sphnix_zh/)
