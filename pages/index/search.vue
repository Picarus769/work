<template>
	<view>
		<view class="warning" v-if="filteredItem.length === 0">
			未找到商品
		</view>
		<goodsList :goods='filteredItem'></goodsList>
		<goodsList v-if="filteredItem.length === 0" :goods='products'></goodsList>
	</view>
</template>

<script>
	import goodsList from '@/components/goodsList/goodsList.vue'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				searchValue: ''
			}
		},
		computed: {
			...mapGetters(['products']),
			filteredItem() {
				
				// let str = ['',...this.searchValue,''].join('.*')
				// let reg = new RegExp(str)
				return this.products.filter(item => item.name.indexOf(this.searchValue)!=-1)
				// let arr = []
				// for(let i=0; i<this.products.length;i++) {
				// 	if(reg.test(this.products[i].name)) {
				// 		arr.push(this.products[i])
				// 	}
				// }
			
			}
		},
		methods: {
			
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			let that = this
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
			    console.log(data)
					that.searchValue = data.data
					console.log(that.searchValue)
			  })
			console.log(this.searchValue)
			setTimeout(()=> {
				console.log(this.filteredItem)
				console.log(this.products)
			},2000)
		}
	}
</script>

<style lang="scss" scoped>
.warning {
	text-align: center;
	padding: 40rpx;
}
page {
	background-color: $uni-grey-bg-color;
}
</style>
