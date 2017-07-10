# 移动webapp开发小贴士 

- date: 2012-03-21 22:13
- tags: webapp,手机,移动,media-queries,ios
- category: html

----------------

## 1 创建主屏幕图标 （Creating a home screen icon ，for ios）

    //57*57
    <link rel="apple-touch-icon" href="/custom_icon.png"/>


    <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="touch-icon-ipad-retina.png" />

* https://developer.apple.com/library/IOs/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
* https://developer.apple.com/library/IOs/#documentation/UserExperience/Conceptual/MobileHIG/IconsImages/IconsImages.html#//apple_ref/doc/uid/TP40006556-CH14


## 2 启动画面图像 （Creating a splash screen， for ios）##

	<!!-- iPhone SPLASHSCREEN-->
	<!link href="apple-touch-startup-image-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image" />
	<!!-- iPhone (Retina) SPLASHSCREEN-->
	<!link href="apple-touch-startup-image-640x920.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
	<!!-- iPad (portrait) SPLASHSCREEN-->
	<!link href="apple-touch-startup-image-768x1004.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image" />
	<!!-- iPad (landscape) SPLASHSCREEN-->
	<!link href="apple-touch-startup-image-748x1024.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image" />
	<!!-- iPad (Retina, portrait) SPLASHSCREEN-->
	<!link href="apple-touch-startup-image-1536x2008.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
	<!!-- iPad (Retina, landscape) SPLASHSCREEN-->
	<link href="apple-touch-startup-image-1496x2048.png" media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />

* https://developer.apple.com/library/IOs/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW6
*
http://stackoverflow.com/questions/4687698/mulitple-apple-touch-startup-image-resolutions-for-ios-web-app-esp-for-ipad


## 3 全屏 （Making it full-screen， for ios）-- 更像本地App

    <meta name="apple-mobile-web-app-capable" content="yes" />
    
* https://developer.apple.com/library/IOs/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW2


### 4 改变状态栏 （Changing the phone status bar, for ios）###

content属性default, black and black-translucent

    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    
*
https://developer.apple.com/library/IOs/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW1


## 5 阻止缩放 （Preventing scaling）##

    <meta name="viewport" content="user-scalable=no, width=device-width" />


## 6 阻止弹性滚动（Preventing elastic scrolling）###

    <script>
    function BlockMove(event) {
        //Tell Safari not to move the window.
        event.preventDefault() ;
    }
    </script>
     
    <body ontouchmove="BlockMove(event);" >
      ...
    </body>

## 7 检测屏幕是否旋转（Detect whether device supports orientationchange event, otherwise fall back to the resize event）###

    //Detect whether device supports orientationchange event, otherwise fall back to
    //the resize event.
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    
    window.addEventListener(orientationEvent, function() {
        alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
    }, false);

* http://davidbcalhoun.com/2010/dealing-with-device-orientation


## 8 禁止webapp跳转到safari（for ios）

    // Mobile Safari in standalone mode
    if (("standalone" in window.navigator) && window.navigator.standalone) {
    
            // If you want to prevent remote links in standalone web apps opening Mobile Safari, change 'remotes' to true
        var noddy,
            remotes = false;
    
        document.addEventListener('click', function(event) {
            noddy = event.target;
            //Bubble up until we hit link or top HTML element. Warning: BODY element is not compulsory so better to stop on HTML
            while (noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
                noddy = noddy.parentNode;
            }
    
            if ('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)) {
                event.preventDefault();
                document.location.href = noddy.href;
            }
    
        }, false);
    }


## 9 禁用手机号码链接（for ios）##

    <meta name="format-detection" content="telephone=no" />

## 10 阻止旋转屏幕时自动调整字体大小 ##

    -webkit-text-size-adjust:none;


## 11 IOS中禁止用户选中文字 ##

    -webkit-user-select:none;

## 12 iOS中如何禁止用户保存图片 复制图片 ##

    -webkit-touch-calloutt:none;
    

## 13 语音输入 ##

    <input type="text" x-webkit-speech /> 


## 14 文件上传, 从相机捕获媒体 ##

    <input type="file" accept = "image/*; capture=camera" />
    <input type="file" accept = "video/*; capture=camcorder" />
    <input type="file" accept = "audio/*; capture=microphone" />


## 15 电话短信 ##

    <a href="sms:18888886666,18888885555″]]> 发送短信给多个人 的链接
    <a href="sms:18888886666?body=sms txt"]]> 发送短信附带内容 的链接
    <a href="tel:18888886666″]]>Call us at 18888886666</a]]> 拨打电话的链接