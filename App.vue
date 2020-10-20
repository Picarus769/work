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
			this.getAddress()
		},
		onShow: function() {
			if(store.state.location.length === 0) {
				uni.navigateTo({
					url: '/pages/profile/setAddress'
				})
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async login() {
				const res = await this.$myRequest({
					url: 'api/User?Id=2&OpenId'
				})
				console.log(res.data.data[0])
				store.commit('setUserInfo', res.data.data[0]);
			},
			async getAddress() {
				const res = await this.$myRequest({
					url: 'api/Address?UserId=' + store.state.userInfo.id
				})
				console.log(res.data.data)
				store.commit('setLocation', res.data.data)
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
