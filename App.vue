<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
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
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
