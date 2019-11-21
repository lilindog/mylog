"use strict"

const tools = require("./lib/tools");
const {
    error: printErorr, 
    warn: printWarn,
    info: printInfo
} = tools.print;

/**
 * 写日志模块
 * 
 * @param {String} path 日志存放目录
 * @return {Function}
 */
module.exports = function (options) {
    options = Object.assign({
        //日志存放目录
        path: process.cwd(),
        //保留日志行数，为0或为空时，不进行日志清旧
        keep: 0,
        //是否调试输出
        debug: false
    }, options);
    const write = function (msg) {
        write.info(msg);
    }
    Object.assign(write, {
        info (msg) {
            const str = `[${tools.getDateStr("time")}] [INFO]    ${msg}`;
            options.debug && printInfo(str);
            tools.write(options.path, str);
            options.keep && tools.deleteMoreLine(`${options.path}/${tools.getDateStr("date")}.log`, options.keep);
        },
        warn (msg) {
            const str = `[${tools.getDateStr("time")}] [WARN]    ${msg}`;
            options.debug && printWarn(str);
            tools.write(options.path, str);
            options.keep && tools.deleteMoreLine(`${options.path}/${tools.getDateStr("date")}.log`, options.keep);
        },
        error (msg) {
            const str = `[${tools.getDateStr("time")}] [ERRO]    ${msg}`;
            options.debug && printErorr(str);
            tools.write(options.path, str);
            options.keep && tools.deleteMoreLine(`${options.path}/${tools.getDateStr("date")}.log`, options.keep);
        }
    });
    return write;
}