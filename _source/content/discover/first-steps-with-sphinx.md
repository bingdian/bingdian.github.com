# sphinx使用及其简单配置

- date: 2011-03-25 23:10
- tags: sphinx
- category: Discover

----------------

## 一、sphinx使用

进入你要创建文档的目录，例如要创建在目录/home/wwwroot/doc下


	cd /home/wwwroot/doc

开始使用向导创建你的文档项目

	sphinx-quickstart

程序会提示输入一些选项，如输入根目录,大部分使用默认选项，直接按回车即可。

	Enter the root path for documentation.
	> Root path for the documentation [.]:
	//输入跟目录，直接回车
	
	You have two options for placing the build directory for Sphinx output.
	Either, you use a directory "_build" within the root path, or you separate
	"source" and "build" directories within the root path.
	> Separate source and build directories (y/N) [n]:
	//是否分离source和build目录，建议选y,方便管理
	
	Inside the root directory, two more directories will be created; "_templates"
	for custom HTML templates and "_static" for custom stylesheets and other static
	files. You can enter another prefix (such as ".") to replace the underscore.
	> Name prefix for templates and static dir [_]:
	//直接回车
	
	The project name will occur in several places in the built documentation.
	> Project name: F2E Cookbook
	> Author name(s): imbingdian
	//输入项目名称
	//输入作者名称
	
	The file name suffix for source files. Commonly, this is either ".txt"
	or ".rst".  Only files with this suffix are considered documents.
	> Source file suffix [.rst]: .txt
	//档文件的扩展名，默认是.rst
	
	//后面的操作基本回车就好

完成后可以看到doc文件中生了以下目录文件

	build--生成文档目录
	source--源文件目录
	make.bat 
	makefile 

生成html文档

	make html

看一下build目录下是不是生成了html文档了?

^_^ enjoy it!


## 二、sphinx简单配置

source目录下的conf.py文件为sphinx的配置文件。

### 1）修改文档语言为中文：

找到#language = None，修改为：language ='zh_CN'，其它语言见下表

	bn – Bengali
	ca – Catalan
	cs – Czech
	da – Danish
	de – German
	en – English
	es – Spanish
	fi – Finnish
	fr – French
	hr – Croatian
	it – Italian
	ja – Japanese
	lt – Lithuanian
	nl – Dutch
	pl – Polish
	pt_BR – Brazilian Portuguese
	ru – Russian
	sl – Slovenian
	tr – Turkish
	uk_UA – Ukrainian
	zh_CN – Simplified Chinese
	zh_TW – Traditional Chinese

### 设置主题

找到html_theme = 'default'，修改default即可。目前官方提供的主题见<a href="http://sphinx.pocoo.org/theming.html#builtin-themes" target="_blank">http://sphinx.pocoo.org/theming.html#builtin-themes</a>

### 其它

还其它更多设置，具体请参考<a href="http://sphinx.pocoo.org/contents.html" target="_blank">官方文档</a>。

设置好以后，重新make html即可。

## 扩展阅读：

* [http://sphinx.pocoo.org/contents.html" target="_blank">http://sphinx.pocoo.org/contents.html](http://sphinx.pocoo.org/contents.html" target="_blank">http://sphinx.pocoo.org/contents.html)

