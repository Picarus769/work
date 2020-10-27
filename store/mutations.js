export default {
	//储存用户信息
	setUserInfo(state, data) {
		if (data) {
			console.log("保存信息")
			state.userInfo =  Object.assign({}, state.userInfo,data);
			
			uni.setStorageSync('userInfo', state.userInfo);
			// // #ifdef H5
			// console.log("保存信息1")
			// window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo));
			// // #endif
			// // #ifndef H5
			// console.log("保存信息2")
			
			// // #endif
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
	getCacheData(state) {
		for (let name of state.cacheNameList) {
		let data;
		data = uni.getStorageSync(name);
			// #ifndef H5
			
			// // #endif
			// // #ifdef H5
			// data = sessionStorage.getItem(name) || localStorage.getItem(name);
			// // #endif
			// if (data) {
			// 	// #ifdef H5
			// 	try {
			// 		data = JSON.parse(data);
			// 	} catch (e) {
			// 	}
				// #endif
				state[name] = data;
			}
		
	},
	//保存地址
	setLocation(state, location) {

		console.log("已保存地址")
		state.location = location
		for (let item of location) {
			if (item.isoften === true) {
				state.oftenAddress = item
				break
			}
		}
		console.log('常用地址', state.oftenAddress)
		uni.setStorageSync('location', state.location);
	},
	//保存商家
	setStaff(state, staff) {
		console.log("已保存商家")
		state.staff = staff
		uni.setStorageSync('staff', state.staff);
	},
	//保存商店
	
	
	setShop(state, shop) {
		console.log("已保存商店")
		
		state.shop = shop
		console.log(state.shop)
		// uni.setStorageSync('staff', state.staff);
	},
	//保存商品
	setProducts(state, products) {
		console.log("已保存商品")
		state.products = products.filter(item => item.shopStore_ProductItems.filter(i => i.count>0).length>0)
	},
	//保存点击的商品
	setCurrentProduct(state, product) {
		console.log('已保存点击的商品')
		state.currentProduct = product
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
	//订单商品
	addItem(state, payload) {
		payload.checked = false
		state.cartList.push(payload)
	},
	//保存搜索内容
	setSearchValue(state, searchValue) {
		console.log(searchValue)
		state.searchValue = searchValue
	},
	addCounter(state, payload) {
		payload.selectCount++
	},
	deleteItem(state, iid) {
		state.cartList = state.cartList.filter(item => item.iid != iid)
	}
}