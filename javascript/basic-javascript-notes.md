# Javascript基础 - Javascript学习笔记（一）

- date: 2011-06-21 22:23
- tags: javascript,学习笔记
- category: Javascript

----------------

## 一、数据类型 ##

* 原始值(primitive value) 是存储在栈(stack)中的简单数据段，也就是说，他们的值直接存储在变量的访问的位置。(ECMAScript有五种原始类型：Undefined、Null、Boolean、Number和String。) 
* 引用值(reference value) 是存储在堆(heap)中的对象，也就是说存储的值是一个指针(point)，指向存储对象的内存处。(对象，数组函数属于引用类型)



### 1）数字 ###

### 2）字符串 ###

数字转换字符串：

	var i = 138;
	
	//三种方法
	var s1 = i + '';
	var s2 = String(i);
	var s3 = i.toString();
	console.log(typeof(i)); //number
	console.log(typeof(s1)); //string
	console.log(typeof(s2)); //string
	console.log(typeof(s3)); //string
	
	//二进制、八进制、十六进制
	var s4 = i.toString(2);
	var s5 = i.toString(8);
	var s6 = i.toString(16);
	
	console.log(s4);    //10001010
	console.log(s5);    //212
	console.log(s6);    //8a

字符串转换数字：

	var s = '22 years old';
	var i = s - 0;      //注：给一个字符串加0则导致字符串连接
	var j = Number(i);
	var k = parseInt(s);   
	var l = parseFloat(s);
	
	console.log(typeof(s)); //string
	console.log(typeof(i)); //number
	console.log(typeof(j)); //number

parseInt和parseFloat可以从字符串开始处转换和返回任何数字，忽略或舍去非数字部分。parseInt只截取整数，parseFloat截取整数和浮点数。如果是以0x或0X开头，parseInt将其解释为16进制数字。

字符串链接用+号：

	var longString = 'here is the strory, of a ' +
					 'man named bingdian.'

### 3）布尔值 ###

### 4）null ###

null是一个特殊值，在下列场景应使用null:

* 用来初始化一个变量，这个变量可能赋值为一个对象
* 用来和一个已经初始化的变量比较，这个变量可以是也可以不是一个对象
* 当函数的参数期望是对象时，用作参数传入
* 当函数的返回值期望是对象时，用作返回值传出

下面的场景不应当使用null:

* 不要用null来检测是否传入了某个参数
* 不要用null来检测一个未初始化的变量

示例代码：

	// 好的用法
	var person = null;
	
	// 好的用法
	function getPerson() {
		if ( condition ) {
			return new Person('bingdian');
		} else {
			return null;
		}
	}
	
	// 好的用法
	var person = getPerson();
	if ( person !=== null ) {
		doSomething();
	}
	
	// 不好的用法，用来和未初始化的变量比较
	var person;
	if ( person	 != null ) {
		doSomething();
	}
	
	// 不好的用法 ，检测是否传入了参数
	function doSomething(arg1, arg2, arg3, arg4) {
		if ( arg4 != null ) {
			doSomethingElse();
		}
	}
	
理解null的最好的方式是将它当做是对象的占位符(placeholder)。

### 5）undefined ###

undefined是一个特殊值，容易和null搞混，undefined == null为true,这两个值的用途各不相同。

没有被初始化的变量都有一个初始值，即undefined，表示这个变量等待被赋值。

	//不好的写法
	var person;
	console.log(person === undefined);//true
	
尽管这段代码能正常工作，但建议避免在代码中使用undefined。这个值常常和返回"undefined"的typeof运算符混淆。typeof不管理undefined的变量还是未声明的变量，运算结果都是"undefined":

	//foo未声明
	var person;
	console.log(typeof person); //"undefined"
	console.log(typeof foo); //"undefined"

通过禁止使用特殊值undefined,可以确保只有一种情况下typeof才会返回"undefined":当变量未声明时。


### 6）函数 ###

### 7）对象 ###

### 8）数组 ###

### 9）Date对象 ###

### 10）正则表达式 ###

### 11）Error对象 ###


## 二、变量 ##

### 1）变量声明 ###

变量用关键字var来声明，如：

	var i,
		num,
		a, b,
		name ='bingdian';
		
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

使用一个未声明的变量，会引发错误。

### 2）变量作用域 ### 

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

### 3）没有块级作用域 ### 

	var a = 8;
	var foo = function() {
		console.log(a);     //undefined
		var a = 5;
		console.log(a);     //5
	}
	f();

因为局部变量在整个函数foo()内都有定义的，整个函数中隐藏了全局变量。虽然局部变量在整个函数体中有定义的，但在var语句之后，所以不会被初始化。所以最好在函数的顶部声明函数中所有用到的变量。

### 4）未定义的变量和未赋值的变量 ### 

没有赋值的变量值为undefined，使用未定义的变量会引起错误。

	var a;
	console.log(a);     //undefined
	console.log(b);     //b is not defined


### 5）垃圾收集（grabage collection）###

javascrip具有自动垃圾收集机制，javascript解释器可以检测到何时程序不再使用一个对象，就把它所占用的内存释放掉。


## 三、运算符 ##

### 1）算术运算符 ###

加法运算符(+)

减法法运算符(-)

乘法法运算符(*)

除法法运算符(/)

模运算符(%),取模运算符通常是整数，但它也适用于浮点数。

加法运算符(+)

递增运算符(++)

	i = 1;
	j = ++i;
	console.log(i); //2
	console.log(j); //2
	
	i = 1;
	j = i++;
	console.log(i); //2
	console.log(j); //1

递减运算符(--)

	i = 1;
	j = --i;
	console.log(i); //0
	console.log(j); //0
	
	i = 1;
	j = i--;
	console.log(i); //0
	console.log(j); //1


### 2）相等运算符 ###

*==相等运算符允许类型转换，检测两个运算符是否相等。*

* 如果两个值具有相同的类型，检测它们的等同性，如果两个值完全相同，则它们相等。
* 如果两个值具有不同的类型：
    * 如果一个是null,一个是undefined，它们相等
    * 如果一个是数字，一个是字符串，将字符串转换为数字比较
    * 如果一个是true，将它转换为1比较。如是一个是false，将它转换为0比较。
    * 如果一个值是对象，另一个是数字或字符串，将对象转换为原始类型值，再进行比较。可以使用对象的toString或valueOf转换。

JavaScript 是弱类型语言，这就意味着，等于操作符会为了比较两个值而进行强制类型转换。
	
	""           ==   "0"           // false
	0            ==   ""            // true
	0            ==   "0"           // true
	false        ==   "false"       // false
	false        ==   "0"           // true
	false        ==   undefined     // false
	false        ==   null          // false
	null         ==   undefined     // true
	" \t\r\n"    ==   0             // true

上面的展示了强类型转换，这也是使用 == 被广泛认为是不好编程习惯的主要原因， 由于它的复杂转换规则，会导致难以跟踪的问题。

此外，强制类型转换也会带来性能消耗，比如一个字符串为了和一个数组进行比较，必须事先被强制转换为数字。

### 3)===完全等同

* 两个值类型不同，它们就不同
* 如果两个值都是数字，除非其中一个或两个者是NaN，否则他们是等同的。
* 如果两个值都是字符串，而且同一位置上的字符完全相同，那么它们就完全等同。
* 两个值都是布尔值true或者都是false，那么它们等同。
* 两个值引用同一对象、数组或函数，它们完全等同。如果引用不同对象，它们就不等同。
* 如果两个值者是null或者都是undefined，它们完全相同。

	{} === {};                   // false
	new String('foo') === 'foo'; // false
	new Number(10) === 10;       // false
	var foo = {};
	foo === foo;                 // true

这里等于运算符比较的不是值是否相等，而是是否属于同一个身份；也就是说，只有对象的同一个实例才被认为是相等的。


### 4）关系运算符 ###

>、>=、<、<=

比较运算符只能在数字和字符串上进行，如果不是数字或字符串的运算数将被转换成数字或字符串。


### 5）in运算符 ###

in左边的运算数是一字符串或者可以被转为为字符串，右边运算数是一个对象或数组，如果左边的值是右边对象的一个属性名，则返回true。

### 6）typeof运算符 ###

typeof 操作符（和 instanceof 一起）或许是 JavaScript 中最大的设计缺陷， 因为几乎不可能从它们那里得到想要的结果

	Value               Class      Type
	-------------------------------------
	"foo"               String     string
	new String("foo")   String     object
	1.2                 Number     number
	new Number(1.2)     Number     object
	true                Boolean    boolean
	new Boolean(true)   Boolean    object
	new Date()          Date       object
	new Error()         Error      object
	[1,2,3]             Array      object
	new Array(1, 2, 3)  Array      object
	new Function("")    Function   function
	/abc/g              RegExp     object (function in Nitro/V8)
	new RegExp("meow")  RegExp     object (function in Nitro/V8)
	{}                  Object     object
	new Object()        Object     object

上面代码中，Type 一列表示 typeof 操作符的运算结果。可以看到，这个值在大多数情况下都返回 "object"。

Class 一列表示对象的内部属性 [[Class]] 的值。

	JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.

为了获取对象的 [[Class]]，我们需要使用定义在 Object.prototype 上的方法 toString。

	console.log(Object.prototype.toString.call([]));  // "[object Array]"
	console.log(Object.prototype.toString.call({}));  // "[object Object]"
	console.log(Object.prototype.toString.call(2));   // "[object Number]"

为了检测一个对象的类型，强烈推荐使用 Object.prototype.toString 方法； 因为这是唯一一个可依赖的方式。正如上面表格所示，typeof 的一些返回值在标准文档中并未定义， 因此不同的引擎实现可能不同。

除非为了检测一个变量是否已经定义，我们应尽量避免使用 typeof 操作符。

### 7）instanceof运算符 ###

instanceof左边的运算数是一个对象，右边运算数是一个对象类的名字，如果左边的对象是右边类的一个实例，则返回true。

比较自定义对象：

	function Foo() {}
	function Bar() {}
	Bar.prototype = new Foo();
	
	new Bar() instanceof Bar; // true
	new Bar() instanceof Foo; // true
	
	// 如果仅仅设置 Bar.prototype 为函数 Foo 本身，而不是 Foo 构造函数的一个实例
	Bar.prototype = Foo;
	new Bar() instanceof Foo; // false


instanceof 比较内置类型：

	new String('foo') instanceof String; // true
	new String('foo') instanceof Object; // true
	
	'foo' instanceof String; // false
	'foo' instanceof Object; // false 

instanceof 运算符应该仅仅用来比较来自同一个 JavaScript 上下文的自定义对象。


### 8）字符串运算符 ###

+

### 9）逻辑运算符 ###

&& 、 || 、！

### 10）条件运算符 ###

?:

### 11）其它运算符 ###

对象创建运算符new

delete运算符

数组对象存取运算符[]、.


## 四、语句 ##

### 1）if ###

### 2）else if ###

### 3）switch ###

	switch(n) {
		case 1: 
		//do something
		break;
	
		case 2: 
		//do something
		break;
	
		case 3: 
		//do something
		break;
	
		case 4: 
		//do something
		break;
	
		default:
		//do something
		break;
	}

### 4）while ###

	var count = 0;
	while (count < 10) {
		console.log(count++);
	}

### 5）do while ###

	var count = 0;
	do {
		console.log(count++);
	} while (count < 10)

### 6）for ###

	for (var i = 0; i < 10; i++) {
		console.log(i);
	}


### 7）for in ###

	Object.prototype.bar = 1;
	
	var person = {
		'name': 'bingdian',
		'age': '25'
	}
	
	for (i in person) {
		console.log(i + ':' + person[i]);
	}
	//name:bingdian
	//age:25
	//bar:1

和 in 操作符一样，for in 循环同样在查找对象属性时遍历原型链上的所有属性。

由于不可能改变 for in 自身的行为，因此有必要过滤出那些不希望出现在循环体中的属性， 这可以通过 Object.prototype 原型上的 hasOwnProperty 函数来完成。

	Object.prototype.bar = 1;
	
	var person = {
		'name': 'bingdian',
		'age': '25'
	}
	
	for (i in person) {
		if (person.hasOwnProperty(i)) {
			console.log(i + ':' + person[i]);
		}
	}
	//name:bingdian
	//age:25

推荐总是使用 hasOwnProperty。不要对代码运行的环境做任何假设，不要假设原生对象是否已经被扩展了。
