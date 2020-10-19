<template>
	<view class="order">
		<view class="address area">
			<view class="left">
				<image src="../../static/images/position1.svg" mode=""></image>
			</view>
			<view class="center">
				<view class="top">
					<text class="name">潘</text>
					<text class="phone">2425425</text>
				</view>
				<view class="down">
					具体地址具体地址具体地址址具体地址具体地址
				</view>
			</view>
			<view class="right">
				<image src="../../static/images/arrow1.svg" mode=""></image>
			</view>
		</view>
		<view class="product area">
			<view class="shop_name"></view>
			<view class="product_item">
				<view class="left">
					<image :src="product.itemPic?product.itemPic:''" mode=""></image>
				</view>
				<view class="center">
					<view class="product_message">
						{{product.info}}
					</view>
				</view>
				<view class="right">
					<view class="price">
						￥{{product.price}}
					</view>
					<view class="count">
						×{{count}}
					</view>
				</view>
			</view>
			<view class="distribution">配送方式：普通配送</view>
			<view class="total_price">
				
			</view>
		</view>
		<!-- <pop-menu 
			title="积分抵扣"
			@hide="hideService"
			:specClass="specClass"
			@show="toggleSpec"
			 class="score_area"
			>
		</pop-menu> -->
		<view class="points area">
			<image class="point_icon" src="../../static/images/score.svg" mode=""></image>
			<text>可用积分抵扣</text>
			<image class="check" @click="checkClick" :src="isChecked? '../../static/images/check_active.svg' : '../../static/images/check.svg'" mode=""></image>
		</view>
		<view class="bottom-bar">
			<view class="btn">
				提交订单
			</view>
			<view class="price"></view>
			<view class="price">12.56</view>
			<view class="text">合计：</view>
			<view class="count">共{{count}}件,</view>
		</view>
	</view>
</template>

<script>
	import popMenu from '@/components/rf-item-popup/index.vue';
	export default {
		components: {
			popMenu
		},
		data() {
			return {
				isChecked: false,
				product: null,
				count: null,
				specClass: 'none'
			}
		},
		methods: {
			checkClick() {
				this.isChecked = !this.isChecked
			}
			// //规格关闭
			// hideService() {
			// 	this.specClass = 'none';
			// },
			// //规格窗口开启
			// toggleSpec(row) {
			// 	if (!this.productDetail) return;
			// 	if (this.specClass === 'show') {
			// 		this.currentStock = row.stock;
			// 		this.currentSkuPrice = row.price;
			// 		this.currentSkuName = row.skuName;
			// 		this.currentCartCount = row.cartCount;
			// 		const skuId = row.skuId;
					
			// 		// if (this.cartType === 'cart') {
			// 		// 	this.handleCartItemCreate(skuId);
			// 		// } else if (this.cartType === 'buy') {
			// 		// 	this.buy(skuId);
			// 		// }
			// 		// this.cartType = null;
			// 		this.specClass = 'hide';
			// 		setTimeout(() => {
			// 			this.specClass = 'none';
			// 		}, 250);
			// 	} else if (this.specClass === 'none') {
			// 		this.specClass = 'show';
			// 	}
			// },
		},
		onLoad() {
			this.product = {
				"name": "属性1",
				"price": 20,
				"info": "产品1属性1",
				"productId": 16,
				"itemPic": 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg',
				"id": 1
			}
			this.count = 1
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-grey-bg-color;
	}
	.order {
		.score_area {
			background-color: #fff;
			border-radius: 0.5em;
			margin: 20rpx;
		}
		.area {
			background-color: #fff;
			padding: 20rpx;
			border-radius: 0.5em;
			margin: 20rpx;
		}
		.address {
			display: flex;
			height: 100rpx;
			overflow: hidden;
			.left {
				display: inline-block;
				
				height: 100rpx;
				width: 80rpx;
				line-height: 100rpx;
				
				image {
					
					vertical-align: middle;
					width: 60rpx;
					height: 60rpx;
				}
			}
			.center {
				display: flex;
				flex-direction: column;
				width: 550rpx;
				.top {
					.name {
						margin-right: 30rpx;
						font-size: 36rpx;
						height: 50rpx;
						line-height: 50rpx;
					}
					.phone {
						font-size: 20rpx;
						color: $font-color-disabled;
					}
				}
				.down {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 20rpx;
					height: 50rpx;
				}
			}
			.right {
				width: 100rpx;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				image{
					
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
		.product {
			.product_item {
				display: flex;
				.left {
					
					margin-right: 20rpx;
					vertical-align: top;
					image {
						border-radius: 0.5em;
						width: 150rpx;
						height: 150rpx;
					}
				}
				.center {
					flex: 1;
					font-size: 30rpx;
					margin-right: 20rpx;
					.product_message {
						font-size: 28rpx;
					}
				}
				.right {
					
					.count {
						color: $font-color-disabled;
						position: relative;
						right: 0;
					}
				}
			}
			.distribution {
				margin: 20rpx;
				font-size: 28rpx;
			}
		}
		.points {
			.point_icon {
				width: 50rpx;
				height: 50rpx;
				vertical-align: middle;
			}
			text {
				font-size: 30rpx;
				height: 50rpx;
				line-height: 50rpx;
			}
			.check {
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
				margin-left: 400rpx;
			}
		}
		.bottom-bar {
			background-color: #fff;
			position: fixed;
			width: 100%;
			height: 100rpx;
			bottom: 0;
			display: flex;
			flex-direction: row-reverse;
			.btn {
				height: 80rpx;
				line-height: 80rpx;
				background-color: #FE3F13;
				color: #fff;
				padding: 0 30rpx;
				border-radius: 0.5em;
				font-size: 30rpx;
				margin: 10rpx;
			}
			view {
				height: 100rpx;
				line-height: 100rpx;
			}
			.price {
				color: #FE3F13;
			}
			.count {
				color: $font-color-disabled;
				font-size: 20rpx;
			}
		}
	}
</style>
