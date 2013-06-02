/*
 * Privileged method
 * http://javascript.crockford.com/private.html
 * http://www.quizzpot.com/2009/04/private-methods-and-privileged-methods/
 * http://robertnyman.com/2008/10/14/javascript-how-to-get-private-privileged-public-and-static-members-properties-and-methods/
 * http://www.dustindiaz.com/javascript-private-public-privileged/
 * http://phrogz.net/JS/Classes/OOPinJS.html
 */

var Book = function(title,author) {
    //公有属性  
    this.title = title;
    this.author = author;
    
    //私有属性
    var num = 0;
    var isbn = 123425
    
    //构造函数内私有方法
    var showNum = function() {
        console.log(num);
    }
    
    //特权方法 可以访问构造函数里的私有变量
    this.displayNum = function() {
        showNum();
        console.log(isbn);
    }
};

//公有方法
Book.prototype = {
    display: function() {
        console.log(this.title);
        console.log(this.author);
    }
}

//静态成员  
Book.pub = 'QH';

var myBook = new Book('F2E Cookbook', 'bingdian');
myBook.display();
myBook.displayNum();

console.log(Book.pub);
console.log(myBook.pub); //undefined