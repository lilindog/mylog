const log = require("../index")({debug: true});

log("开始记录日志");
try {
    const a = 100;
    a = 1000;
} catch(err) {
    log.error(err);
}
try {
    asdjhajksdhjkahsd
} catch(err) {
    log.error(err);
}
try {
    asdasd
} catch(err) {
    log.error(err);
}
try {
 123123
} catch(err) {
    log.error(err);
}
log.warn("日志记录结束");