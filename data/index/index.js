import store from '@/store/index.js';
import { $myRequest } from 'network/request.js'
export default {
	//请求商家
	async getStaff(oftenAddr) {
		console.log(oftenAddr)
		let areaId = oftenAddr.countiesId
		const res = await $myRequest({
			url: 'api/Staff',
			data: {
				AreaId: areaId,
				AreaCate: 3,
			}
		})
		console.log('商家信息', res.data.data[0])
		store.commit('setStaff', res.data.data[0])
		getShop(res.data.data[0].id)
	},
	//根据商家请求商店
	async getShop(id) {
	
		const res = await $myRequest({
			url: 'api/Shop?Id=' + id,
			
		})
		console.log('商店信息', res.data.data[0])
		store.commit('setShop', res.data.data[0])
		let shopId = res.data.data[0].id
		getProduct(shopId)
	},
	//用户登录
	async login() {
		const res = await $myRequest({
			url: 'api/User?Id=2&OpenId'
		})
		console.log(res.data.data[0])
		store.commit('setUserInfo', res.data.data[0]);
	},
	//获取收货地址
	async getAddress() {
		const res = await $myRequest({
			url: 'api/Address?UserId=' + store.state.userInfo.id
		})
		let oftenAddr = null
		for (let item of res.data.data) {
			if (item.isOften === true) {
				oftenAddr = item
				break
			}
		}
		console.log(res.data.data)
		store.commit('setLocation', res.data.data)
		await getStaff(oftenAddr)
	},
	//获取商品
	async getProduct(areaId) {
		const res = await this.$myRequest({
			url: 'api/ShopStore',
			data: {
				AreaId: areaId,
				AreaCate: 3,
			}
		})
		console.log(res.data)
		store.commit('setCate', res.data.cateDtos)
		store.commit('setProducts', res.data.products)
		store.commit('setShop', res.data.shopId)
	}
}