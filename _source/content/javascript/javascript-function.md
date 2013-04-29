# Javascript函数篇 - Javascript学习笔记（三）	

- date: 2011-07-03 22:33
- tags: 学习笔记,函数,javascript
- category: Javascript

----------------

## 一、函数的定义 ##

 1. 函数保留字function
 2. 函数名，可以被省略，可以用它的名字递归的调用自己
 3. 参数
 4. 函数主体,函数可以有return语句，也可以没有return语句。return语句可以停止函数的运行，并把表达式的值返给函数调用者。如果不包含return语句，函数只执行函数体中每条语句，然后返回undefined对函数调用者。

例：

	function add(num1, num2) {
		return num1 + num2;
	}

	//匿名函数
	var add = function(num1, num2) {
		return num1 + num2;
	}

	//递归调用
	function factorial(x) {
		if (x <= 1) {
			return 1;
		} else {
			return x*factorial(x-1);
		}
	}
	

## 二、匿名函数、函数的调用 ##

匿名函数就是没有名字的函数，也叫拉姆达函数。

	//函数声明
	function functionName(arg0, arg1, arg2) {
		//do something
	}
	
	//函数表达式
	var functionName = function(arg0, arg1, arg2) {
		//do something
	}
	
上面的两个例子在逻辑上等价，但是它们之间还是存在一些区别。函数声明与函数表达式的主要区别，就是前者会在代码执行以前加载到作用域中，而后者是代码执行到那一行时才会有定义。另一个重要的区别是，函数声明会会给函数指定一个名字，而函数表达式则是创建一个匿名函数，然后将这个匿名函数赋值给一个变量。


## 三、函数的调用 ##


### 3.1 方法调用模式 ###

当函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法调用时，this被绑定到该对象。

	var o = {
		value: 0,
		increment: function(inc) {
			this.value += typeof inc === 'number' ? inc : 1;  
		}
	};
	o.increment();
	console.log(o.value);   //1
	
	o.increment(2);
	console.log(o.value);   //3
	
	o.increment(5);
	console.log(o.value);   //8
	
	o.increment('test');
	console.log(o.value);   //9

方法可以用this去访问该对象，所以它能从对象中取值或修改该对象。通过this取得它们上下文的方法称为公用方法。

### 3.2 函数调用模式 ###

	var sum = add(2, 4);    //sum为6

当函数以该模式调用时，this被绑定到全局对象。解决方法：给该方法定义一个变量并赋值为this,那为内部函数就可以通过该变量访问到this。

	//函数调用模式
	var add = function(num1, num2) {
		return num1 + num2;
	}
	
	o.double = function() {
		var _self = this;
		
		var op = function() {
			_self.value = add(_self.value, _self.value);
		};
		
		op();
	}
	
	o.double();
	console.log(o.value);   //18

### 3.3 构造函数调用模式 ###

	//创建构造函数
	var Person = function(name) {
		this.name = name;
	}
	
	Person.prototype.get_name = function() {
		return this.name;
	}
	
	var driver = new Person('jack');
	console.log(driver.get_name());

### 3.4 apply模式 ###

apply方法构建一个参数数组并去调用函数。apply方法接收两个参数，第一个是绑定给this的值，第二个是参数数组。

	var arr = [11, 12];
	var sum = add.apply(null, arr);
	console.log(sum);       //23
	
	var teacher = {
		name: lucy
	};
	var name = Person.prototype.get_name.apply(teacher);
	console.log(name);      //lucy


## 四、this 的工作原理 ##

JavaScript 有一套完全不同于其它语言的对 this 的处理机制。 在五种不同的情况下 ，this 指向的各不相同。

### 4.1 全局范围内 ###

	this;

当在全部范围内使用 this，它将会指向全局对象。

### 4.2 函数调用 ###

	foo();

这里 this 也会指向全局对象。

### 4.3 调用构造函数 ###

	new foo();


如果函数倾向于和 new 关键词一块使用，则我们称这个函数是 构造函数。 在函数内部，this 指向新创建的对象。

### 4.4 显式的设置 this ###

	function foo(a, b, c) {}
	
	var bar = {};
	foo.apply(bar, [1, 2, 3]); // 数组将会被扩展，如下所示
	foo.call(bar, 1, 2, 3); // 传递到foo的参数是：a = 1, b = 2, c = 3

当使用 Function.prototype 上的 call 或者 apply 方法时，函数内的 this 将会被 显式设置为函数调用的第一个参数。

因此函数调用的规则在上例中已经不适用了，在foo 函数内 this 被设置成了 bar。