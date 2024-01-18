
var interval = null;
window.onload = function () {
    showCpuInfo();
    interval = setInterval(() => {
        showCpuInfo();
    }, 1000);
}


function showCpuInfo() {
    var cpu = this.document.querySelector('#cpu');
    var mem = this.document.querySelector('#mem');
    var upload = this.document.querySelector('#upload');
    var download = this.document.querySelector('#download');
    var port = this.document.querySelector('#port');
    var ipaddr = this.document.querySelector('#ipaddr');
    var temp = this.document.querySelector('#temp');
    var ajax = new XMLHttpRequest();
    ajax.open('get', 'data');
    ajax.send();
    ajax.onerror = function (error) {
        // 请求出现错误
        alert('出现异常：', JSON.stringify(error));
        if (interval != null) {
            clearInterval(interval);
        }
    };
    ajax.onreadystatechange = function () {
        if (ajax.response) {
            console.log(ajax.response);
            var data = JSON.parse(ajax.response);
            cpu.innerHTML = data.cpu;
            mem.innerHTML = data.mem;
            upload.innerHTML = data.upload;
            download.innerHTML = data.download;
            port.innerHTML = data.port;
            ipaddr.innerHTML = data.ipaddr;
            temp.innerHTML = data.temp;
        }
    };
}

