"use strict"

const fs = require("fs");
const chalk = require("chalk");

/**
 * 获取日期 
 * 
 * @param {String} type 回传时间格式化日期时间类型，可选date/time
 * @return {String}
 */
exports.getDateStr = function (type) {
    const
    obj = new Date,
    Y = obj.getFullYear(),
    M = (obj.getMonth + 1) < 10 ? "0" + (obj.getMonth() + 1) : obj.getMonth() + 1,
    D = obj.getDate() < 10 ? "0" + obj.getDate() : obj.getDate(),
    h = obj.getHours() < 10 ? "0" + obj.getHours() : obj.getHours(),
    m = obj.getMinutes() < 10 ? "0" + obj.getMinutes() : obj.getMinutes(),
    s = obj.getSeconds() < 10 ? "0" + obj.getSeconds() : obj.getSeconds();
    switch (type) {
        case "date": return `${Y}-${M}-${D}`;
        break;
        case "time": return `${h}:${m}:${s}`;
        break;
        default: return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }
}

/**
 * 异步删除多余的行数 
 * 
 * @param {String} path 路径
 * @param {Number} keep 要保留的行数,默认10条
 * @return {Promise}
 */
exports.deleteMoreLine = function (path, keep) {
    if (!path || !keep) return;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let textArr = fs.readFileSync(path).toString().split("\n");
                if (textArr.length > keep) {
                    textArr = textArr.slice(textArr.length - 1 - keep);
                    fs.writeFileSync(path, textArr.join("\n"));
                }
                resolve();
            } catch(err) {
                reject(err);
            }
        }, 0);
    });
}

/**
 * 写入日志函数 （每天一个文件）
 * 
 * @param {String} msg
 */
exports.write = function (path, msg) {
    if (!msg || !msg) return;
    msg = msg.replace(/[\r\n\t\f]/g, " \\n ");
    msg += "\n";
    path = path + "/" + exports.getDateStr("date") + ".log";
    if (fs.existsSync(path)) {
        fs.appendFileSync(path, msg);
    } else {
        fs.writeFileSync(path, msg);
    }
}

/**
 * 打印 
 */
exports.print = {
    info (msg) {
        console.log(chalk.green(msg));
    },
    warn (msg) {
        console.log(chalk.yellow(msg));
    },
    error (msg) {  
        console.log(chalk.red(msg));
    }
}