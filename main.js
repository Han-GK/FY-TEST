var router = require("./src/router/router.js")
var OsUtil = require('./src/utils/serverInfo');
var controller = require("./src/controller/controller.js")
var http = require('http');
var open = require('child_process');
function node_main() {
    let server = http.createServer(router)
    //静态资源托管
    router.static(__dirname + '/src/assets')
    router.get('/api/v1/data', controller.getSysInfo);
    router.get('/data', controller.getData)
    server.listen(OsUtil.port, function () { console.log("服务器启动完毕,端口：" + OsUtil.port) });
    open.exec('start http://127.0.0.1:' + OsUtil.port + '/index.html')
}

node_main()

