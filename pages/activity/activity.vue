<template>
	<view>
		<goodsList :goods="activities[0].activity_ProductItemDtos"></goodsList>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList/goodsList.vue'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			goodsList
		},
		computed: {
			...mapGetters(['activities'])
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page {
	background-color: $uni-grey-bg-color;
}
</style>
