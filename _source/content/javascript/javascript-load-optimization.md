# Javascript 加载性能优化

- date: 2011-05-29 21:30
- tags: 性能,优化,javascrip,load,loader,labjs,seajs,lazyload
- category: Javascript

----------------

## 阻塞特性

浏览器对javascript的处理主要有2部分：下载和执行

* 下载在有些浏览器中是并行的，有些浏览器中是串行的，如IE8、Firefox3、Chrome2都是串行下载的
* 执行在所有浏览器中默认都是阻塞的，当js在执行时不会进行html解析等其它操作

阻塞特性：

javascript有个阻塞特性，当浏览器执行javascript代码时，不能同时做其它任何事情。无论当前javascript代码是内嵌还是在外链文件中，页面的下载和渲染都必须停下来等待脚本执行完成。浏览器在下载和执行脚本是进出现阻塞的原因在于，脚本可能会改变页面或javascript的命名空间，它们对后面页面内容造成影响。

## 一、脚本位置

浏览器在碰到一个引入外部javascript文件的&lt;script>标签时会停下所有工作来下载并解析执行它，在这个过程中，页面渲染和用户交互完全被阻塞了。例：

	<html>  
	<head>  
		<title>无标题文档</title>  
		<link rel="stylesheet" type="text/css" href="styles.css" />
		<script type="text/javascript" src="file1.js"></script>  
		<script type="text/javascript" src="file2.js"></script>  
		<script type="text/javascript" src="file3.js"></script>  
	</body> 
	</head>  
	<body>  
		<p>页面的内容。。。</p>
	</body>
	</html>

由于脚本的阻塞特性，页面会在3个javascript文件全部下载执行完成后，页面才会继续渲染，把脚本放在页面顶部会导致明显延迟，通常表现为显示空白页，用户无法浏览内容，也无法与页面交互。

ie8+、firefox 3.5+、safari4+、chrome2+都允许并行下载javascript文件，但是在下载的过程中仍然会阻塞图片等其它资源的下载。

由于脚本会阻塞页面其它资源的下载，因此推荐将javasrcipt尽量放到body标签的底部，以减少对整个页面下载的影响。

## 二、组织脚本

由于&lt;script>标签在下载时会阻塞页面的渲染，所以减少&lt;script>标签数量有助于改善这一情况。建议将多个javascript文件合并为一个，这样可以减少性能的消耗。同时也可以减少请求的数量。

参考：[在服务端合并和压缩javascript和CSS文件](http://www.wlog.cn/performance/mergers-compression-javascript-css.html)


## 三、无阻塞脚本

### 1、延迟脚本

HTML4 为&lt;script>标签定义了一个defer 属性，它能使这段代码延迟执行，然而该属性只有IE4+支持，因此它不是一个理想的跨浏览器解决方案。声明了defer 属性的script会在DOM加载完成，window.onload 事件触发前被解析执行：

	<html>  
	<head>  
		<title>script defer example</title>  
	</body> 
	</head>  
	<body>
	<script defer>
		alert('defer');
	</script>
	<script>
		alert('script');
	</script>
	<script>
		window.onload = function(){
			alert('load');
		}
	</script>
	</body>
	</html>

这段代码在支持defer属性的浏览器弹出顺序是：script、defer、load；不支持defer属性的浏览器弹出的顺序是defer、script、load。

### 2、动态脚本元素

	<script type="text/javascript">
	function loadScript(url, callback) {
		var script = document.createElement('script')
		script.type = 'text/javascript';
		
		if (script.readyState) { //for ie
			script.onreadystatechange = function() {
				if (script.readyState == 'loaded' || script.readyState == 'complete') {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else { //other browser
			script.onload = function() {
				callback();
			};
		}
		
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	</script>

loadscript函数用法

	<script type="text/javascript">
		//单个文件
		loadScript('file1.js', function(){
			alert('loaded!');
		});
		
		
		//多个文件
		loadScript('file1.js', function(){
			loadScript('file2.js',function(){
				loadScript('file3.js', function(){
					alert('all files loaded!');
				});
			});
		});
	</script>    

这种技术的重点在于：无论何时启动下载，文件的下载和执行过程不会阻塞页面其它进程，你甚至可以将代码放在页面的head区域而不影响页面的其它部分（下载该文件的http链接除外）。

### 3、XMLHttpRequest 脚本注入

此技术会先创建一个XHR对象，然后用它下载javascript文件，最后创建动态的script元素将代码注入到页面中。

	<script type="text/javascript">
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'file1.js', true);
	xhr.onreadystatechange = function() {
		if (xhr.status >= 200 && xhr.status <300 || xhr.status == 304) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.text = xhr.responseText;
			document.body.appendChild(script);
		}
	};
	xhr.send(null);
	</script>

这种方法优点是可以直接下载javascript代码但不立即执行。由于代码是在&lt;script>标签之外返回的，因此下载后不会自动执行，这使得是可以把脚本推迟到你准备好的时候。这种方法的局限性在于javascript文件必须与所请求的页面处于相同的域，这意味着javascript文件不能从cdn下载，因此不适合大型网站或项目。

## 四、推荐的无阻塞加载方式

### 1、YUI3的方式

### 2、LazyLoad（1.5k）

Yahoo!Search工程师Ryan Grove创建的一个通用的延迟加载工具，是loadScript()函数的增强版。

用法示例:

	<script type="text/javascript" src="lazyload-min.js"></script>
	<script type="text/javascript">
		LazyLoad.js('the-reset.js', function(){
			Application.init();
		});
	</script>

LazyLoad同样支持多个javascript文件，并能保证在所有浏览器中都可以按正确的顺序执行。要加载多个javscript文件，只需要给LazyLoad.js()y方法传入一个url数组：

	<script type="text/javascript" src="lazyload-min.js"></script>
	<script type="text/javascript">
		LazyLoad.js(['first.js', 'the-reset.js'], function(){
			Application.init();
		});
	</script>

项目地址：[https://github.com/rgrove/lazyload](https://github.com/rgrove/lazyload)

### 3、LABjs（4.7k）

LABjs是Kyle Simpson受Steve Sounders的启发实现的无阻塞加载工具。用法示例：

	<script type="text/javascript" src="lab.js"></script>
	<script type="text/javascript">
		$LAB.script('the-reset.js')
			.wait(function(){
				Application.init();
			});
	</script>

$LAB.script()方法用来定义需要下载的javascript文件，$LAB.wait()用来指定文件下载并执行完毕后所调用的函数。

要下载多个javscript文件，只需链式调用另一个$LAB.script()方法：

	<script type="text/javascript" src="lab.js"></script>
	<script type="text/javascript">
		$LAB.script('first.js')
			.script('the-reset.js')
			.wait(function(){
				Application.init();
			});
	</script>

LABjs与众不同的是它管理依赖关系的能力。通常来说，连续的&lt;script>标签意味着文件逐个下载并按顺序执行。

LABjs允许使用wait()方法来指定哪些文件需要等待其它文件。上面的例子中first.js不能保证会在the-reset.js的代码前执行，为了确保这一点，必须在第一个script()方法后调用wait():

	<script type="text/javascript" src="lab.js"></script>
	<script type="text/javascript">
		$LAB.script('first.js').wait()
			.script('the-reset.js')
			.wait(function(){
				Application.init();
			});
	</script>

项目地址：[http://labjs.com/](http://labjs.com/)


### 4、SeaJS（7.5k）

SeaJS 是淘宝玉伯开发的一个遵循 CommonJS 规范的模块加载框架，可用来轻松愉悦地加载任意 javascript 模块。详细请参考：[http://seajs.com/docs/](http://seajs.com/docs/)

### 5、do 框架（3.5k）

Do是豆瓣网kejun开发的一个很轻量的Javascript开发框架。目前do.min.js。它的核心功能是对模块进行组织和加载。加载采取并行异步队列的策略，并且可以控制执行时机。Do可以任意置换核心类库，默认是jQuery。

项目地址：[https://github.com/kejun/Do](https://github.com/kejun/Do)


### 6、RequireJS（13.1k）

项目地址：[http://requirejs.org/](http://requirejs.org/)


