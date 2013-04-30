# Javascript对象篇 - Javascript学习笔记（二）

- date: 2011-06-27 22:10
- tags: javascrip,对象,学习笔记
- category: Javascript

----------------

对象(Object)是属性的无序集合，每个属性都有自己的名字和值，每个属性存放一个原始值、对象或函数。

javascript的原始类型包括数字、字符串、布尔值、null、undefined。其它所有值都是对象。javascript中，数组、函数、正则表达式都是对象。

## 一、创建对象 ##

 ### 1.1 new操作符后面跟Object构造函数

	var person = new object();

 ### 1.2 对象字面量表示法

	var empty = {};
	
	var person = {
		'first-name':'Nicholas',
		'last-name':'Zakas',
		'age':29
	};
	
	var flight = {
		airline: 'MU',
		number: 2769,
		departure: {
			IATA: 'NKG',
			time: '2011-06-30 07:45',
			city: 'Nanjing'
		},
		arrival: {
			IATA: 'XIY',
			time: '2011-06-30 09:45,
			city: 'XiAn'
		}
	};

## 二、检索 ##

检索方法，优先使用.表示法

	person['first-name']    //Nicholas
	flight.number           //2769
	person['job']           //undefined
	flight.status           //undefined

用||运算符来填充默认值

	var job = person['job'] || 'none';
	var status = flight.status || 'unkown';

尝试检索一个undefined值会导致异常

	flight.equipment                            //undefined
	flight.equipment.model                      //throw 'TypeError'
	flight.equipment && flight.equipment.model  //undefined

## 三、更新 ##

属性存在于对象中，属属性值将被替换

	person['age'] = 32;

如果对象没有该属性名，则该属性名将被添加到对象中

	person.job = 'Software Engineer';

删除属性

    delete person.age

删除属性不仅仅是将属性值设置为undefined，实际上从对象上移除了属性。

## 四、引用 ##

对象通过引用来传值，它们永远不会被拷贝。

	var x = person;
	x.job = 'Software Engineer';
	var job = person.job;     //x和person引用同一对象，job为'Software Engineer'
	
	var a = {}, b = {}, c = {};     //a b c 引用不同的空对象
	
	var a = b = c = {};     //a、b、c引用同一空对象

## 五、反射 ##

typeof操作符确定属性类型

	typeof flight.number    //'number'
	typeof flight.status    //'string'
	typeof flight.arrival   //'Object'
	typeof flight.manifest  //'undefined'

原型链中任何属性也会产生一个值

	typeof flight.toString      //function
	typeof  flight.constructor  //'function'

另一个方法，hasOwnProperty方法

	flight.hasOwnProperty('number')     //true
	flight.hasOwnProperty(constructor)  //false

## 六、枚举 ##

for in 语句遍历对象中的所有属性名。hasOwnProperty和typeof排除函数、原型链中的属性和不想要的值。

	var name;
	for (name in person) {
		if (typeof person[name] !== 'function') {
			console.log(name+':'+ person[name]);
		}
	}

上面属性名出现的顺序是不确定的。如果要以特定的顺序出现，可以使用数组：

	var i;
	var properties = [
		'last-name',
		'fist-name',
		'age'
	];
	var len = properties.length;
	for (i = 0; i < len; i++) {
		console.log(properties[i]+':'+person[properties[i]]);
	}

--add

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

## 七、删除 ##

	delete person.age
	person.age              //undefined

## 八、通用Object属性和方法 ##

### 属性 ###

在javascript中，每一下对象都有一个constructor属性，它引用了初始化这个对象的构造函数。

### 方法 ###

	person.toString();
	person.valueOf();
	person.hasOwnProperty('age');

//如果isPrototypeOf()所属的对象是参数的原型对象，则返回true

	var  o = {};
	console.log(Object.prototype.isPrototypeOf(o)); //true o.constructor == Object
	console.log(Object.isPrototypeOf(o)); //false
	console.log(o.isPrototypeOf(Object.prototype)); //false
	console.log(Function.prototype.isPrototypeOf(Object)); //true Object.constructor == Function

## 九、减少全局变量污染 ##

	var APP = {};
	
	APP.person = {
		'first-name':'Nicholas',
		'last-name':'Zakas',
		'age':29
	
	};
	APP.flight = {
		airline: 'MU',
		number: 2769,
		departure: {
			IATA: 'NKG',
			time: '2011-06-30 07:45',
			city: 'Nanjing'
		},
		arrival: {
			IATA: 'XIY',
			time: '2011-06-30 09:45,
			city: 'XiAn'
		}
	};
