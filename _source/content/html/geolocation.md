# html5 Geolocation 地理定位

- date: 2013-12-26 22:41
- tags: html5,geolocation,api
- category: html

----------------

## 一、Geolocation 概述

Geolocation API 在网页中使用 geolocation 对象向javaScript 提供经度和纬度。利用 geolocation 对象，可以获取用户位置和跟踪用户位置的变化。

### 1.1 Geolocation API 获取地理位置的方式

设备使用下列数据源：

* IP地址 - 任何地方可用，不精确
* GPS - 很精确，定位需要时间长，耗电大，室内效果不好，需要额外设备
* WiFi基站的mac地址 - 精确，可在室内使用，在无线接入点少的地方效果不好
* GSM或CDMA基站 - 相当准确，可在室内使用，在基站较少的地区效果不好

为了使用更高的准确度，许多设备使用一个或更多的数据源组合。


### 1.2 地理位置获取流程：

1. 用户打开需要获取地理位置的web应用。
2. 应用通过Geolocation API 向浏览器请求地理位置，浏览器拦截请求，向用户请求授权。
3. 假设用户允许，浏览器从设备查询相关信息，如IP地址、WIFI地址或GPS坐标。
4. 浏览器将相关信息发送给信任的外部定位服务器，服务器返回具体的地理位置。


#### 1.3 隐私

Geolocation API 规范提供了一套保护用户隐私的机制，必须先得到用户明确许可，才能获取用户的位置信息。

访问使用Geolocation API的页面应用时，会触发隐私保护机制，浏览器会询问用户是否共享位置信息。

用于收集位置数据的应用程序的开发人员应考虑关于隐私的以下准则：

因为位置数据属于敏感信息，所以开发人员应考虑遵循以下准则：

* 仅在必要时请求位置信息，并且仅将位置信息用于其原计划用于的任务。
* 如果用户没有授权存储这些数据，那么应用程序应该在相应任务完成后立即删除。
* 如果要在服务器上存储位置数据，请务必确保位置数据不受到未经授权的访问，并允许用户更新和删除此信息。

### 1.4 应用场景

* 更新本地信息
* 显示用户周围的兴趣点
* 车载导航系统

## 二、Geolocation 使用

Geolocation API的使用很简单，请求一个位置信息，如果用户同意，就返回位置信息。

### 2.1 检测浏览器是否支持Geolocation

在使用html5 Geolocation API时，应确保浏览器支持Geolocation API.
    
    if (navigator.geolocation) {
        console.log('Geolocation is supported.');
    } else {
        console.log('geolocation is not supported in your broswer.');
    }

### 2.2 getCurrentPosition 或 watchPosition

* 使用 getCurrentPosition 方法获取当前的地理位置。
* 使用 watchPosition 方法监视位置随时间变化的情况。

语法：
    
    // getCurrentPosition
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    
    // watchPosition
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

这两个方法都就使用的是异步回调的方式。它们有相同的参数：

1. successCallback – 为浏览器成功获得位置信息后的回调函数。
2. errorCallback – 用于位置信息获取失败时的回调函数。
3. options – 配置参数，可以调整geolocation的数据收集方式
    * enableHighAccuracy - 指示浏览器获取高精度的位置，默认为false。当开启后，可能没有任何影响，也可能使浏览器花费更长的时间获取更精确的位置数据。
    * timeout - 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。默认为0，表示浏览器需要立刻重新计算位置。
    * maximumAge - 表示程序能接受的被缓存位置的最大过期时间。接受一个数字作为参数，默认为0微秒。这就意味这默认每次获取位置都必需重新获取一个新位置。
    
    

### 2.3 clearWatch()

这个方法接受一个参数，需要清理监视位置变化的方法的id：watchID（这个参数由watchPosition方法返回）。

    
### 2.4 示例：
    
    var watchId = navigator.geolocation.watchPosition(function(position) { // succes callback
        var coords = position.coords;
        
        console.log(coords.latitude); // 纬度
        console.log(coords.longitude); // 经度
        console.log(coords.accuracy); // 准确度，由于geolocation的实现方式，呈现返回值时一定要检查返回值的准确度
        console.log(coords.altitude); // 海拔，以米为单位，如不支持altitude特性，返回null
        console.log(coords.altitudeAccuracy); // 海拔经度，以米为单位，如不支持altitude特性，返回null
        console.log(coords.heading); // 行进方向，相对正北
        console.log(coords.speed); // 行进速度，单位m/s
        console.log(timestamp); // 获取位置的时间

    }, function(error) { // error callback
        console.log('获取位置信息失败。');
        console.log(error.code);
        // UNKNOWN_ERROR (error code 0) - 未知错误
        // PERMISSION_DENIED (error code 1) - 用户拒绝共享地理位置
        // POSITION_UNAVAILABLE (error code 2) - 无法获取当前位置
        // TIMEOUT (error code 3) - 在指定时间无法获取位置会触发此错误。
    }, { // options
        enableHighAccuracy: true, 
        maximumAge: 30000, 
        timeout: 27000 
    });
    
    
## 三、Geolocation Demo

* http://html5doctor.com/demos/geolocation/geolocation-watchposition-example.html

## 扩展阅读

* http://dev.w3.org/geo/api/spec-source.html
* http://msdn.microsoft.com/zh-cn/library/ie/gg589513(v=vs.85).aspx
* http://msdn.microsoft.com/zh-CN/hh781006
* https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation
* http://html5demos.com/geo
