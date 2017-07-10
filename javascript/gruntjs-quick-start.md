# Grunt 使用说明

- date: 2013-03-12 21:33
- tags: javascript,自动化,构建
- category: Javascript

----------------

[Gruntjs](http://gruntjs.com/)是一款基于nodejs的javascript项目的自动化构建工具。很多知名的开源项目都在使用，如：jquery、yui、qunit、angular.js、CanJS、Modernizr等。

## 一、安装nodejs ##

http://nodejs.org/#download

## 如果以前全局安装过grunt 0.3x，执行以下命令 ##

	npm uninstall -g grunt

## 二、安装grunt-cli ##
	npm install -g grunt-cli
	
## 三、安装templates ##

	//clone the template inside of the ~/.grunt-init/ directory.
	//http://gruntjs.com/project-scaffolding#installing-templates
	git clone https://github.com/gruntjs/grunt-init-jquery.git ~/.grunt-init/jquery
	git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile
		

## 四、已经存在的grunt项目 ##

### 安装插件 ###
	
如果有配置文件package.json，执行npm install可以安装项目依赖的Grunt插件

	npm install	

或者直接通过官网http://gruntjs.com/plugins安装插件

### 使用 ###

	grunt//执行默认命令
		

## 五、新建grunt项目 ##

### 创建项目 ###

	mkdir project
	grunt-init template //如grunt-init gruntfile

### 当前项目下安装grunt ###

	npm install grunt --save-dev
	

### package.json ###

可以在这个文件中配置项目依赖的Grunt插件

### 配置Gruntfile ###

文件名为Gruntfile.js或Gruntfile.coffee，在这个文件中配置各种构建任务及其加载任务所需要的插件。

### 安装插件 ###

如果有配置文件package.json，执行npm install可以安装项目依赖的Grunt插件

	npm install	

或者直接通过官网http://gruntjs.com/plugins安装插件


### 使用 ###

	grunt//执行默认命令，也可以使用
	

## 六、前端开发推荐插件 ##

grunt-contrib-clean

	npm install grunt-contrib-clean --save-dev

grunt-contrib-concat

	npm install grunt-contrib-concat --save-dev

grunt-yui-compressor

	npm install grunt-yui-compressor

grunt-contrib-csslint

	npm install grunt-contrib-csslint --save-dev


grunt-contrib-jshint

	npm install grunt-contrib-jshint --save-dev

grunt-contrib-qunit

	npm install grunt-contrib-qunit --save-dev
	
grunt-contrib-copy

	npm install grunt-contrib-copy --save-dev

grunt-contrib-uglify

	npm install grunt-contrib-uglify --save-dev

grunt-imagine
	npm install grunt-imagine

grunt-contrib-imagemin

	npm install grunt-contrib-imagemin --save-dev

grunt-asset-revisions
	
	npm install grunt-asset-revisions

grunt-assets-revving
	
	npm install grunt-assets-revving


