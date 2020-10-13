<template>
	<view class="detail">
		<swiper indicator-dots="true" autoplay="true">
			<swiper-item v-for="item in productDetail.images" :key="item.id">
				<image :src="item.url"></image>
			</swiper-item>
		</swiper>
		<view class="header">
			<view class="info">
				<view class="describe">{{productDetail.name}}</view>
				<view class="share">
					<uni-icons type=""></uni-icons>
				</view>
			</view>
			<view class="price_area">
				<view class="price1 price"><text>￥</text>{{productDetail.price1}}</view>
				<view class="price2 price"><text>￥</text>{{productDetail.price2}}</view>
				<view class="price3 price"><text>￥</text>{{productDetail.price3}}</view>
			</view>
			<view class="price_describe">
				<view>原市场价</view>
				<view>会员价</view>
				<view>店铺复购价</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productDetail: {}
			}
		},
		methods: {
			
		},
		onLoad(options) {
			console.log(options)
			this.productDetail = {
				images: [
					{
						id: 0,
						url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg',
					},
					{
						id: 1,
						url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg',
					},
					{
						id: 2,
						url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg',
					},
				],
				name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
				price1: 35.13,
				price2: 15.23,
				price3: 18.15,
				comment: [],
				attribution:{},
				shop: '',
				shopPortrait: ''
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		background-color: $uni-grey-bg-color;
		swiper {
			width: 750rpx;
			height: 750rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.header {
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 0.5em;
			.info {
				
				.describe {
					display: inline-block;
					width: 500rpx;
					height: auto;
				}
				.share {
					display: inline-block;
					width: 100rpx;
					height: 100rpx;
				}
			}
			.price_area {
				display: flex;
				text {
					font-size: 20rpx;
				}
				.price {
					flex: 1;
					font-size: 40rpx;
				}
				.price1 {
					color: $price1;
				}
				.price2{
					color: $price2;
				}
				.price3 {
					color: $price3;
				}
			}
			.price_describe {
				display: flex;
				view {
					flex: 1;
					font-size: 20rpx;
					color: $font-color-disabled;
				}
			}
		}
	}
	
</style>
