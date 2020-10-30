<script>
	import store from '@/store/index.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			let res = JSON.parse(this.getCookie("current"));
			// let res = {
			// 	vipcate: 1,
			// 	name: '昵称',
			// 	openId: null,
			// 	avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg',
			// 	integral: 0,
			// 	shopIntegral: 0,
			// 	info: [
			// 		{
			// 			provinceid: 2,
			// 			provincename: "北京市",
			// 			cityid: 4,
			// 			cityname: "朝阳区",
			// 			countiesid: 4,
			// 			countiename: "朝阳区",
			// 			info: "32123",
			// 			userid: 0,
			// 			name: "343",
			// 			phone: "3463",
			// 			isoften: true,
			// 			id: 115
			// 		}
			// 	],
			// 	id: 4
			// }
			
			this.login(res).then(()=>{
				console.log("app.vue完成")
				// uni.reLaunch({
				// 	url: '/pages/index/index',
					
				// 	success() {
				// 	},
				// 	fail(e) {
				// 		console.log("aaa")
				// 		console.log(e)
				// 	}
				// })
				
			})
		},
		onShow: function() {
			
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			  // 获取cookie
			  getCookie(cname) {
			    let name = cname + "=";
			    let decodedCookie = decodeURIComponent(document.cookie);
			    let ca = decodedCookie.split(";");
			    for (let i = 0; i < ca.length; i++) {
			      let c = ca[i];
			      while (c.charAt(0) == " ") {
			        c = c.substring(1);
			      }
			      if (c.indexOf(name) == 0) {
			        return c.substring(name.length, c.length);
			      }
			    }
			    return undefined;
			  },
			//用户登录
			async login(r) {
				store.commit('getCacheData', r)
				store.commit('setUserInfo', r);
				console.log(r)
				// const res = await this.$myRequest({
				// 	url: 'api/User?Id=2&OpenId'
				// })
				// console.log(res.data.data[0])
				// store.commit('setUserInfo', res.data.data[0]);
				
				if(r.info.length === 0) {
					console.log("aaaaa")
					uni.navigateTo({
						url: '/pages/profile/setAddress',
						success() {
							console.log("ccc")
						},
						fail(e) {
							
							console.log(e)
						}
					})
					// uni.showModal({
					// 	content: '添加地址以寻找附近商店',
					// 	showCancel: false,
					// 	success() {
					// 		uni.navigateTo({
					// 			url: '/pages/profile/setAddress',
					// 			success() {
					// 				console.log("ccc")
					// 			},
					// 			fail(e) {
					// 				console.log('dddd')
					// 				console.log(e)
					// 			}
					// 		})
					// 	},
					// 	fail(e) {
					// 		console.log(e)
					// 	}
					// })
				} else {
					
					store.commit('setLocationFromCookie', r.info);
				let oftenAddr = r.info.find(q=>q.isoften === true)
				
						this.getProduct(oftenAddr)
						uni.switchTab({
							url: '/pages/index/index',
							fail(e) {
								console.log(e)
							}
						})
						console.log("重定向完成")
					}
				},
				//按地址获取商店和商品
				async getProduct(oftenAddr) {
					console.log(oftenAddr)
					let areaId = oftenAddr.countiesid
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
					
					let temp = {
						
						shopId: res.data.shopId,
						shopRate:  res.data.shopRate,
						shopName: res.data.shopName,
						shopAvatar: res.data.shopAvatar,
						shopAddress: res.data.shopAddress,
						
					}
					console.log(temp)
					store.commit('setShop', temp)
					this.getActivity(res.data.shopId)
			},
			async getActivity(id) {
				const res = await this.$myRequest({
					url: 'api/Activity?ShopId=' + id
				})
				console.log(res.data.data)
				store.commit('setActivity', res.data.data)
			}
		}
	}
</script>

<style>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
