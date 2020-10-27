<template>
	<view>
		<goodsList :goods="goods"></goodsList>
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
			...mapGetters(['activities']),
			goods() {
				let arr = this.activities[0].activity_ProductItemDtos.map(item => {
					if(item.productItemPic === null) {
						item.homePic = null
						return item
					} else {
						item.homePic = item.productItemPic.split(',')[0]
						return item
					}
				})
				return arr
			}
			
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
