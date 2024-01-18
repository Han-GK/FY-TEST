let url = require("url");
let fs = require("fs")

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
                res.status = 404;// 设置状态码
                res.end("404");
            } else {
                urls[pathname](req, res);
            }
        }
    });
}

router.static = (path) => {
    router.basepath= path
}
router.get = (url, cb) => {
    urls[url] = cb
}

router.basepath = __dirname + 'assets'

module.exports = router;