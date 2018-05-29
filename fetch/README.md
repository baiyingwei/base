
基于promise设计， fetch api返回的是一个promise对象

Fetch常见坑
1.cookie传递 ： 必须在header参数里面加上credientials: 'include'，才会如xhr一样将当前cookies带到请求中去。。。
2.fetch和xhr的不同: fetch虽然底层，但是还是缺少一些常用xhr有的方法，比如能够取消请求（abort）方法
                   fetch在服务器返回4xx、5xx时是不会抛出错误的，这里需要手动通过，通过response中的ok字段和status字段来判断
3.