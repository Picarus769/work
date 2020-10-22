<script>
	import store from '@/store/index.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			store.commit('getCacheData')
			if (store.state.userInfo) {
				// this.login()
				console.log(store.state.userInfo)
			} else {
				this.login()
			}
			this.getAddress()
		},
		onShow: function() {
			if(store.state.location.length === 0) {
				uni.showModal({
					content: '添加地址以寻找附近商店',
					showCancel: false,
					success() {
						uni.navigateTo({
							url: '/pages/profile/setAddress'
						})
					}
				})
				
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			//请求商家
			// async getStaff(oftenAddr) {
			// 	console.log(oftenAddr)
			// 	let areaId = oftenAddr.countiesId
			// 	const res = await this.$myRequest({
			// 		url: 'api/Staff',
			// 		data: {
			// 			AreaId: areaId,
			// 			AreaCate: 3,
			// 		}
			// 	})
			// 	console.log('商家信息', res.data.data[0])
			// 	store.commit('setStaff', res.data.data[0])
			// 	this.getShop(res.data.data[0].id)
			// },
			//根据商家请求商店
			async getShop(oftenAddr) {
				console.log(oftenAddr)
				let areaId = oftenAddr.countiesId
				const res = await this.$myRequest({
					url: 'api/Shop',
					data: {
								AreaId: areaId,
								AreaCate: 3,
							}
				}).then((res) => {
					console.log('商店信息', res.data.data[0])
					store.commit('setShop', res.data.data[0])
					let shopId = res.data.data[0].id
					this.getProduct(shopId)
				})
				
			},
			//用户登录
			async login() {
				const res = await this.$myRequest({
					url: 'api/User?Id=2&OpenId'
				})
				console.log(res.data.data[0])
				store.commit('setUserInfo', res.data.data[0]);
			},
			//获取收货地址
			async getAddress() {
				const res = await this.$myRequest({
					url: 'api/Address?UserId=' + store.state.userInfo.id
				}).then((res)=> {
					let oftenAddr = null
					for (let item of res.data.data) {
						if (item.isOften === true) {
							oftenAddr = item
							break
						}
					}
					console.log(res.data.data)
					store.commit('setLocation', res.data.data)
					this.getShop(oftenAddr)
				})
				
				
			},
			//获取商品
			async getProduct(shopId) {
				const res = await this.$myRequest({
					url: 'api/ShopStore?shopId=' + shopId
				})
				console.log(res.data)
				console.log(res.data.products)
				store.commit('setProducts', res.data.products)
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
