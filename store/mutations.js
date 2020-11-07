export default {
	//储存用户信息
	setUserInfo(state, data) {
		if (data) {
			console.log("保存信息")
			state.userInfo =  Object.assign({}, state.userInfo,data);
			
			uni.setStorageSync('userInfo', state.userInfo);

		}
	},

	// 退出APP
	emptyUserInfo(state) {
		state.userInfo = {};
		state.location = []
		state.isLogin = false
		for (let name of state.cacheNameList) {
			uni.removeStorageSync(name);
		}
		
		// #ifdef H5
		// window.sessionStorage.removeItem("userInfo");
		// // #endif
		// // #ifndef H5
		// uni.removeStorageSync("userInfo");
		// #endif
	},
	//取缓存
	getCacheData(state, user) {
		// for (let name of state.cacheNameList) {
		// 	console.log(name)

		let cart = uni.getStorageSync('cart')
		let userInfo = uni.getStorageSync('userInfo')
		if(user.id === userInfo.id) {
			
			state.cartList = cart
		}
	},
	setLocationFromCookie(state, location) {
	
		console.log("已保存地址")
		state.location = location
		for (let item of location) {
			if (item.isoften === true) {
				state.oftenAddress = item
				break
			}
		}
		console.log('常用地址', state.oftenAddress)
		// uni.setStorageSync('location', state.location);
	},
	//保存地址
	setLocation(state, location) {

		console.log("已保存地址")
		state.location = location
		for (let item of location) {
			if (item.isOften === true) {
				state.oftenAddress = item
				break
			}
		}
		console.log('常用地址', state.oftenAddress)
		// uni.setStorageSync('location', state.location);
	},
	//保存商家
	setStaff(state, staff) {
		console.log("已保存商家")
		state.staff = staff
		// uni.setStorageSync('staff', state.staff);
	},
	//保存商店
	setShop(state, shop) {
		console.log("已保存商店")
		
		state.shop = shop
	},
	//更新积分
	setInt(state, int) {
		console.log('更新积分')
		state.userInfo.shopIntegral = int.shopIntegral
		state.userInfo.integral = int.integral
	},
	//保存商品
	setProducts(state, products) {
		console.log("已保存商品")
		state.products = products.filter(item => item.shopStore_ProductItems.filter(i => i.count>0).length>0)
		state.products.forEach(item => {
			console.log('a')
			item.shopStore_ProductItems.map(productItem => {
				// console.log(JSON.parse(productItem.productItemStr).filter(i=>i.VipCate === state.userInfo.vipCate))
				return productItem.price = JSON.parse(productItem.productItemStr).filter(i=>parseInt(i.VipCate) === parseInt(state.userInfo.vipCate))[0].price.price
			})
		})
	},
	//保存点击的商品
	setCurrentProduct(state, product) {
		console.log('已保存点击的商品')
		state.currentProduct = product
	},
	//保存运费
	setFreight(state, freight) {
		console.log('已保存邮费')
		state.freight = freight
	},
	//保存种类
	setCate(state, cate) {
		console.log('保存种类')
		state.cate = cate
	},
	//保存活动
	setActivity(state, act) {
		console.log('保存活动')
		state.activities = act
	},

	//保存搜索内容
	setSearchValue(state, searchValue) {
		state.searchValue = searchValue
	},
	//添加购物车
	addItem(state, payload) {
		payload.checked = false
		state.cartList.push(payload)
		uni.setStorageSync('cart',state.cartList)
	},
	//添加购物车商品数量
	addCounter(state, payload) {
		console.log(payload.count)
		payload.oldProduct.selectCount+=payload.count
		uni.setStorageSync('cart',state.cartList)
	},
	//删除购物车商品
	deleteItem(state, iid) {
		state.cartList = state.cartList.filter(item => item.iid != iid)
		uni.setStorageSync('cart',state.cartList)
	},
	setCartPrice(state, p) {
		console.log('购物车价格修改')
		state.cartList.forEach(item => {
			if(item.iid === p.id) {
				item.price = p.price
				return
			}
		})
	}
}