# [译文]Jquery 插件设计模式

- date: 2012-11-23
- tags: jquery, plugin, patterns, 设计模式, 译文
- category: jquery

----------------

原文：http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/ By [Addy Osmani](http://addyosmani.com/blog/)

译者注：目前还有部分内容没有翻译出来，如翻译有误，敬请指正，也欢迎你来和我一起翻译。

我前面写过[javascript 设计模式](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)，它为javascript开发中的一些常见问题提供了很好的解决方案，使用这些设计模式将使你的开发获益良多。众所周知，javascript 设计模式非常有用，另一方面得益于它自己的设计模式：jquery 插件。 官方的[jQuery 插件开发指南](http://docs.jquery.com/Plugins/Authoring) 可以作为学习编写插件的一个很好的开始。在这篇文章中我们将更深入了解jquery插件开发技巧。

jquery插件开发经过这几年的不断发展，我们现在很少只使用一种方式来编写插件。事实上，使用特定的设计模式在某些解决某些特定问题或场景，比其它模式更为有效。

一些开发人员可能希望使用jQuery UI 组件 工厂模式（the jQuery UI widget factory），这种模式适合复杂、灵活的UI组件。另外一些开发人员可能喜欢像模块(类似模块模式)一样组织他们的代码，或者使用更正式的模块模式如[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)(asynchronous module definition) 。还有一些开发人员希望他们的插件使用javascript强大的原型继承。还有另外一些开发人员可能想使用自定义的事件或发布/订阅(pub/sub)使插件和app之间通信。等等...

我注意到一些开发者尝试创建一种通用的jquery插件模板（one-size-fits-all jQuery plugin boilerplate）, 这引发了我的思考。理论上来说，使用统一模板（boilerplate）是一个很好的想法，然而，实际开发中，我们很少只使用一种模式来开发插件。

假如你自己动手编写过一些jquery插件，它们运行良好，但是，你可能会觉得它可以有更好的代码组织结构，它可以更灵活，解决更多的问题。这听起来很熟悉，你不确定不同的jquery插件模式之间的差异，你会发现我后面将要讲的内容非常有用。

这篇文章不会为你提供所有问题的解决方案，但是它覆盖了所有开发人员在使用的流行的设计模式。

注：这篇文章主要面向由中高级的开发人员。如果你觉得还没准备好，推荐你可以先看官方的[jQuery 插件开发指南](http://docs.jquery.com/Plugins/Authoring) 、Ben Alman的[plugin style guide](http://msdn.microsoft.com/en-us/scriptjunkie/ff696759)和Remy Sharp的[Signs of a Poorly Written jQuery Plugin](http://remysharp.com/2010/06/03/signs-of-a-poorly-written-jquery-plugin/)。


## 模式(Patterns)

jQuery插件定义了很少的规则，而这也是为什么这些插件方法多种多样的原因之一。最简单的，你可以为jquery的$.fn对象添加一个方法，如：

    $.fn.myPluginName = function() {
        // your plugin logic
    };
    
前面的方法很间单，不过下面的这种方法会更好一些：


    (function( $ ){
        $.fn.myPluginName = function() {
            // your plugin logic
        };
    })( jQuery );

这里，我们在插件代码内嵌到一个匿名函数中，使用匿名函数创建了一个闭包，将jQuery这个全局变量传入匿名函数，并执行匿名函数。这样可以确保$不会和其它的javascript库冲突，避免$变量和页面中的全局变量冲突。

还有另外一种写法是使用$.extend，使用这种方法一次可以定义多个方法，这在有些场景下非常有用：

    (function( $ ){
        $.extend($.fn, {
            myplugin: function(){
                // your plugin logic
            }
        });
    })( jQuery );


对此，我们可以做一些改进。首先，我们来看第一个完整的模式 - 轻量级的模式（the lightweight pattern），这种模式覆盖了我们日常插件开发的一些最佳实践和常见问题。

**注意：**

你可在<del>[jquery-plugin-patterns](https://github.com/addyosmani/jquery-plugin-patterns/)</del>(翻译本文时，项目已经迁移到[jquery-boilerplate/patterns](https://github.com/jquery-boilerplate/patterns))这个项目找到这篇文章里面谈到的设计模式。

虽然，这篇文章会对每一种模式做讲解，但是还是建议阅读代码中的注释，注释可以让你更深入的了解为什么使用这种做法是最好的。

另外，如果有兴趣的话也可以读一下每种模式后面的扩展内容。

## 简单的开始(A Lightweight Start)

首先，我们先来看一些基本的、遵循最佳实践(包括jQuery插件编写指南)的设计模式。这种模式在开发一个新的插件或实现一些简单插件时非常理想。轻量级的插件模式遵循了下面的一些原则: 

 * 常见的最佳做法，如函数的调用前使用一个分号; window, document, undefined作为参数传入;遵循jQuery风格规范。
 * 插件默认配置。
 * 一个简单的插件的构造函数,用于逻辑相关的初始化和委派元素处理。
 * 使插件的配置可扩展。
 * 避免创建多个实例。


代码：

    /*!
     * jQuery lightweight plugin boilerplate
     * Original author: @ajpiano
     * Further changes, comments: @addyosmani
     * Licensed under the MIT license
     */
    
    // the semi-colon before the function invocation is a safety 
    // net against concatenated scripts and/or other plugins 
    // that are not closed properly.
    ;(function ( $, window, document, undefined ) {
        
        // undefined is used here as the undefined global 
        // variable in ECMAScript 3 and is mutable (i.e. it can 
        // be changed by someone else). undefined isn't really 
        // being passed in so we can ensure that its value is 
        // truly undefined. In ES5, undefined can no longer be 
        // modified.
        
        // window and document are passed through as local 
        // variables rather than as globals, because this (slightly) 
        // quickens the resolution process and can be more 
        // efficiently minified (especially when both are 
        // regularly referenced in your plugin).
    
        // Create the defaults once
        var pluginName = 'defaultPluginName',
            defaults = {
                propertyName: "value"
            };
    
        // The actual plugin constructor
        function Plugin( element, options ) {
            this.element = element;
    
            // jQuery has an extend method that merges the 
            // contents of two or more objects, storing the 
            // result in the first object. The first object 
            // is generally empty because we don't want to alter 
            // the default options for future instances of the plugin
            this.options = $.extend( {}, defaults, options) ;
            
            this._defaults = defaults;
            this._name = pluginName;
            
            this.init();
        }
    
        Plugin.prototype.init = function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element 
            // and this.options
        };
    
        // A really lightweight plugin wrapper around the constructor, 
        // preventing against multiple instantiations
        $.fn[pluginName] = function ( options ) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, 
                    new Plugin( this, options ));
                }
            });
        }
    
    })( jQuery, window, document );
    
**扩展阅读**

 * [Plugins/Authoring](http://docs.jquery.com/Plugins/Authoring), jQuery
 * [Signs of a Poorly Written jQuery Plugin](http://remysharp.com/2010/06/03/signs-of-a-poorly-written-jquery-plugin/), Remy Sharp
 * [How to Create Your Own jQuery Plugin](http://msdn.microsoft.com/en-us/scriptjunkie/ff608209), Elijah Manor
 * [Style in jQuery Plugins and Why It Matters](http://msdn.microsoft.com/en-us/scriptjunkie/ff696759), Ben Almon
 * [Create Your First jQuery Plugin, Part 2](http://enterprisejquery.com/2010/07/create-your-first-jquery-plugin-part-2-revising-your-plugin/), Andrew Wirick


## 完整的 Widget factory(“Complete” Widget Factory)

代码：

    /*!
     * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
     * Author: @addyosmani
     * Further changes: @peolanha
     * Licensed under the MIT license
     */
    
    
    ;(function ( $, window, document, undefined ) {
    
        // define your widget under a namespace of your choice
        //  with additional parameters e.g. 
        // $.widget( "namespace.widgetname", (optional) - an 
        // existing widget prototype to inherit from, an object 
        // literal to become the widget's prototype ); 
    
        $.widget( "namespace.widgetname" , {
    
            //Options to be used as defaults
            options: {
                someValue: null
            },
    
            //Setup widget (eg. element creation, apply theming
            // , bind events etc.)
            _create: function () {
    
                // _create will automatically run the first time 
                // this widget is called. Put the initial widget 
                // setup code here, then you can access the element 
                // on which the widget was called via this.element. 
                // The options defined above can be accessed 
                // via this.options this.element.addStuff();
            },
    
            // Destroy an instantiated plugin and clean up 
            // modifications the widget has made to the DOM
            destroy: function () {
    
                // this.element.removeStuff();
                // For UI 1.8, destroy must be invoked from the 
                // base widget
                $.Widget.prototype.destroy.call(this);
                // For UI 1.9, define _destroy instead and don't 
                // worry about 
                // calling the base widget
            },
    
            methodB: function ( event ) {
                //_trigger dispatches callbacks the plugin user 
                // can subscribe to
                // signature: _trigger( "callbackName" , [eventObject], 
                // [uiObject] )
                // eg. this._trigger( "hover", e /*where e.type == 
                // "mouseenter"*/, { hovered: $(e.target)});
                this._trigger('methodA', event, {
                    key: value
                });
            },
    
            methodA: function ( event ) {
                this._trigger('dataChanged', event, {
                    key: value
                });
            },
    
            // Respond to any changes the user makes to the 
            // option method
            _setOption: function ( key, value ) {
                switch (key) {
                case "someValue":
                    //this.options.someValue = doSomethingWith( value );
                    break;
                default:
                    //this.options[ key ] = value;
                    break;
                }
    
                // For UI 1.8, _setOption must be manually invoked 
                // from the base widget
                $.Widget.prototype._setOption.apply( this, arguments );
                // For UI 1.9 the _super method can be used instead
                // this._super( "_setOption", key, value );
            }
        });
    
    })( jQuery, window, document );

**扩展阅读**

 * [The jQuery UI Widget Factory](http://ajpiano.com/widgetfactory/#slide1)
 * [Introduction to Stateful Plugins and the Widget Factory](http://msdn.microsoft.com/en-us/scriptjunkie/ff706600)，Doug Neiner
 * [Widget Factory(explained)](http://wiki.jqueryui.com/w/page/12138135/Widget%20factory) Scott Gonzalez
 * [Understanding jQuery UI Widgets: A Tutorial](http://bililite.com/blog/understanding-jquery-ui-widgets-a-tutorial/)，Hacking at 0300


## 命名空间和嵌套的命名空间

使用命名空间可以避免你的代码和和全局变量或对象冲突。命名空间可以保护你的插件不会被页面上的其它同名变量或者和你的插件同名的插件破坏。同样，你也不要使其它开发者的脚本无法运行。

JavaScript没有其它语言一样的内置了命名空间，但很容易使用对象来模拟命名空间。可以将一个顶级对象作为你的命名空间，可以在一开始先检查这个对象是否存在，如果不存在就定义它，如果存在，你直接可以扩展它。

对象（确切地说，对象字面量）可以用来创建嵌套的命名空间，如namespace.subnamespace.pluginName等。

    /*!
     * jQuery namespaced 'Starter' plugin boilerplate
     * Author: @dougneiner
     * Further changes: @addyosmani
     * Licensed under the MIT license
     */
    
    ;(function ( $ ) {
        if (!$.myNamespace) {
            $.myNamespace = {};
        };
    
        $.myNamespace.myPluginName = function ( el, myFunctionParam, options ) {
            // To avoid scope issues, use 'base' instead of 'this'
            // to reference this class from internal events and functions.
            var base = this;
    
            // Access to jQuery and DOM versions of element
            base.$el = $(el);
            base.el = el;
    
            // Add a reverse reference to the DOM object
            base.$el.data( "myNamespace.myPluginName" , base );
    
            base.init = function () {
                base.myFunctionParam = myFunctionParam;
    
                base.options = $.extend({}, 
                $.myNamespace.myPluginName.defaultOptions, options);
    
                // Put your initialization code here
            };
    
            // Sample Function, Uncomment to use
            // base.functionName = function( paramaters ){
            // 
            // };
            // Run initializer
            base.init();
        };
    
        $.myNamespace.myPluginName.defaultOptions = {
            myDefaultValue: ""
        };
    
        $.fn.mynamespace_myPluginName = function 
            ( myFunctionParam, options ) {
            return this.each(function () {
                (new $.myNamespace.myPluginName(this, 
                myFunctionParam, options));
            });
        };
    
    })( jQuery );




**扩展阅读**
 
 * [Namespacing in JavaScript](http://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/),Angus Croll
 * [Use Your $.fn jQuery Namespace](http://ryanflorence.com/use-your-fn-jquery-namespace/),Ryan Florence
 * [JavaScript Namespacing](http://michaux.ca/articles/javascript-namespacing),Peter Michaux
 * [Modules and namespaces in JavaScript](http://www.2ality.com/2011/04/modules-and-namespaces-in-javascript.html),Axel Rauschmayer


## Pub/Sub自定义事件

你可能在开发异步JavaScript应用时使用过观察者模式（ 又名发布-订阅者模式(Pub/Sub) pattern）。观察者模式的本质是对应用中某个对象状态进行观察，并且在其发生改变时能够对通知做出响应。

在jQuery中，jquery提供的自定义事件和观察者模式很类似，bind('eventType')相当于subscribe('eventType')，trigger('eventType')相当于publish('eventType')。

一些开发者可能认为jQuery事件系统作为发布和订阅系统使用开销太大，但是它的构架在多数情况下非常健壮和稳定。在 jQuery UI widget factory 模板中，我们实现了一个基本的自定义事件的发布/订阅模式：

    /*!
     * jQuery custom-events plugin boilerplate
     * Author: DevPatch
     * Further changes: @addyosmani
     * Licensed under the MIT license
     */
    
    // In this pattern, we use jQuery's custom events to add 
    // pub/sub (publish/subscribe) capabilities to widgets. 
    // Each widget would publish certain events and subscribe 
    // to others. This approach effectively helps to decouple 
    // the widgets and enables them to function independently.
    
    ;(function ( $, window, document, undefined ) {
        $.widget("ao.eventStatus", {
            options: {
    
            },
            
            _create : function() {
                var self = this;
    
                //self.element.addClass( "my-widget" );
    
                //subscribe to 'myEventStart'
                self.element.bind( "myEventStart", function( e ) {
                    console.log("event start");
                });
    
                //subscribe to 'myEventEnd'
                self.element.bind( "myEventEnd", function( e ) {
                    console.log("event end");
                });
    
                //unsubscribe to 'myEventStart'
                //self.element.unbind( "myEventStart", function(e){
                    ///console.log("unsubscribed to this event"); 
                //});
            },
    
            destroy: function(){
                $.Widget.prototype.destroy.apply( this, arguments );
            },
        });
    })( jQuery, window , document );
    
    //Publishing event notifications
    //usage: 
    // $(".my-widget").trigger("myEventStart");
    // $(".my-widget").trigger("myEventEnd");


**扩展阅读**

 * [Communication Between jQuery UI Widgets](),Benjamin Sternthal
 * [Understanding the Publish/Subscribe Pattern for Greater JavaScript Scalability](),Addy Osmani

## 带桥接模式的原型继承

在javascript中，没有类的概念。但是，我们可以使用javascript的原型继承，我们可以在juqery插件开发中使用原型继承。

[Alex Sexton](http://alexsexton.com/) 和 [Scott Gonzalez](http://scottgonzalez.com/)已经详细的谈过这个话题。简而言之,使用桥接模式可以弱化它和使用它的类和对象之间的耦合。另外，桥接模式有助于保持API的简洁，你可以更容易的对你的插件进行单元测试。

在Sexton的文章中，他实现了一个可以让你添加自己的逻辑代码的桥接模式模板，你可以看下面的代码了解更多。这种模式的另一个优点你不必不断重复相同的插件初始化代码。一些开发人员可能觉得这种模式比其它模式更容易阅读：

    /*!
     * jQuery prototypal inheritance plugin boilerplate
     * Author: Alex Sexton, Scott Gonzalez
     * Further changes: @addyosmani
     * Licensed under the MIT license
     */
    
    
    // myObject - an object representing a concept that you want 
    // to model (e.g. a car)
    var myObject = {
      init: function( options, elem ) {
        // Mix in the passed-in options with the default options
        this.options = $.extend( {}, this.options, options );
    
        // Save the element reference, both as a jQuery
        // reference and a normal reference
        this.elem  = elem;
        this.$elem = $(elem);
    
        // Build the DOM's initial structure
        this._build();
    
        // return this so that we can chain and use the bridge with less code.
        return this;
      },
      options: {
        name: "No name"
      },
      _build: function(){
        //this.$elem.html('<h1>'+this.options.name+'</h1>');
      },
      myMethod: function( msg ){
        // You have direct access to the associated and cached
        // jQuery element
        // this.$elem.append('<p>'+msg+'</p>');
      }
    };
    
    
    // Object.create support test, and fallback for browsers without it
    if ( typeof Object.create !== 'function' ) {
        Object.create = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }
    
    
    // Create a plugin based on a defined object
    $.plugin = function( name, object ) {
      $.fn[name] = function( options ) {
        return this.each(function() {
          if ( ! $.data( this, name ) ) {
            $.data( this, name, Object.create(object).init( 
            options, this ) );
          }
        });
      };
    };
    
    // Usage:
    // With myObject, we could now essentially do this:
    // $.plugin('myobj', myObject);
    
    // and at this point we could do the following
    // $('#elem').myobj({name: "John"});
    // var inst = $('#elem').data('myobj');
    // inst.myMethod('I am a method');

**扩展阅读**

 * [Using Inheritance Patterns To Organize Large jQuery Applications](http://alexsexton.com/?p=51),Alex Sexton
 * [How to Manage Large Applications With jQuery or Whatever](http://www.slideshare.net/SlexAxton/how-to-manage-large-jquery-apps), Alex Sexton
 * [Practical Example of the Need for Prototypal Inheritance](http://blog.bigbinary.com/2010/03/12/pratical-example-of-need-for-prototypal-inheritance.html),Neeraj Singh
 * [Prototypal Inheritance in JavaScript](http://javascript.crockford.com/prototypal.html),Douglas Crockford


## jQuery UI Widget Factory Bridge

    /*!
     * jQuery UI Widget factory "bridge" plugin boilerplate
     * Author: @erichynds
     * Further changes, additional comments: @addyosmani
     * Licensed under the MIT license
     */
    
    // a "widgetName" object constructor
    // required: this must accept two arguments,
    // options: an object of configuration options
    // element: the DOM element the instance was created on
    var widgetName = function( options, element ){
      this.name = "myWidgetName";
      this.options = options;
      this.element = element;
      this._init();
    }
    
    
    // the "widgetName" prototype
    widgetName.prototype = {
        
        // _create will automatically run the first time this 
        // widget is called
        _create: function(){
            // creation code
        },
    
        // required: initialization logic for the plugin goes into _init
        // This fires when your instance is first created and when 
        // attempting to initialize the widget again (by the bridge)
        // after it has already been initialized.
        _init: function(){
            // init code
        },
    
        // required: objects to be used with the bridge must contain an 
        // 'option'. Post-initialization, the logic for changing options
        // goes here. 
        option: function( key, value ){
            
            // optional: get/change options post initialization
            // ignore if you don't require them.
            
            // signature: $('#foo').bar({ cool:false });
            if( $.isPlainObject( key ) ){
                this.options = $.extend( true, this.options, key );
            
            // signature: $('#foo').option('cool'); - getter
            } else if ( key && typeof value === "undefined" ){
                return this.options[ key ];
                
            // signature: $('#foo').bar('option', 'baz', false);
            } else {
                this.options[ key ] = value;
            }
            
            // required: option must return the current instance. 
            // When re-initializing an instance on elements, option 
            // is called first and is then chained to the _init method.
            return this;  
        },
    
        // notice no underscore is used for public methods
        publicFunction: function(){ 
            console.log('public function');
        },
    
        // underscores are used for private methods
        _privateFunction: function(){ 
            console.log('private function');
        }
    };
    
    
    // usage:
    
    // connect the widget obj to jQuery's API under the "foo" namespace
    // $.widget.bridge("foo", widgetName);
    
    // create an instance of the widget for use
    // var instance = $("#elem").foo({
    //     baz: true
    // });
    
    // your widget instance exists in the elem's data
    // instance.data("foo").element; // => #elem element
    
    // bridge allows you to call public methods...
    // instance.foo("publicFunction"); // => "public method"
    
    // bridge prevents calls to internal methods
    // instance.foo("_privateFunction"); // => #elem element

**扩展阅读**

 * [Using $.widget.bridge Outside of the Widget Factory](http://erichynds.com/jquery/using-jquery-ui-widget-factory-bridge/),Eric Hynds


## jQuery Mobile Widgets With The Widget factory

 
    /*!
     * (jQuery mobile) jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
     * Author: @scottjehl
     * Further changes: @addyosmani
     * Licensed under the MIT license
     */
    
    ;(function ( $, window, document, undefined ) {
    
        //define a widget under a namespace of your choice
        //here 'mobile' has been used in the first parameter
        $.widget( "mobile.widgetName", $.mobile.widget, {
    
            //Options to be used as defaults
            options: {
                foo: true,
                bar: false
            },
    
            _create: function() {
                // _create will automatically run the first time this 
                // widget is called. Put the initial widget set-up code 
                // here, then you can access the element on which 
                // the widget was called via this.element
                // The options defined above can be accessed via 
                // this.options
    
                //var m = this.element,
                //p = m.parents(":jqmData(role='page')"),
                //c = p.find(":jqmData(role='content')")
            },
    
            // Private methods/props start with underscores
            _dosomething: function(){ ... },
    
            // Public methods like these below can can be called 
                    // externally: 
            // $("#myelem").foo( "enable", arguments );
    
            enable: function() { ... },
    
            // Destroy an instantiated plugin and clean up modifications 
            // the widget has made to the DOM
            destroy: function () {
                //this.element.removeStuff();
                // For UI 1.8, destroy must be invoked from the 
                // base widget
                $.Widget.prototype.destroy.call(this);
                // For UI 1.9, define _destroy instead and don't 
                // worry about calling the base widget
            },
    
            methodB: function ( event ) {
                //_trigger dispatches callbacks the plugin user can 
                // subscribe to
                //signature: _trigger( "callbackName" , [eventObject],
                //  [uiObject] )
                // eg. this._trigger( "hover", e /*where e.type == 
                // "mouseenter"*/, { hovered: $(e.target)});
                this._trigger('methodA', event, {
                    key: value
                });
            },
    
            methodA: function ( event ) {
                this._trigger('dataChanged', event, {
                    key: value
                });
            },
    
            //Respond to any changes the user makes to the option method
            _setOption: function ( key, value ) {
                switch (key) {
                case "someValue":
                    //this.options.someValue = doSomethingWith( value );
                    break;
                default:
                    //this.options[ key ] = value;
                    break;
                }
    
                // For UI 1.8, _setOption must be manually invoked from 
                // the base widget
                $.Widget.prototype._setOption.apply(this, arguments);
                // For UI 1.9 the _super method can be used instead
                // this._super( "_setOption", key, value );
            }
        });
    
    })( jQuery, window, document );
    
    //usage: $("#myelem").foo( options );
    
    
    /* Some additional notes - delete this section before using the boilerplate.
    
     We can also self-init this widget whenever a new page in jQuery Mobile is created. jQuery Mobile's "page" plugin dispatches a "create" event when a jQuery Mobile page (found via data-role=page attr) is first initialized.
    
    We can listen for that event (called "pagecreate" ) and run our plugin automatically whenever a new page is created.
    
    $(document).bind("pagecreate", function (e) {
        // In here, e.target refers to the page that was created 
        // (it's the target of the pagecreate event)
        // So, we can simply find elements on this page that match a 
        // selector of our choosing, and call our plugin on them.
        // Here's how we'd call our "foo" plugin on any element with a 
        // data-role attribute of "foo":
        $(e.target).find("[data-role='foo']").foo(options);
    
        // Or, better yet, let's write the selector accounting for the configurable 
        // data-attribute namespace
        $(e.target).find(":jqmData(role='foo')").foo(options);
    });
    
    That's it. Now you can simply reference the script containing your widget and pagecreate binding in a page running jQuery Mobile site, and it will automatically run like any other jQM plugin.
     */


## RequireJS And The jQuery UI Widget Factory

## Globally And Per-Call Overridable Options (Best Options Pattern)


## AMD- And CommonJS-Compatible Modules


## 如何编写一个优秀的插件？

最后，来看一下我在选择第三方插件时遵循的一些原则，它对你开发插件来说非常有用:

**质量**

尽可能的遵循javascript和juqery最佳实践。在编辑写插件时，思考一下，这是最佳的解决方案吗？它们是否遵循jQuery 插件开发指南？如果不是，你的代码至少应该干净可读。

**兼容性**

你的插件都支持哪个版本的jquery?最新的版本是否经过测试？ 我更喜欢一些插件作者在必要时更新他们的插件，至少，测试一下插件对jquery新版本的支持情况，确保插件正常运行。


**可靠性**

你的插件应该有单元测试，单元测试不仅可以验证你的插件能否正常的运行，同时可以保证在不影响用户使用的情况下改进你的插件。我认为用于在生产环境插件都需要进行单元测试，它们并不难写。建议你可以看一下[QUnit下的JavaScript自动化单元测试](http://msdn.microsoft.com/en-us/scriptjunkie/gg749824)。

**性能**

如果你的插件需要执行大量复杂的计算，或者频繁对DOM进行操作，建议你使用[jsPerf.com](http://jsperf.com/)测试你的代码在不同的浏览器的性能。


**文档**

如果你打算让其它的开发人员使用你的插件，请确保它有良好的文档。插件有哪些方法？有哪些配置选项？有哪些用户需要注意的陷阱？如果他们无法搞清楚你的插件如何使用，他们可能会寻找别外和替代方案。另外，你的代码也需要良好的注释，这对于使用你插件的其他开发者很有用。 If someone feels they can navigate your code base well enough to fork it or improve it, then you’ve done a good job.

**维护**

发布一个插件时，预计一下你会有多少时间来提供插件的维护和支持。我们都喜欢在一些社区分享自己的插件，但这需要时间和精力来回答问题,解决问题,并做出改进。最简单的，你可以ReadMe文件中说明，让用户自己决定是否他们自己来修复遇到的问题。


## 总结

前面，我们探讨了几种可以改善jquery插件开发的设计模式。在特定的场景下，一些模式会比另一些更合适，我希望代码中的注释对有助于你深入理解这些设计模式。

记住，不要为了使用设计模式而使用设计模式，而是需要花些时间去理解这些模式，了解如何选择合适的模式来解决你的问题或适应你的组件。总之，选择合适的设计模式很重要。

-happy coding!
