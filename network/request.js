// const BASE_URL = "http://29k948265g.qicp.vip"
const BASE_URL = "https://admin.counselor.hzrxkjgs.cn/"
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data,
			success: (res) => {
				
				if(res.statusCode !== 200) {
					console.log(res)
					return uni.showToast({
						title: '连接失败!',
						icon: "none"
					})
				}
				
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求数据失败！',
					icon: "none"
				})
				reject(err)
			}
		})
	})
}