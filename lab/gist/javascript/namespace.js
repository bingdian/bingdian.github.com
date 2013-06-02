/*
 * http://stackoverflow.com/questions/881515/javascript-namespace-declaration
 * http://jweir.github.com/namespace/
 * http://developer.yahoo.com/yui/yahoo/#namespace
 */

/*
 * YourNamespace
 */
var YourNamespace = {
    foo: function() {
        console.log('foo');
    },
    bar: function() {
        console.log('bar');
    }
}
YourNamespace.foo();
YourNamespace.bar();




/*
 * ns
 */
var ns = new function() {
    //私有函数
    var internalFunction = function() {
        console.log('internalFunction');
    };
    
    //公有函数
    this.publicFunction = function() {
        internalFunction();
        console.log('publicFunction');
    };
};
ns.publicFunction();




/*
 * lib
 */
(function(lib, undefined ) {
    //私有属性
    var a = 2,
        b = 3;

    //公有属性
    lib.name = 'lib';
    
    //私有函数
    var add = function(num1,num2) {
        console.log(num1+num2);
    };

    //公有方法
    lib.display = function() {
        console.log( 'a:' + a );
        console.log( 'b:' + b );
        console.log(add(a,b));
    };
}( window.lib = window.lib || {} ));

lib.display();



/*
 * MYNS
 */
var MYNS = MYNS || {};

MYNS.subns = (function() {

    function privateMethod() {
        // Do private stuff, or build internal.
        return "Message";
    }

    return {
        someProperty: 'prop value',
        publicMethod: function() {
            return privateMethod() + " stuff";
        }
    };
})();
console.log(MYNS.subns.someProperty);
console.log(MYNS.subns.publicMethod());



/*
 * G
 */
(function(G, undefined) {
    
    G.APP = {
        start: function() {
            console.log('app start');
        },
        end: function() {
            console.log('app end');
        }
    }
    
})(window.G = window.G || {});

G.APP.start();
G.APP.end();


/*
 * Y
 */
var Y = Y || {};

Y.APP = (function () {
    var num = 1;
    
    return {
        start: function() {
            console.log('Y app start');
        },
        end: function() {
            console.log('Y app end');
        }
    }
})();
Y.APP.start();
Y.APP.end();