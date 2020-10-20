export default {
	//储存用户信息
	setUserInfo(state, data) {
		if (data) {
			console.log("保存信息")
			state.isLogin = true
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
	//获取地址
	setLocation(state, location) {
		state.location = location
		uni.setStorageSync('location', state.location);
	},
	addItem(state, payload) {
		payload.checked = false
		state.cartList.push(payload)
	},
	addCounter(state, payload) {
		payload.count++
	}
}