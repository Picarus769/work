<template>
	<view>
		<menu-list :config="config"></menu-list>
	</view>
</template>

<script>
	import menuList from '../../components/menu/menu.vue'
	export default {
		components: {
			menuList
		},
		data() {
			return {
				config: [
					{
						id: 0,
						message: "店铺积分",
						url: '/pages/profile/shopPoints'
					},
					{
						id: 1,
						message: "平台积分",
						url: '/pages/profile/rootPoints'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $uni-grey-bg-color;
	}
</style>
