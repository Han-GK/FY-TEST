const os = require('os-utils');
const si = require('systeminformation');
const osss = require('os');


const serverInfo = {
	cpuUsage: 0,
	freeMem: 0,
	totalMem: 0,
	uploadSpeed: 0,// 上传网速
	downloadSpeed: 0, // 下载网速
	port: 49101,
	ipaddr: '',
	temp:0
}

/**
 * 获取系统内存情况
 */
function getMem() {
	serverInfo.freeMem = os.freemem()
	serverInfo.totalMem = os.totalmem()
}

/**
 * 获取系统cpu利用率
 */
async function getCpu() {
	let promise = new Promise((resolve, reject) => {
		os.cpuUsage(function (v) {
			resolve(v)
		});
	});

	serverInfo.cpuUsage = await promise
}

function getIpAddr() {
	const networkInterfaces = osss.networkInterfaces();
	Object.keys(networkInterfaces).forEach((interfaceName) => {
		const interfaces = networkInterfaces[interfaceName];
		interfaces.some((iface) => {
			if (iface.family === 'IPv4' && !iface.internal) {
				serverInfo.ipaddr = iface.address;
				return true;
			}
			return false;
		});
	});
}


setInterval(() => {
	getCpu();
	getMem();
	si.networkStats().then(res => {
		serverInfo.downloadSpeed = res[0].rx_sec / 1024;
		serverInfo.uploadSpeed = res[0].tx_sec / 1024;
	});
	si.cpuTemperature().then(res=>{
		serverInfo.temp = res.main==null?0:res.main
	})
	getIpAddr();

}, 1000)

module.exports = serverInfo