<template>
	<view>
		<image :src="img||$constData.defaultImg" mode=""></image>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				img: ''
			}
		},
		// onLoad() {
		// 	this.getImage()
		// },
		// methods: {
		// 	async getImage() {
		// 		const res = await this.$myRequest({
		// 			url: 'api/',
					
		// 		})
		// 	}
		// }
	}
</script>

<style lang="scss">
image {
	width: 100%;
}
</style>
