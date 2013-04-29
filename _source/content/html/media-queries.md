# CSS3 Media Queries

- date: 2012-02-08 21:42
- tags: css3,Media-Queries
- category: Html

----------------

## 一、Media Queries 支持的属性


	属性                值                 Min/Max     描述
	color               integer             yes         每种色彩的字节数
	color-index         integer             yes         色彩表中的色彩数
	device-aspect-ratio integer/integer     yes         宽高比例
	device-height       length              yes         设备屏幕的输出高度
	device-width        length              yes         设备屏幕的输出宽度
	grid                integer             no          是否是基于格栅的设备
	height              length              yes         渲染界面的高度
	monochrome          integer             yes         单色帧缓冲器中每像素字节
	resolution          resolution          yes         分辨率
	scan                                    no          tv媒体类型的扫描方式
	width               length              yes         渲染界面的宽度
	orientation         Portrait/landscape  no          横屏或竖屏

-

	height              min-height              max-height
	device-width        min-device-width        max-device-width
	device-height       min-device-height       max-device-height
	aspect-ratio        min-aspect-ratio        max-aspect-ratio
	device-aspect-ratio min-device-aspect-ratio max-device-aspect-ratio
	color               min-color               max-color
	color-index         min-color-index         max-color-index
	Monochrome          min-monochrome          max-monochrome
	Resolution          min-resolution          max-resolution


## 二、关键字

and - 结合多个媒体查询
not - 排除某种制定的媒体类型
only - 用来定某种特定的媒体类型


## 三、引用样式示例</h3>


	&lt;link rel="stylesheet" media="all" href="style.css" />
	&lt;link rel="stylesheet" media="screen and (min-width:980px)" href="desktop.css" />
	&lt;link rel="stylesheet" media="screen and (min-width:768px) and (max-width:980px)" href="pad.css" />
	&lt;link rel="stylesheet" media="screen and (min-width:480) and (max-width: 768px)" href="phone.css" />
	&lt;link rel="stylesheet" media="screen and (max-width:320px)" href="small.css" />



## 四、内联样式示例

	@media screen and (min-width: 980px) {
		//css code
	}
	@screen and (min-width:768px) and (max-width:980px) {
		//css code
	}
	@screen and (min-width:480) and (max-width: 768px) {
		//css code
	}
	@screen and (max-width:320px) {
		//css code
	}
	
	@media screen and (max-device-width: 480px) {
		//max-device-width等于480px
	}
	@media screen and (device-aspect-ratio: 16/9), screen and (device-aspect-ratio: 16/10) {
		//设备宽高比
	}
	@media all and (orientation:portrait) {
		//竖屏
	}
	@media all and (orientation:landscape) {
		//横屏
	}

## 五、jQuery Media Queries Plugin for ie6/7/8

[http://archive.plugins.jquery.com/project/MediaQueries](http://archive.plugins.jquery.com/project/MediaQueries)

## 六、Demo

本博客缩放即可看到效果

## 扩展阅读：

* [http://www.w3.org/TR/css3-mediaqueries/](http://www.w3.org/TR/css3-mediaqueries/)
* [https://developer.mozilla.org/en/CSS/Media_queries](https://developer.mozilla.org/en/CSS/Media_queries)
* [https://developer.mozilla.org/en/CSS/Media_queries](https://developer.mozilla.org/en/CSS/Media_queries)
* [http://dev.opera.com/articles/view/safe-media-queries/](http://dev.opera.com/articles/view/safe-media-queries/)
* [http://reference.sitepoint.com/css/mediaqueries](http://reference.sitepoint.com/css/mediaqueries)
* [http://mediaqueri.es](http://mediaqueri.es)