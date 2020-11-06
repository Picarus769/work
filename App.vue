<script>
	import store from '@/store/index.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			let res = JSON.parse(this.getCookie("current"));
			// let res = {
			// 	vipcate: 0,
			// 	wechatinfo: {
			// 		nickname: '昵称',
			// 		headimgurl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg',
			// 	},
				
			// 	openid: null,
			// 	integral: 1000,
			// 	shopintegral: 1,
			// 	info: [
			// 		{cityid: 454,
			// 		cityname: "东城区",
			// 		countiename: "东城区",
			// 		countiesid: 2875,
			// 		id: 168,
			// 		info: "123",
			// 		isoften: true,
			// 		name: "123",
			// 		phone: "135",
			// 		provinceid: 34,
			// 		provincename: "北京市",
			// 		userid: 57}
			// 	],
				
			// 	id: 57
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
				uni.showLoading({
					title: '加载中...',
					mask: true,
					success() {
						console.log('aaa')
					},
					fail(e) {
						console.log(e)
					}
				})
				console.log(r)
				console.log(r)
				let  rr = {
				vipCate: r.vipcate,
				name: r.wechatinfo?.nickname,
				openId: r.openid,
				avatar: r.wechatinfo?.headimgurl,
				integral: r.integral,
				shopIntegral: r.shopintegral,
				info: r.info.map(item => {
					let temp = {
						provinceId: item.provinceid,
						provinceName: item.provincename,
						cityId: item.cityid,
						cityName: item.cityname,
						countiesId: item.countiesid,
						countieName: item.countiename,
						info: item.info,
						userId: item.userid,
						name: item.name,
						phone: item.phone,
						isOften: item.isoften,
						id: item.id
					}
					return temp
				})||[],
				id: r.id
			}
				store.commit('getCacheData', rr)
				store.commit('setUserInfo', rr);
				console.log(rr)
				// const res = await this.$myRequest({
				// 	url: 'api/User?Id=2&OpenId'
				// })
				// console.log(res.data.data[0])
				// store.commit('setUserInfo', res.data.data[0]);
				
				if(rr.info.length === 0) {
					console.log("aaaaa")
					uni.switchTab({
						url: '/pages/index/index',
						success() {
							
						},
						fail(e) {
							
							console.log(e)
						}
					})
					this.getProduct({
						countiesId:0,
						cate: 0
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
					uni.hideLoading();
				} else {
					
					store.commit('setLocation', rr.info);
				let oftenAddr = rr.info.find(q=>q.isOften === true)
				
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
					let areaId = oftenAddr.countiesId
					const res = await this.$myRequest({
						url: 'api/ShopStore',
						data: {
							AreaId: areaId,
							AreaCate: oftenAddr.cate===undefined?3:oftenAddr.cate,
						}
					})
					console.log(res.data)
					store.commit('setCate', res.data.cateDtos)
					store.commit('setProducts', res.data.products)
					store.commit('setFreight', res.data.cost)
					let temp = {
						rate: res.data.rate,
						shopId: res.data.shopId,
						shopRate:  res.data.shopRate,
						shopName: res.data.shopName,
						shopAvatar: res.data.shopAvatar,
						shopAddress: res.data.shopAddress,
						areaName: res.data.areaName
					}
					console.log(temp)
					store.commit('setShop', temp)
					this.getActivity(res.data.shopId)
					// console.log(res.data.products[5].shopStore_ProductItems[0].productItemStr)
					// console.log(JSON.parse(res.data.products[5].shopStore_ProductItems[0].productItemStr))
			},
			async getActivity(id) {
				const res = await this.$myRequest({
					url: 'api/Activity?ShopId=' + id
				})
				console.log(res.data.data)
				store.commit('setActivity', res.data.data)
				uni.hideLoading();
			}
		}
	}
</script>

<style>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
