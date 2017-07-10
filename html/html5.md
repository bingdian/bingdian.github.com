# html5概览

- date: 2013-02-21 23:21
- tags: html5,doctype,element,api
- category: html

----------------

## 一、简介

HTML5是HTML的新一代标准，现在仍处于发展阶段。HTML5添加了许多新的语法特征，其中包括&lt;video>, &lt;audio>, 和&lt;canvas>元素，同时集成了SVG内容。这些元素是为了更容易的在网页中添加和处理多媒体和图片内容而添加的。其它新的元素包括&lt;section>, &lt;article>,&lt;header>, 和&lt;nav>,是为了丰富文档的数据内容。新的属性的添加也是为了同样的目的。同时也有一些属性和元素被移除掉了。

### 1.1 html5设计原理

 * 避免不必要的复杂性
 * 支持已有的内容
 * 解决现实的问题
 * 平稳退化
 * 最终用户优先
 
 
详见Jeremy Keith在 Fronteers 2010 上的主题演讲[The Design of HTML5](http://adactio.com/articles/1704/),中文翻译见李松峰老师的翻译[HTML5设计原理](http://www.cn-cuckoo.com/2010/10/21/the-design-of-html5-2151.html)。

### 1.2 浏览器支持性况：

最新版本的 Safari、Chrome、Firefox 以及 Opera 支持某些 HTML5 特性。Internet Explorer 9支持某些 HTML5 特性。具体可查看[http://html5test.com/results/desktop.html](http://html5test.com/results/desktop.html)。

对于ie9以下的ie浏览器，可以使用[html5shiv](https://code.google.com/p/html5shiv/)使其支持HTML5标签，将下面代码插入到&lt;head>标签中即。 

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    
## 二、Doctype

### 2.1 DOCTYPE 简介

DOCTYPE，或者称为 Document Type Declaration（文档类型声明，缩写 DTD）。最初是XML的概念，即通过一种特定的语法，作为一种元数据，来描述XML文档中允许出现的元素，以及各元素的组成、嵌套规则等。参考[wiki](http://zh.wikipedia.org/wiki/DOCTYPE)。

在HTML中，DOCTYPE声明位于文档中的最前面的位置，处于 &lt;html> 标签之前。浏览器需要在解析 HTML 文档之前就确定当前文档的类型，以决定其需要采用的渲染模式，不同的渲染模式会影响到浏览器对于 CSS 代码甚至 JavaScript 脚本的解析。如果没有DOCTYPE，浏览器会进入一种被称为Quirks模式（又叫混杂模式，怪异模式，Quirks mode）渲染模式，在该模式下，浏览器的盒模型、样式解析、布局等都与标准规定的存在差异。

没有声明DOCTYPE情况：

	<html>
	<head>
		<title>document</title>
	</head>
	<body>
	<script>
	document.write(document.compatMode); //BackCompat
	</script>
	</body>
	</html>
	
声明DOCTYPE情况：

    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>document</title>
    </head>
    <body>
	<script>
	document.write(document.compatMode); //CSS1Compat
	</script>
    </body>
    </html>


document.compatMode 最先出现在 IE6 中，它的值标示了浏览器的工作模式，这是一个只读的属性，返回一个字符串，只可能存在两种返回值：

	BackCompat：标准兼容模式（Standards-compliant mode）未开启
	CSS1Compat：标准兼容模式（又叫严格模式，Standards mode 或者 Strict mode）已开启
	
	
需要注意的是：在后来出现的接近标准模式中，document.compatMode 的返回值与标准模式一致，为CSS1Compat。也就是说，不能通过 document.compatMode 来详细区分浏览器的工作模式，只能用来判断浏览器是否工作在Quirks模式下。
因为“标准模式”与“接近标准模式”之间的差异并不大，所以这个方法至今仍被广泛使用。
	
**注意：**

 * 对于IE6-9，如果DOCTYPE前存在注释，会进入Quirks模式。
 * 对于IE6，如果DOCTYPE前存在一个XML声明，会进入Quirks模式。

### 2.2 HTML4 的DOCTYPE

HTML 4.01的标准中指定了3种DOCTYPE：
	
	严格模式：
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
	
	过渡模式：
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	
	框架模式：
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
	
在HTML4的标准中，每一个DOCTYPE对应的dtd文件都是有合法的URL指定的，可以通过互联网进行下载。浏览器可以根据URL获得到dtd的具体内容，并根据内容的规定来解析文档。


### 2.3 XHTML DOCTYPE

XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。

	严格模式：
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	
	过渡模式：
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	
	框架模式：
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">


### 2.4 HTML5 DOCTYPE

HTML5具有更简单的DOCTYPE，在html5中，只需要写&lt;!DOCTYPE html>就可以了。所有的主流浏览器都将这种DOCTYPE视为标准模式。
这样写的好处：

 1. 你可以轻松的写下这个DOCTYPE，而不用担心会写错；
 2. 它是向后兼容的。 

<pre>
&lt;!DOCTYPE html>
</pre>

注：DOCTYPE大小写不敏感。


## 三、标签

### 3.1 新增的HTML5 标签

新增加的英文标签不翻译了，直接看英文理解更准确些。
    
    //Sections
    <section> 	Defines a section in a document
    <nav> 	Defines a section that contains only navigation links
    <article> 	Defines self-contained content that could exist independantly of the rest of the content
    <aside> 	Defines some content set aside from the rest of page content. If it is removed, the remaining content still make sense.
    <hgroup> 	Groups a set of <h1> to <h6> elements when a heading has multiple levels
    <header> 	Defines the header of a page or section. It often contains a logo, the title of the Web site and a navigational table of content.
    <footer> 	Defines the footer for a page or section. It often contains a copyright notice, some links to legal information or addresses to give feedback.
    <main>	Defines the main or important content in the document. There is only one <main> element in the document.
    
    
    //Grouping content
    <figure> 	Represents a figure illustrated a part of the document.
    <figcaption> 	Represents the legend of a figure.
    
    
    //Text-level semantics
    <data> 	Associates to its content a machine-readable equivalent. (This element is only in the WHATWG version of the HTML standard, and not in the W3C version of HTML5).
    <time> 	Represents a date and time value, eventually with a machine-readable equivalent.
    <mark> 	Represents text highlighted for reference purposes, that is for its relevance in another context.
    <ruby> 	Represents content to be marked with ruby annotations, short runs of text presented alongside the text. This is often used in conjunction with East Asian language where the annotations act as a guide for pronunciation, like the Japanese furigana.
    <rt> 	Represents the text of a ruby annotation.
    <rp> 	Represents parenthesis around a ruby annotation, used to display the annotation in an alternate way by browsers not supporting the standard display for annotations.
    <bdi> 	Represents text that must be isolated from its surrounding for bidirectional text formatting. It allows to embed span of text with a different, or unknown, directionality.
    <wbr> 	Represents a line break opportunity, that is a suggested wrapping point in order to improve readability of text split on several lines.
    
    
    //Embedded content
    <embed> 	Represents a integration point for an external, often non_HTML, application or interactive content.
    <video> 	Represents a video, and its associated audio files and captions, with the necessary interface to play it.
    <audio> 	Represents a sound, or an audio stream.
    <source> 	Allows authors to specify alternative media resources for media elements like <video> or <audio>.
    <track> 	Allows authors to specify timed text track for media elements like <video> or <audio>.
    <canvas> 	Represents a bitmap area that scripts can be used to render graphics, like graphs, game graphics, any visual images on the fly.
    <svg> 	Defines an embedded vectorial image.
    <math> 	Defines a mathematical formula.
    
    
    //Forms
    <datalist> 	Represents a set of predefined options for other controls.
    <keygen> 	Represents a key pair generator control.
    <output> 	Represents the result of a calculation.
    <progress> 	Represents the completion progress of a task.
    <meter> 	Represents a scalar measurement (or a fractional value), within a known range
    
    
    //Interactive elements
    <details> 	Represents a widget from which the user can obtain additional information or controls.
    <summary> 	Represents a summary, caption, or legend for a given <details>.
    <command> 	Represents a command that the user can invoke.
    <menu> 	Represents a list of commands.
            

### 3.2 HTML 4.01的和HTML5标签比较

<table>
	<thead>
		<tr>
			<th>Element</th>
			<th>HTML 4.01/XHTML 1.0</th>
			<th>HTML5</th>
			<th>Short Description</th>
			<th>中文描述</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code><a href="#the-a-element">a</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Hyperlink</td>
			<td>超链接</td>
		</tr>
		<tr>
			<td><code><a href="#the-abbr-element">abbr</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Abbreviation</td>
			<td>定义缩写</td>
		</tr>
		<tr>
			<td><code>acronym</code></td>
			<td class="strict">strict</td>
			<td class="obsolete">-</td>
			<td>Acronym</td>
			<td>HTML 5 中不支持。定义首字母缩写。</td>
		</tr>
		<tr>
			<td><code><a href="#the-address-element">address</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Contact information</td>
			<td>定义地址元素</td>
		</tr>
		<tr>
			<td><code>applet</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td>Java applet</td>
			<td>HTML 5 中不支持，定义 applet</td>
		</tr>
		<tr>
			<td><code><a href="#the-area-element">area</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Image map region</td>
			<td>定义图像映射中的区域</td>
		</tr>
		<tr>
			<td><code><a href="#the-article-element">article</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Independent section</td>
			<td>显示一个独立内容，如一篇完整的论坛帖子，一则网站新闻，一篇博客文章，一个用户评论等。</td>
		</tr>
		<tr>
			<td><code><a href="#the-aside-element">aside</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Auxiliary section</td>
			<td>定义页面内容之外的内容，如侧边栏</td>
		</tr>
		<tr>
			<td><code><a href="#the-audio-element">audio</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Audio stream</td>
			<td>定义声音内容</td>
		</tr>
		<tr>
			<td><code><a href="#the-b-element">b</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Bold text</td>
			<td>定义粗体文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-base-element">base</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Document base URI</td>
			<td>定义页面中所有链接的基准 URL</td>
		</tr>
		<tr>
			<td><code>basefont</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td>Base font style</td>
			<td>HTML 5 中不支持，请使用 CSS 代替。</td>
		</tr>
		<tr>
			<td><code><a href="#the-bb-element">bb</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Browser button</td>
			<td>定义文本的文本方向，使其脱离其周围文本的方向设置。</td>
		</tr>
		<tr>
			<td><code><a href="#the-bdo-element">bdo</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Bi-directional text override</td>
			<td>定义文本显示的方向</td>
		</tr>
		<tr>
			<td><code>bgsound</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持。</td>
		</tr>
		<tr>
			<td><code>big</code></td>
			<td class="strict">strict</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持，定义大号文本。</td>
		</tr>
		<tr>
			<td><code>blink</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持。</td>
		</tr>
		<tr>
			<td><code><a href="#the-blockquote-element">blockquote</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Long quotation</td>
			<td>定义长的引用。</td>
		</tr>
		<tr>
			<td><code><a href="#the-body-element">body</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Main content</td>
			<td>定义 body 元素。</td>
		</tr>
		<tr>
			<td><code><a href="#the-br-element">br</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Line break</td>
			<td>换行符。</td>
		</tr>
		<tr>
			<td><code><a href="#the-button-element">button</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Push button control</td>
			<td>定义按钮。</td>
		</tr>
		<tr>
			<td><code><a href="#the-canvas-element">canvas</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Bitmap canvas</td>
			<td>定义图形，比如图表和其他图像</td>
		</tr>
		<tr>
			<td><code><a href="#the-caption-element">caption</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table caption</td>
			<td>定义表格标题</td>
		</tr>
		<tr>
			<td><code>center</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持，定义居中的文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-cite-element">cite</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Citation</td>
			<td>定义引用</td>
		</tr>
		<tr>
			<td><code><a href="#the-code-element">code</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Code fragment</td>
			<td>定义计算机代码文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-col-element">col</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table column</td>
			<td>定义表格列的属性</td>
		</tr>
		<tr>
			<td><code><a href="#the-colgroup-element">colgroup</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table column group</td>
			<td>定义表格列的分组</td>
		</tr>
		<tr>
			<td><code><a href="#the-command-element">command</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Command that a user can invoke</td>
			<td>定义命令按钮</td>
		</tr>
		<tr>
			<td><code>datagrid</code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Interactive tree, list or tabular data</td>
			<td>定义下拉列表</td>
		</tr>
		<tr>
			<td><code><a href="#the-datalist-element">datalist</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Predefined control values</td>
			<td></td>
		</tr>
		<tr>
			<td><code><a href="#the-dd-element">dd</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Description description</td>
			<td>定义定义的描述。</td>
		</tr>
		<tr>
			<td><code><a href="#the-del-element">del</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Deletion</td>
			<td>定义删除文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-details-element">details</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Additional information</td>
			<td>定义元素的细节</td>
		</tr>
		<tr>
			<td><code><a href="#the-dfn-element">dfn</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Defining instance of a term</td>
			<td>定义定义项目</td>
		</tr>
		<tr>
			<td><code><a href="#the-dialog-element">dialog</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Conversation</td>
			<td></td>
		</tr>
		<tr>
			<td><code>dir</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持，定义目录列表</td>
		</tr>
		<tr>
			<td><code><a href="#the-div-element">div</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Generic division</td>
			<td></td>
		</tr>
		<tr>
			<td><code><a href="#the-dl-element">dl</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Description list</td>
			<td>定义定义列表</td>
		</tr>
		<tr>
			<td><code><a href="#the-dt-element">dt</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Description term</td>
			<td>定义定义的项目</td>
		</tr>
		<tr>
			<td><code><a href="#the-em-element">em</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Stress emphasis</td>
			<td>定义强调文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-embed-element">embed</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Embedded application</td>
			<td>定义外部交互内容或插件</td>
		</tr>
		<tr>
			<td><code><a href="#the-fieldset-element">fieldset</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Form control group</td>
			<td>定义 fieldset</td>					
		</tr>
		<tr>
			<td><code><a href="#the-figure-element">figure</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>A figure with a caption.</td>
			<td>定义媒介内容的分组，以及它们的标题</td>
		</tr>
		<tr>
			<td><code>font</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td>Font style</td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code><a href="#the-footer-elem ent">footer</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Section footer</td>
			<td>定义 section 或 page 的页脚</td>
		</tr>
		<tr>
			<td><code><a href="#the-form-element">form</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Form</td>
			<td>定义表单。</td>
		</tr>
		<tr>
			<td><code>frame</code></td>
			<td class="frameset">frameset</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持。定义子窗口（框架）</td>
		</tr>
		<tr>
			<td><code>frameset</code></td>
			<td class="frameset">frameset</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持，定义框架的集。</td>
		</tr>
		<tr>
			<td><code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h1</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Heading level 1</td>
			<td>一级标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h2</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Heading level 2</td>
			<td>二级标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h3</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Heading level 3</td>
			<td>三级标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h4</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Heading level 4</td>
			<td>四级标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h5</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Heading level 5</td>
			<td>五级标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements">h6</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Heading level 6</td>
			<td></td>
		</tr>
		<tr>
			<td><code><a href="#the-head-element">head</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Document head</td>
			<td>六级标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-header-element">header</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Section header</td>
			<td>定义 section 或 page 的页眉。</td>
		</tr>
		<tr>
			<td><code><a href="#the-hr-element">hr</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Separator</td>
			<td>定义水平线。</td>
		</tr>
		<tr>
			<td><code><a href="#the-html-element">html</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Document root</td>
			<td>定义 html 文档</td>
		</tr>
		<tr>
			<td><code><a href="#the-i-element">i</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Italic text</td>
			<td>定义斜体文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-iframe-element">iframe</a></code></td>
			<td class="transitional">transitional</td>
			<td class="active">yes</td>
			<td>Inline frame</td>
			<td>定义行内的子窗口（框架）</td>
		</tr>
		<tr>
			<td><code><a href="#the-img-element">img</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Image</td>
			<td>定义图像</td>
		</tr>
		<tr>
			<td><code><a href="#the-input-element">input</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Form control</td>
			<td>定义输入域</td>
		</tr>
		<tr>
			<td><code><a href="#the-ins-element">ins</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Insertion</td>
			<td>定义插入文本</td>
		</tr>
		<tr>
			<td><code>isindex</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持，定义单行的输入域</td>
		</tr>
		<tr>
			<td><code><a href="#the-kbd-element">kbd</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>User input</td>
			<td>定义键盘文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-label-element">label</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Form control label</td>
			<td>定义表单控件的标注</td>
		</tr>
		<tr>
			<td><code><a href="#the-legend-element">legend</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Explanatory title or caption</td>
			<td>定义 fieldset 中的标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-li-element">li</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>List item</td>
			<td>定义列表的项目。</td>
		</tr>
		<tr>
			<td><code><a href="#the-link-element">link</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Link to resources</td>
			<td>定义资源引用</td>
		</tr>
		<tr>
			<td><code>listing</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td>Preformatted text</td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code><a href="#the-map-element">map</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Client-side image map</td>
			<td>定义图像映射</td>
		</tr>
		<tr>
			<td><code><a href="#the-mark-element">mark</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Marked or highlighted text</td>
			<td>定义有记号的文本</td>
		</tr>
		<tr>
			<td><code>marquee</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code><a href="#the-menu-element">menu</a></code></td>
			<td class="transitional">transitional</td>
			<td class="active">yes</td>
			<td>Command menu</td>
			<td>定义菜单列表</td>
		</tr>
		<tr>
			<td><code><a href="#the-meta-element">meta</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Metadata</td>
			<td>定义元信息</td>
		</tr>
		<tr>
			<td><code><a href="#the-meter-element">meter</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Scalar measurement</td>
			<td>定义预定义范围内的度量</td>
		</tr>
		<tr>
			<td><code><a href="#the-nav-element">nav</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Navigation</td>
			<td>定义导航链接</td>
		</tr>
		<tr>
			<td><code>nobr</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code>noembed</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code>noframes</code></td>
			<td class="frameset">frameset</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持。</td>
		</tr>
		<tr>
			<td><code><a href="#the-noscript-element">noscript</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Alternative content for no script support</td>
			<td>定义 noscript 部分</td>
		</tr>
		<tr>
			<td><code><a href="#the-object-element">object</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Generic embedded resource</td>
			<td>定义嵌入对象</td>
		</tr>
		<tr>
			<td><code><a href="#the-ol-element">ol</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Ordered list</td>
			<td>定义有序列表</td>
		</tr>
		<tr>
			<td><code><a href="#the-optgroup-element">optgroup</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Option group</td>
			<td>定义选项组</td>
		</tr>
		<tr>
			<td><code><a href="#the-option-element">option</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Selection choice</td>
			<td>定义下拉列表中的选项</td>
		</tr>
		<tr>
			<td><code><a href="#the-output-element">output</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Output control</td>
			<td>定义输出的一些类型</td>
		</tr>
		<tr>
			<td><code><a href="#the-p-element">p</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Paragraph</td>
			<td>定义段落</td>
		</tr>
		<tr>
			<td><code><a href="#the-param-element">param</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Plugin parameter</td>
			<td>为对象定义参数</td>
		</tr>
		<tr>
			<td><code>plaintext</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td>Preformatted text</td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code><a href="#the-pre-element">pre</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Preformatted text</td>
			<td>定义预格式化文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-progress-element">progress</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Progress of a task</td>
			<td>定义任何类型的任务的进度</td>
		</tr>
		<tr>
			<td><code><a href="#the-q-element">q</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Inline quotation</td>
			<td>定义短的引用</td>
		</tr>
		<tr>
			<td><code><a href="#the-rp-element">rp</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Ruby parenthesis</td>
			<td>定义若浏览器不支持 ruby 元素显示的内容</td>
		</tr>
		<tr>
			<td><code><a href="#the-rt-element">rt</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Ruby text</td>
			<td>定义 ruby 注释的解释</td>
		</tr>
		<tr>
			<td><code><a href="#the-ruby-element">ruby</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Ruby annotation</td>
			<td>定义 ruby 注释</td>
		</tr>
		<tr>
			<td><code>s</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持，定义加删除线的文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-samp-element">samp</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Sample output</td>
			<td>定义样本计算机代码</td>
		</tr>
		<tr>
			<td><code><a href="#the-script-element">script</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Linked or embedded script</td>
			<td>定义脚本</td>
		</tr>
		<tr>
			<td><code><a href="#the-section-element">section</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Document section</td>
			<td>定义 section</td>
		</tr>
		<tr>
			<td><code><a href="#the-select-element">select</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Selection control</td>
			<td>定义可选列表</td>
		</tr>
		<tr>
			<td><code><a href="#the-small-element">small</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Small print</td>
			<td>将旁注 (side comments) 呈现为小型文。</td>
		</tr>
		<tr>
			<td><code><a href="#the-source-element">source</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Media resource</td>
			<td>定义媒介源</td>
		</tr>
		<tr>
			<td><code>spacer</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code><a href="#the-span-element">span</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Generic inline container</td>
			<td></td>
		</tr>
		<tr>
			<td><code>strike</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持，定义加删除线的文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-strong-element">strong</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Strong importance</td>
			<td>定义强调文本。</td>
		</tr>
		<tr>
			<td><code><a href="#the-style-element">style</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Embedded stylesheet</td>
			<td>定义样式定义</td>
		</tr>
		<tr>
			<td><code><a href="#the-sub-and-sup-elements">sub</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Subscript</td>
			<td>定义下标文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-sub-and-sup-elements">sup</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Superscript</td>
			<td>定义上标文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-table-element">table</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table</td>
			<td>定义表格</td>
		</tr>
		<tr>
			<td><code><a href="#the-tbody-element">tbody</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table body</td>
			<td>定义表格的主体</td>
		</tr>
		<tr>
			<td><code><a href="#the-td-element">td</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table cell</td>
			<td>定义表格单元</td>
		</tr>
		<tr>
			<td><code><a href="#the-textarea-element">textarea</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Multi-line text control</td>
			<td>定义 textarea</td>
		</tr>
		<tr>
			<td><code><a href="#the-tfoot-element">tfoot</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table footer</td>
			<td>定义表格的脚注</td>
		</tr>
		<tr>
			<td><code><a href="#the-th-element">th</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table header cell</td>
			<td>定义表头单元格</td>
		</tr>
		<tr>
			<td><code><a href="#the-thead-element">thead</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table head</td>
			<td>定义表头</td>
		</tr>
		<tr>
			<td><code><a href="#the-time-element">time</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Date and/or time</td>
			<td>定义日期/时间</td>					
		</tr>
		<tr>
			<td><code><a href="#the-title-element">title</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Document title</td>
			<td>定义文档的标题</td>
		</tr>
		<tr>
			<td><code><a href="#the-tr-element">tr</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Table row</td>
			<td>定义表格行</td>
		</tr>
		<tr>
			<td><code>u</code></td>
			<td class="transitional">transitional</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持。定义下划线文本</td>
		</tr>
		<tr>
			<td><code><a href="#the-ul-element">ul</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Unordered list</td>
			<td>定义无序列表</td>
		</tr>
		<tr>
			<td><code><a href="#the-var-element">var</a></code></td>
			<td class="strict">strict</td>
			<td class="active">yes</td>
			<td>Variable</td>
			<td>定义变量。</td>
		</tr>
		<tr>
			<td><code><a href="#the-video-element">video</a></code></td>
			<td class="none">-</td>
			<td class="active">yes</td>
			<td>Video or movie</td>
			<td>定义视频</td>
		</tr>
		<tr>
			<td><code>wbr</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td></td>
			<td>HTML 5 中不支持</td>
		</tr>
		<tr>
			<td><code>xmp</code></td>
			<td class="none">-</td>
			<td class="obsolete">-</td>
			<td>Preformatted text</td>
			<td>HTML 5 中不支持。定义预格式文本</td>
		</tr>
	</tbody>
</table>


## 四、API

html5引入了新API,新的API的意义：

 * 增强了html原生功能
 * 丰富动画效果，增强web表现力
 * 强大的后台运算和通信支持
 

html5新增API：

 * 离线 & 存储（OFFLINE & STORAGE）
    * Offline resources: 离线资源：应用程序缓存
    * Online and offline events：在线和离线事件，可以让应用程序和扩展检测是否存在可用的网络连接，以及在连接建立和断开时能感知到。
    * WEB Storage（又名 DOM Storage)：sessionStorage 和 localStorage。
    * IndexedDB：是一个为了能够在浏览器中存储大量结构化数据，并且能够在这些数据上使用索引进行高性能检索的 web 标准。
    * Using files from web applications
 * 设备访问（DEVICE ACCESS）
    * Using the Camera API：允许使用和操作计算机的摄像头，并从中存取照片。
    * Touch events：对用户按下触控屏的事件做出反应的处理程序。
    * Geolocation：让浏览器使用地理位置服务定位用户的位置，用户可共享地理位置，并在Web应用的协助下享用位置感知服务。
    * Detecting device orientation：检测设备方向,让用户在运行浏览器的设备变更方向时能够得到信息。
    * Pointer Lock API
 * 连通性（CONNECTIVITY）
    * Web Sockets：允许在页面和服务器之间建立持久连接并通过这种方法来交换非 HTML 数据。
    * Server-sent events：允许服务器向客户端推送事件，而不是仅在响应客户端请求时服务器才能发送数据的传统范式。
    * WebRTC：这项技术，其中的 RTC 代表的是即时通信，允许连接到其他人，直接在浏览器中控制视频会议，而不需要一个插件或是外部的应用程序。
 * 多媒体（MULTIMEDIA）
    * Audio and Video: HTML5 音频与视频：HTML5里新增的元素，它们为开发者提供了一套通用的、集成的、脚本式的处理音频与视频的API，而无需安装任何插件。
    * Camera API：允许使用，操作计算机摄像头，并从中存储图像。
    * Track 和 WebVTT：<track> 元素支持字幕和章节。WebVTT 一个文本轨道格式。
 * 3D, 图像 & 效果（3D, GRAPHICS & EFFECTS）
    * Canvas：有关动态产出与渲染图形、图表、图像和动画的API。
    * SVG: 一个基于 XML 的可以直接嵌入到 HTML 中的矢量图像格式。
    * WebGL：WebGL 通过引入了一套非常地符合 OpenGL ES 2.0 并且可以用在 HTML5 &lt;canvas> 元素中的 API 给 web 带来了 3D 图像功能。
 * 性能 & 集成（PERFORMANCE & INTEGRATION）
    * Web Workers：把JavaScript 计算委托给后台线程，通过允许这些活动以防止使交互型事件变得缓慢。
    * XMLHttpRequest Level 2
    * History API：允许对浏览器历史记录进行操作。这对于那些交互地加载新信息的页面尤其有用。
    * conentEditable 属性：HTML5 已经把 contentEditable 属性标准化了。
    * Drag and drop：HTML5 的拖放 API 能够支持在网站内部和网站之间拖放项目。
    * Fullscreen API：为一个网页或者应用程序控制使用整个屏幕，而不显示浏览器界面。

## 扩展阅读


 * Doctype
    * http://dev.w3.org/html5/markup/syntax.html#doctype-syntax
    * http://www.w3help.org/zh-cn/kb/001#common_dtd
    * http://w3help.org/zh-cn/casestudies/002
    * http://hsivonen.iki.fi/doctype/
    * http://otakustay.com/learning-html5-doctype/
 * html5
    * [HTML5 Reference](http://dev.w3.org/html5/html-author/)
    * [HTML5 differences from HTML4](http://www.w3.org/TR/html5-diff/)
    * [HTML5 - MDN](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5)
    * [HTML5设计原理](http://www.cn-cuckoo.com/2010/10/21/the-design-of-html5-2151.html/comment-page-6#comment-13993)
    * http://dev.w3.org/html5/
    * http://www.w3.org/html/ig/zh/wiki/HTML5
    * http://www.w3help.org/zh-cn/kb/001#common_dtd
    * https://zh.wikipedia.org/zh-cn/HTML5
    * [html5 logo](http://www.w3.org/html/logo/)
    * https://developer.mozilla.org/en-US/docs/HTML/HTML5/HTML5_element_list
    * http://html5doctor.com/element-index/
    * [modernizr](http://modernizr.com/)
    * [html5shiv]:(https://github.com/aFarkas/html5shiv)
 * demo
    * [HTML 5 Demos and Examples](http://html5demos.com/)
    * [HTML5ROCKS](http://www.html5rocks.com/en/)
    * http://www.apple.com/html5/
    * https://developer.mozilla.org/en-US/demos/tag/tech:html5/
 * HTML5 无障碍
    * [HTML5 Accessibility](http://html5accessibility.com/)
    * [HTML5 无障碍](http://www.people.cd/html5-accessibility/)
