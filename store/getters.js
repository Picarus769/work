export default {
	vipCate(state) {
		return state.userInfo.vipCate
	},
	cartLength(state) {
		return state.cartList.length
	},
	cartList(state) {
		return state.cartList
	},
	userInfo(state) {
		return state.userInfo
	},
	cate(state) {
		return state.cate
	},
	activities(state) {
		return state.activities
	},
	location(state) {
		return state.location
	},
	oftenAddress(state) {
		return state.oftenAddress
	},
	shop(state) {
		return state.shop
	},
	products(state) {
		return state.products
	},
	searchValue(state) {
		return state.searchValue
	},
	freight(state) {
		return state.freight
	}
}