# 前端开发自动化优化工具

- date: 2011-05-19 22:32
- tags: 性能,前端优化,无损压缩,自动化
- category: Performance

----------------

## 一、功能介绍：

该工具用于前端自动化优化，主要有以下功能：

* 压缩css--（yuicompressor）
* js语法检查和压缩--（google-closure-compiler）
* jpg、png、gif无损压缩--（jpegtran、pngout、gifsicle）

目前该工具只有windows版本，linux和mac版本将在后面推出，欢迎大家试用。

## 二、安装与使用：

**安装：**

1、需要安装 JDK >= 1.4, 并设置环境变量 JAVA_HOME

JAVA_HOME配置方法如下:

1. 下载jdk并安装，下载地址：<a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html" target="_blank">http://www.oracle.com/technetwork/java/javase/downloads/index.html</a>
2. 右键点击 我的电脑>属性>高级>环境变量>系统变量
3. 新建变量,变量名JAVA_HOME 路径：C:\Program Files\Java\jdk1.6.0_26 (填写jdk安装路径)
4. 找到path变量,在后面添加路径：;C:\Program Files\Java\jdk1.6.0_26\bin (注意前面有分号）
5. 打开cmd,输入java -version 如果能看到版本信息就说明配置成功了

2、直接解压文件，运行F2E-Auto-Optimization.cmd（请不要放在有空格的目录下面）

**使用：**

根据提示输入项目所在目录，直接按照提示操作。（注意：源代码文件放在项目目录下src文件夹，build目录为优化后的文件，文件结构和src目录结构一致）。

## 三、下载地址：

下载地址：<a href="http://www.wlog.cn/usr/uploads/2011/06/1127265507.rar" title="F2E-Auto-Optimization-for-win">F2E-Auto-Optimization-for-win.rar</a>

项目地址： <a href="https://github.com/bingdian/tools"target="_blank">https://github.com/bingdian/tools</a>
