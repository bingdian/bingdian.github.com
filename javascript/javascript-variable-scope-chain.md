# Javascript变量作用域篇 - Javascript学习笔记（四）

- date: 2011-07-13 22:18
- tags: 学习笔记,变量,作用域,javascript
- category: Javascript

----------------

## 一、变量声明 ##

变量用关键字var来声明，如：
	
	var i;
	var num;
	var a, b;
	var name ='bingdian';
	var i = 0, j = 1 , k=6;

var关键字声明的变量是永久的，用delete运算符删除这些变量将会引发错误。


	x = 1;
	delete x;
	console.log(x);   //x is not defined

javascript的变量类型是松散类型的，可以用来保存任何数据类型，可以在修改变量值的同时修改变量类型：

	var answer = 10;
	x = 'The answer is ' + 10
	y = 10 + ' is the answer'
	console.log(x);   // The answer is 10
	console.log(y);   // 10 is the answer
	
	var a = '17' - 8;  //9
	var b = '17' + 8;  //178
	console.log(a);
	console.log(b);

使用var关键字多次声明同一个变量是合法的。

使用一个未声明的变量，会引发错误。

## 二、变量作用域 ##

变量的作用域是程序中定义这个变量的区域。函数内声明的变量只在函数内部起作用（声明局部变量一定要使用var关键字声明）。

在函数内部，局部变量作用域优先级高于同名全局变量，例：

	var i = 99;
	var foo = function() {
		var i = 10;
		console.log(i);
	}
	foo();  //10 使用局部变量
	console.log(i);     //99 使用全局变量

声明局部变量一定要使用var关键字，使用var关键字声明变量时，变量会自动添加到距离最近的可用环境中。如果没有写var, 变量就会暴露在全局上下文中, 这样很可能会和现有变量冲突. 另外, 如果没有加上, 很难明确该变量的作用域是什么, 变量也很可能像在局部作用域中, 很轻易地泄漏到 Document 或者 Window 中, 所以务必用var去声明变量。例：

	var a = 3;
	var foo = function() {
		a = 10;
		b = 22;
		console.log(a);
		console.log(b);
	}
	foo();              //10 22
	console.log(a);     //10
	console.log(b);     //22

如果变量在未声明的情况下被初始化，该变量会自动添加到全局环境。看下面两个例子：

	function add(a ,b) {
		var sum = a+b;
		return sum;
	}
	var rs = add(2,3);  
	console.log(rs);    //5
	console.log(sum);   //sum is not defined
	function add(a ,b) {
		sum = a+b;
		return sum;
	}
	var rs = add(2,3);  
	console.log(rs);    //5
	console.log(sum);   //5 sum在被初始化赋值时没用var关键字，调用完add()后，添加到全局变量的sum继续存在。

javascript执行代码时，会创建一个上下文执行环境，全局环境是最外围的环境。每个函数在被调用时都会创建自己的执行环境，当函数执行完，当前执行gg'f环境被销毁。每个执行环境都有一个与之关联的作用域链。在执行代码时，javascript引擎会通过搜索执行环境的作用域链来解析变量和函数名这样的标识符。解析过程从作用域链的前端开始，向上逐级查询与给定名字匹配的标识符，一旦找到标识符，搜索过程就停止，如果没找到该标识符，则沿作用域链继续向上搜索，一直搜索到全局对象，如果没有搜索到，则认为该标识符未定义。标识符在作用域链中位置越深，查找和访问它所需要时间越长，所以尽可能使用局部变量。

全局环境只能访问在全局环境中定义的的变量和函数，不能直接访问局部环境中的任何数据。

## 三、没有块级作用域 ##

	var a = 8;
	var foo = function() {
		console.log(a);     //undefined
		var a = 5;
		console.log(a);     //5
	}
	f();

因为局部变量在整个函数foo()内都有定义的，整个函数中隐藏了全局变量。虽然局部变量在整个函数体中有定义的，但在var语句之后，所以不会被初始化。所以最好在函数的顶部声明函数中所有用到的变量。

## 四、未定义的变量和未赋值的变量 ##

没有赋值的变量值为undefined，使用未定义的变量会引起错误。

	var a;
	console.log(a);     //undefined
	console.log(b);     //b is not defined 

## 五、垃圾收集（grabage collection） ##

javascrip具有自动垃圾收集机制，javascript解释器可以检测到何时程序不再使用一个对象，就把它所占用的内存释放掉。


