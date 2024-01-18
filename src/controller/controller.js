var OsUtil = require('../utils/serverInfo');
let url = require("url");

function getQueryVariable(search, name) {
    const url = decodeURI(search); // 获取url中"?"符后的字串(包括问号)
    let query = {};
    if (url.indexOf("?") != -1) {
        const str = url.substr(1);
        const pairs = str.split("&");
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split("=");
            if (pair[0] === name) return pair[1]; // 返回 参数值
        }
    }
    return (false);
}

function getSpeedStr(speed) {
    if (speed >= 1024) {
        return Number.parseFloat(speed / 1024).toFixed(2) + 'M/s';
    } else if (speed >= 2014 * 1204) {
        return Number.parseFloat(speed / 1024 / 1024).toFixed(2) + 'M/s';
    } else {
        return Number.parseFloat(speed).toFixed(2) + 'K/s';
    }
}

module.exports = {
    getSysInfo(req, res) {
        let search = url.parse(req.url).search;
        let chart = getQueryVariable(search, 'chart');
        res.status = 200;
        res.setHeader("Content-Type", "application/json");
        if (chart === 'system.ram') {
            res.end("fy");
        } else {
            let obj = {
                c: (Number.parseFloat(OsUtil.cpuUsage) * 100).toFixed(2),
                m: OsUtil.freeMem,
                mt: OsUtil.totalMem,
                t: OsUtil.temp,
                d: (OsUtil.downloadSpeed) * 8,
                u: (OsUtil.uploadSpeed) * 8,
            }
            res.end(JSON.stringify(obj));
        }
    },
    getData(req, res) {
        res.status = 200;
        res.setHeader("Content-Type", "application/json");
        let obj = {
            cpu: (Number.parseFloat(OsUtil.cpuUsage) * 100).toFixed(2) + "%",
            mem: Number.parseFloat(((OsUtil.totalMem - OsUtil.freeMem) / OsUtil.totalMem) * 100).toFixed(2) + "%",
            upload: getSpeedStr(OsUtil.uploadSpeed),
            download: getSpeedStr(OsUtil.downloadSpeed),
            port: OsUtil.port,
            ipaddr: OsUtil.ipaddr,
            temp:OsUtil.temp
        }
        res.end(JSON.stringify(obj));
    },
}
