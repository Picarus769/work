<script>
	import store from '@/store/index.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			store.commit('getCacheData')
			if (store.state.userInfo) {
				console.log(store.state.userInfo)
			} else {
				this.login()
			}
		},
		onShow: function() {
			// if(this.$store.state.location == null) {
			// 	uni.navigateTo({
			// 		url: '/pages/profile/address'
			// 	})
			// }
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async login() {
				const res = await this.$myRequest({
					url: 'api/User?Name=aaa&Id=2&OpenId'
				})
				console.log(res.data.data[0])
				store.commit('setUserInfo', res.data.data[0]);
				let cookies = uni.getStorageSync('userInfo')
				console.log(cookies)
			}
			
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
