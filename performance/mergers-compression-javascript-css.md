# [转]在服务端合并和压缩JavaScript和CSS文件

- date: 2011-02-07 21:11
- tags: 优化,压缩,css,javascript,合并,minify
- category: Performance

----------------

Web性能优化最佳实践中最重要的一条是减少HTTP请求，它也是YSlow中比重最大的一条规则。减少HTTP请求的方案主要有合并JavaScript和CSS文件、CSS Sprites、图像映射（Image Map）和使用Data URI来编码图片。CSS Sprites和图像映射现在已经随处可见了，但由于IE6和IE7不支持Data URI以及性能问题，这项技术尚未大量使用。目前大部分网页中的JavaScript和CSS文件数量和开发时一致，少量的网页会根据实际情况采取本地合并，这些合并中相当多的是有选择地手动完成，每次新的合并都需要重新在本地完成并上传到服务器，比较的随意和繁琐，同样文件的压缩也有类似的情况。而利用服务端的合并和压缩，我们就可以按照开发的逻辑尽可能让文件的颗粒度变小，利用网页中URL的规则来自动实现文件的合并和压缩，这会相当的灵活和高效。


## 一、YUI Combo Handler

[2008年7月YUI Team宣布在YAHOO! CDN上对YUI JavaScript组件提供Combo Handler服务](http://www.yuiblog.com/blog/2008/07/16/combohandler/)。
Combo Handler是Yahoo!开发的一个Apache模块，它实现了开发人员简单方便地通过URL来合并JavaScript和CSS文件，从而大大减少文件请求数。比如在页面上使用[YUI2的Rich Text Editor组件](http://developer.yahoo.com/yui/editor/)>需要引入多个JavaScript文件，常用方式如下：

	<script src="http://yui.yahooapis.com/2.8.0r4/build/yahoo-dom-event/
	yahoo-dom-event.js"></script>
	<script src="http://yui.yahooapis.com/2.8.0r4/build/container/
	container_core-min.js"></script>
	<script src="http://yui.yahooapis.com/2.8.0r4/build/menu/menu-min.js"></script>
	<script src="http://yui.yahooapis.com/2.8.0r4/build/element/element-min.js"></script>
	<script src="http://yui.yahooapis.com/2.8.0r4/build/button/button-min.js"></script>
	<script src="http://yui.yahooapis.com/2.8.0r4/build/editor/editor-min.js"></script>

而使用Combo Handler服务之后，则上述的代码可以写为：


	<script src="http://yui.yahooapis.com/combo?
	2.8.0r4/build/yahoo-dom-event/yahoo-dom-event.js&
	2.8.0r4/build/container/container_core-min.js&
	2.8.0r4/build/menu/menu-min.js&
	2.8.0r4/build/element/element-min.js&
	2.8.0r4/build/button/button-min.js&
	2.8.0r4/build/editor/editor-min.js"></script>

除了代码的可读性稍稍有一点点降低外，使用Combo Handler服务大大的降低了HTTP请求数，同时也减少了URL代码量，这对于Web性能优化来讲至关重要。所以，随后YUI从2.6.0开始，[其核心组件YUI Loader内置了Combo Handling功能](http://yuiblog.com/blog/2008/10/17/loading-yui/)，即使用YUI Loader时，通过配置combine属性就可以把要加载的多个JavaScript或CSS文件按照使用Combo Handler服务的形式合并起来，这时只要静态文件的服务器支持Combo Handler就行了。在YUI中当combine配置为true时，CDN默认是使用Yahoo! CDN（http://yui.yahooapis.com），所以没有任何问题。这正是YUI最迷人的地方之一。

遗憾的是http://yui.yahooapis.com在中国的速度并不佳，本来中国雅虎提供了http://cn.yui.yahooapis.com/ ，但尚未提供Combo Handler服务，同时因种种原因，其更新在YUI 2.7.0之后就停滞了。更糟糕的是Yahoo!开发的支持Combo Handler的Apache模块虽然据传有计划开源，但至少现在依旧是私有技术，要使用就需要自己实现类似功能，所以国内类似技术的应用并不太多。

## 二、Minify

在Google Code上有一个PHP的开源项目叫[Minify](http://code.google.com/p/minify/)它可以合并、精简、Gzip压缩和缓存JavaScript和CSS文件。其文件合并功能就非常类似Combo Handler，只不过URL的语法稍微有点不同。如果Yahoo! CDN安装了Minify，那么上面Rich Text Editor的代码用Minify的默认格式来写就是：

	<script src="http://yui.yahooapis.com/min/f=
	2.8.0r4/build/yahoo-dom-event/yahoo-dom-event.js,
	2.8.0r4/build/container/container_core-min.js,
	2.8.0r4/build/menu/menu-min.js,
	2.8.0r4/build/element/element-min.js,
	2.8.0r4/build/button/button-min.js,
	2.8.0r4/build/editor/editor-min.js"></script>

### 1）使用Minify
本地使用Minify很简单，只需要Apache + PHP环境就OK了：

1. 安装好Apache + PHP (Windows、Mac)。
2. 下载Minify源码，解压，然后把min文件夹复制到指定的根目录下，比如localhost。这时URL的写法大概是http://localhost/min/f=...
3. 启用Apache的Mod Rewrite模块，然后在min文件夹下新建.htaccess文件，并添加Rewrite规则[1]。如果不启用Mod Rewrite功能，则Minify的URL会类似http://localhost/min/index.php?f=…，<a href="http://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/" target="_blank">这对客户端和中间服务器的缓存不利</a>，而启用了Mod Rewrite之后的URL类似http://localhost/min/f=…，不仅解决前面问题且更短。
4. 配置Minify，即编辑min/config.php文件[2]
5. 使用Minify
比如，有两个JavaScript文件，http://localhost/example/a.js,http://localhost/example/b.js，那么使用Minify合并的URL是http://localhost/min/f=/example/a.js,/example/b.js，直接把这个URL放到页面中就可以使用了。
实际上Minify不仅仅实现了合并功能，同时默认在合并的同时还会对文件进行精简压缩，如果你在本地本身就对文件进行压缩了，比如使用<a href="http://yuilibrary.com/projects/yuicompressor/" target="_blank">YUI Compressor</a>，那么可以在config.php中进行如下设置取消Minify的压缩以提升性能[3],如果服务端支持Java，那么也可以对[Minify进行简单配置而实现利用YUI Compressor压缩JavaScript和CSS文件](http://code.google.com/p/minify/wiki/CookBook#YUICompressor)。
直接在服务端进行合并和压缩，这非常的灵活，也极大的减轻了前端开发成果的部署过程，真使事半功倍。更多配置请看<[Minify CookBook](http://code.google.com/p/minify/wiki/CookBook)和[Wiki](http://code.google.com/p/minify/w/list).

### 2)在YUI3中使用Minify

在YUI2中，合并机制只支持库本身的文件，自定义的文件会单独一一加载。从YUI3开始，模块变得更小，这样就导致使用合并时URL会变长，但<a href="http://support.microsoft.com/kb/208427" target="_blank">在IE下URL的最大值是2083</a>，Apache默认的URL最大值是8192，所以当URL在对应浏览器下超出最大值时，YUI3会自动根据浏览器判断进行拆分成多个合并的URL，并且还提供了<a href="http://developer.yahoo.com/yui/3/api/Loader.html#property_maxURLLength" target="_blank">maxURLLength</a>来设置最大值。而从YUI3.1.0开始，不仅仅支持自定义文件的合并，还支持可以使用多个提供合并服务的CDN，即可以对YUI组件使用http://yui.yahooapis.com这个CDN，其余文件使用其他支持合并的CDN，这样非常的实用、方便和灵活。示例<a href="http://dancewithnet.com/lab/2010/yui3-loader-and-minify/" target="_blank">在YUI3中使用Minify</a>就说明了这点。
由于YUI默认URL的合并形式和Minify的不相同，所以在YUI实例化时需要利用正则替换来实现YUI3支持Minify的URL合并形式，但这种方式既不灵活，且有风险，不友好又效率低。比较简单的方式是直接修改YUI 3的源码，如示例<a href="http://dancewithnet.com/lab/2010/yui3-loader-and-minify/fixed.html" target="_blank">在修改后的YUI3中使用Minify</a>。同时，YUI 3.1.*的版本有一个bug，即同时合并JavaScript和CSS时，较短的那个URL结尾处多一个&符号，如示例<a href="http://dancewithnet.com/lab/2010/yui3-loader-and-minify/" target="_blank">在YUI3中使用Minify</a>中：

	http://yui.yahooapis.com/combo?3.1.1/build/widget/assets/skins/sam/widget.css&3.1.1/build/console/assets/skins/sam/console.css&http://dancewithnet.com/min/b=yui&f=3.1.1/tabview/assets/skins/sam/tabview.css&


这两种都可以使用，虽然在早<a href="http://dancewithnet.com/2009/11/05/a-little-practice-about-js-lazy-load/#comment-219359" target="_blank">期的IE浏览器版本（如IE6）中会有无法解析的风险</a>，且影响某些特定情况下的缓存，但当使用修改后的YUI时，合并的URL变成类似/min/b=yui&f=3.1.1/tabview/assets/skins/sam/tabview.css,的样子，就会出现bug了。对于YUI的Combo Handler来说这是一个小bug，所以<a href="http://yuilibrary.com/projects/yui3/ticket/2528680" target="_blank">YUI3把这个bug设置为P5</a>。但当我们改造YUI3来更好的支持Minify时，还要解决这个问题，具体方案请看示例在<a href="http://dancewithnet.com/lab/2010/yui3-loader-and-minify/fixed.html" target="_blank">修改后的YUI3中使用Minify</a>。


### 3)在CDN上使用Minify

CDN的全称是Content Delivery Network，即内容分发网络。其最常应用就是通过位于不同地理位置的服务器把静态资源部署到用户最近的边缘，这样能有效解决Web服务中大量静态资源的速度和性能问题。由于实施成本比较高，所以在实际的应用中，大型公司一般会组建自己的CDN，而小型公司只能租借第三方的CDN，但不管怎样这两种方式都不会影响在服务端实施合并和压缩程序。一般情况下，静态资源也并不是直接上传到CDN，而是先传到一台后台服务器，然后各地CDN的前端Cache服务器按需索取。YUI CDN的Combo Handler就是部署在其后台服务器上的，Minify也应如此。简单图示如下：

![cdn-and-minify](/files/img/cdn-and-minify.png "cdn-and-minify")

当一个资源请求到CDN时，CDN会先检查本地是否存在这个资源，如果有则会直接返回该资源，如果没有则会请求其后台服务器，后台服务器会依据资源URL的信息进行相应的处理，然后返回给CDN，CDN就会存储这个资源，再次出现这个资源请求时就无需请求后台服务器了。所以，虽然合并特别是压缩JavaScript和CSS文件是消耗时间的，但是由于只需要第一次，并且第一次基本上由我们自己访问掉（我们可以创建程序自动进行一次访问来保证，实际上图片优化也可以采用这种方式），所以基本上很安全。


---------------------------

注：

[1]rewrite

	<IfModule mod_rewrite.c>
	RewriteEngine on
	
	# You may need RewriteBase on some servers
	#RewriteBase /min
	
	# rewrite URLs like "/min/f=..." to "/min/?f=..."
	RewriteRule ^([bfg]=.*)  index.php?$1 [L,NE]
	</IfModule>
	
[2]config

	$min_enableBuilder = true;
	//本地使用时可以通过http://dwn/min/builder/来进行配置，外部使用时请设置为false
	
	//$min_cachePath = 'c:\\WINDOWS\\Temp';
	//$min_cachePath = '/tmp';
	//$min_cachePath = preg_replace('/^\\d+;/', '', session_save_path());
	//选择其一，去掉注释设置临时缓存目录，这样可以减少程序运算提高性能
	
	$min_serveOptions['maxAge'] = 1800;
	//设置浏览器缓存的时间，为了提升性能建议这个时间设置尽可能的长，比如315360000
	//如果需要在不改变URL的情况下更新静态文件，可以采用类似时间戳的方式，
	//如http://localhost/min/f=example/example.css&20100601.css
	//建议静态文件采用版本号管理，每次修改都需要升级版本号，这样就无需时间戳了，
	//如http://localhost/min/f=example/example_1_0_1.css
	
	$min_serveOptions['minApp']['maxFiles'] = 10;
	//参数f获取参数的个数，即合并的文件个数，这个数量完全可以增大，比如50，
	//当然可能会遇到URL最大值问题，后会有解释

[3]

	$min_serveOptions['minifiers']['application/x-javascript'] = '';
	$min_serveOptions['minifiers']['text/css'] = '';