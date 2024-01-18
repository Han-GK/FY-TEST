let url = require("url");
let fs = require("fs")
var OsUtil = require('../utils/serverInfo');

let urls = {};

let router = (req, res) => {
    let pathname = url.parse(req.url).pathname;//解析url
    // console.log('请求路径：', pathname);
    // 通过路径读取文件
    fs.readFile(router.basepath + pathname, (err, data) => {
        // 如果不报错，则表示读取文件成功,返回文件数据
        if (!err) {
            // res.setHeader("content-Type", mime.getType(pathname));
            res.end(data);
        } else {
            // 然后判断路径是否在我们申明的路径集合当中
            if (!urls[pathname]) {
                res.status = 200;
                res.setHeader("Content-Type", "text/html;charset=utf-8");
                res.end(`<meta charset="UTF-8"><h1>IP地址：${OsUtil.ipaddr} <br/> 端口：${OsUtil.port}</h1>`);
            } else {
                urls[pathname](req, res);
            }
        }
    });
}

router.static = (path) => {
    router.basepath = path
}
router.get = (url, cb) => {
    urls[url] = cb
}

router.basepath = __dirname + 'assets'

module.exports = router;