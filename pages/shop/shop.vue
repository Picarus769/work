<template>
	<view class="shop">
		<view class="info">
			<view class="left">
				<image :src="shopInfo.shopAvatar || '../../static/images/defaultImg.png'" mode=""></image>
			</view>
			<view class="right">
				<view class="shop_name">{{shopInfo.shopName}}</view>
				<view class="shop_address">{{shopInfo.shopAddress}}</view>
			</view>
		</view>
		<!-- <view class="nav_bar">
			<view class="nav_item" 
						@click="navClick(item.id)"
						:class="{is_selected : selectId == item.id}" v-for="item in nav" :key="item.id">
				{{item.message}}
			</view>
		</view> -->
		<goods-list :goods="product"></goods-list>
	</view>
</template>

<script>
	import goodsList from '@/components/goodsList/goodsList.vue'
	export default {
		components: {
			goodsList
		},
		data() {
			return {
				shopInfo: {},
				products: [],
				selectId: 0,
				nav: [
					{
						id: 0,
						message: '综合'
					},
					{
						id: 1,
						message: '新品'
					},
					
					{
						id: 2,
						message: '价格'
					}
				]
			};
		},
		methods: {
			navClick(id) {
				this.selectId = id
			}
		},
		onLoad() {
			this.shopInfo = this.$store.state.shop
			console.log(this.shopInfo)
			this.products = this.$store.state.products
		},
		computed: {
			shop() {
				return this.$store.state.shop
			},
			product() {
				return this.$store.state.products
			},
			// filteredItem() {
			// 	if (this.selectId === 0) {
			// 		return this.product
			// 	}
			// 	else if(this.selectId === 1)
			// 	{
			// 		let arr = new Array();
			// 		arr = this.product.splice(0,this.product.length);
			// 		arr.sort((pre,cur)=>{
								
			// 			if(new Date(pre.createTime) > new Date(cur.createTime))
			// 				{
			// 					return -1;
			// 				}else{
			// 					return 1
			// 				}
			// 		});
			// 		return arr
			// 	}else{
			// 		let arr = new Array();
					
			// 		arr = this.product.splice(0,this.product.length);
					
			// 		arr.sort((pre,cur)=>{
								
			// 			if(pre.price > cur.price)
			// 				{
			// 					return -1;
			// 				}else{
			// 					return 1
			// 				}
			// 		});
			// 		return arr
			// 	}
			// }
		},
		watch: {
			// shop() {
			// 	this.shopInfo = this.$store.state.shop
			// },
			// product() {
			// 	this.products = this.$store.state.products
			// }
		}
	}
</script>

<style lang="scss">
page {
	background-color: $uni-grey-bg-color;
}
.shop {
	.info {
		background: linear-gradient(120deg ,rgb(255,159,0), rgb(255,154,0),rgb(245,22,22));
		padding: 50rpx;
		color: #fff;
		height: 120rpx;
		.left {
			display: inline-block;
			margin-right: 20rpx;
			image {
				
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}
		.right {
			vertical-align: top;
			margin: 10rpx 0;
			display: inline-block;
			.shop_name {
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
			}
			.shop_address{
				height: 50rpx;
				line-height: 50rpx;
				font-size: 28rpx;
			}
		}
	}
	.nav_bar {
		display: flex;
		.is_selected {
			color: $uni-color-primary;
			border-bottom: 2px solid $uni-color-primary;
		}
		.nav_item {
			margin: 20rpx 60rpx;
			height: 60rpx;
			line-height: 60rpx;
			flex: 1;
			text-align: center;
		}
	}
}
</style>
