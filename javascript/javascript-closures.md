# Javascript闭包篇(Closure) - Javascript学习笔记（五）	

- date: 2011-07-16 22:21
- tags: 学习笔记,javascript,闭包
- category: Javascript

----------------
## 一、闭包的概念 ##

>In computer science, a closure is a function that is evaluated in an environment containing one or more bound variables. When called, the function can access these variables.

>闭包是个函数，而它“记住了周围发生了什么”。表现为由“一个函数”体中定义了“另一个函数”

>“闭包”是一个表达式（一般是函数），它具有自由变量以及绑定这些变量的环境（该环境“封闭了”这个表达式）。（闭包，就是封闭了外部函数作用域中变量的内部函数。但是，如果外部函数不返回这个内部函数，闭包的特性无法显现。如果外部函数返回这个内部函数，那么返回的内部函数就成了名副其实的闭包。此时，闭包封闭的外部变量就是自由变量，而由于该自由变量存在，外部函数即便返回，其占用的内存也得不到释放。）

>闭包就是能够读取其他函数内部变量的函数。



闭包是有权访问另一个函数作用域中的变量的函数。

闭包是javascript中很难理解的部分，很多高级的应用都依靠闭包来实现的。要理解闭包，首先要理解变理的作用域，见[Javascript变量作用域篇](http://wlog.cn/javascript/javascript-variable-scope-chain.html)。可以先不用仔细理解前面关于闭包的定义。可以先接着向下看，看完后再回头看前面的定义有助于对闭包的理解。我们先来看下面的一个例子：

	function outer() {
		var i = 100;
		function inner() {
			console.log(i);
		}
	}

上面代码，根据变量的作用域，函数outer中所有的局部变量，对函数inner都是可见的；函数inner中的局部变量，在函数inner外是不可见的，所以在函数inner外是无法读取函数inner的局部变量的。

既然函数inner可以读取函数outer的局部变量，那么只要将inner作为返会值，就可以直接在ouer外部读取inner的局部变量。

	function outer() {
		var i = 100;
		function inner() {
			 console.log(i);
		}
		return inner;
	}
	var rs = outer();
	rs();

这个函数有两个特点：

 1. 函数inner嵌套在函数ouer内部；
 2. 函数outer返回函数inner。

这样执行完var rs = outer()后，实际rs指向了函数inner。这段代码其实就是一个闭包。也就是说当函数outer内的函数inner被函数outer外的一个变量引用的时候，就创建了一个闭包。

## 二、闭包的作用 ##

	function outer() {
		var i = 100;
		function inner() {
			 console.log(i++);
		}
		return inner;
	}
	var rs = outer();
	rs();   //100
	rs();   //101
	rs();   //102

上面的代码中，rs是闭包inner函数。rs共运行了三次，第一次100，第二次101，第三次102，这说明在函数outer中的局部变量i一直保存在内存中,并没有在调用自动清除。

闭包的作用就是在outer执行完毕并返回后，闭包使javascript的垃圾回收机制（grabage collection）不会回收outer所占的内存，因为outer的内部函数inner的执行要依赖outer中的变量。(另一种解释：outer是inner的父函数，inner被赋给了一个全局变量，导致inner会一直在内存中，而inner的存在依赖于outer,因些outer也始终于在内存中，不会在调用结束后被垃圾收集回收)。

 1. 闭包有权访问函数内部的所有变量。
 2. 当函数返回一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。

## 三、闭包与变量 ##

由于作用域链的机制，闭包只能取得包含函数中任何变量的最后一个值。看下面例子：

	function f() {
		var rs = [];
		
		for (var i=0; i <10; i++) {
			rs[i] = function() {
				return i;
			};
		}
		
		return rs;
	}
	
	var fn = f();
	
	for (var i = 0; i < fn.length; i++) {
		console.log('函数fn[' + i + ']()返回值:' + fn[i]());
	}

函数会返回一个数组，表面上看，似乎每个函数都应该返回自己的索引值，实际上，每个函数都返回10，这是因为第个函数的作用域链上都保存着函数f的活动对象，它们引用的都是同一变量i。当函数f返回后，变量i的值为10，此时每个函数都保存着变量i的同一个变量对象。我们可以通过创建另一个匿名函数来强制让闭包的行为符合预期。


	function f() {
		var rs = [];
		
		for (var i=0; i <10; i++) {
			rs[i] = function(num) {
				return function() {
					return num;
				};
			}(i);
		}
		
		return rs;
	}
	
	var fn = f();
	
	for (var i = 0; i < fn.length; i++) {
		console.log('函数fn[' + i + ']()返回值:' + fn[i]());
	}

这个版本中，我们没有直接将闭包赋值给数组，而是定义了一个匿名函数，并将立即执行匿名函数的结果赋值给数组。这里匿名函数有一个参数num，在调用每个函数时，我们传入变量i，由于参数是按值传递的，所以就会将变量i复制给参数num。而在这个匿名函数内部，又创建了并返回了一个访问num的闭包，这样，rs数组中每个函数都有自己num变量的一个副本，因此就可以返回不同的数值了。

## 四、闭包中的this对象 ##

	var name = 'Jack';
	
	var o = {
		name : 'bingdian',
		
		getName : function() {
			return function() {
				return this.name;
			};
		}
	}
	
	console.log(o.getName()());     //Jack
	var name = 'Jack';
	
	var o = {
		name : 'bingdian',
		
		getName : function() {
			var self = this;
			return function() {
				return self.name;
			};
		}
	}
	
	console.log(o.getName()());     //bingdian


## 五、内存泄露 ##

	function assignHandler() {
		var el = document.getElementById('demo');
		el.onclick = function() {
			console.log(el.id);
		}
	}
	assignHandler();

以上代码创建了作为el元素事件处理程序的闭包，而这个闭包又创建了一个循环引用，只要匿名函数存在，el的引用数至少为1，因些它所占用的内存就永完不会被回收。

	function assignHandler() {
		var el = document.getElementById('demo');
		var id = el.id;
		
		el.onclick = function() {
			console.log(id);
		}
		
		el = null;
	}
	assignHandler();

把变量el设置null能够解除DOM对象的引用，确保正常回收其占用内存。

## 六、模仿块级作用域 ##

任何一对花括号（｛和｝）中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。

	(function(){
		//块级作用域
	})();

## 七、闭包的应用 ##

1. 保护函数内的变量安全。如前面的例子，函数outer中i只有函数inner才能访问，而无法通过其他途径访问到，因此保护了i的安全性。
2. 在内存中维持一个变量。如前面的例子，由于闭包，函数outer中i的一直存在于内存中，因此每次执行rs()，都会给i加1。


## 扩展阅读 ##

* http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html
* https://developer.mozilla.org/zh-CN/docs/JavaScript/Guide/Closures
* http://jibbering.com/faq/notes/closures/
* http://www.cn-cuckoo.com/2007/08/01/understand-javascript-closures-72.html
* http://www.kryogenix.org/code/browser/secrets-of-javascript-closures/
