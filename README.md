## nodejs 日志模块

*自动以日期为日志文件名，如2019-11-11.log*

#### 安装

>npm install --save git+https://github.com/lilindog/mylog#master

#### 使用
```js
const log = require("mylog")({
    /**
     * 保留多少行日志删除旧的
     * 为0或为空时候则不进行删除 
     */
    keep: 10, 

    /**
     * 日志存放目录
     * 缺省为当前进程执行目录 
     */
    path: "./",

    /**
     * 是否打印日志到控制台
     */
    debug: true,
});

//1
log("信息");
log.info("信息");

//2
log.warn("警告");

//3
log.error("错误");
```