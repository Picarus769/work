<template>
	<view class="home">
		<view class="header">
			<view class="search_content">
				<view class="header_left">
					<view class="header_text">{{lebalText}}</view>
				</view>
				<view class="header_right">
					<view class="input">
						<input type="text">
						<embed src="../../static/images/search.svg" class="search" type="">
					</view>
				</view>
			</view>
			<view class="home_header_navigation">
				<template v-for="(item, index) in headerNavigation">
					<view class="home_navigation_bar" @click="navClick(index)">
						<text :class="{isSelected: item.selected}">{{item.name}}</text>
					</view>
				</template>
			</view>
			<view class="big_img">
				<image :src="bigImg" mode=""></image>
			</view>
		</view>
		<view class="body">
			<view class="icon_navigation">
				<template v-for="item in iconNavigation">
					<view class="icon_navi_bar" @click="iconNavClick(item.url)">
						<image :src="item.icon" mode=""></image>
						<view>{{item.name}}</view>
					</view>
				</template>
			</view>
			<view class="activity_img">
				<image :src="activityImg" mode=""></image>
			</view>
			<view class="activity_area">
				<text class="act_describe">新人推荐</text>
				<view class="act_nav">
					<view class="activity_products">
						<view class="act_product_item" v-for="item in activity_products">
							<image :src="item.img" mode="scaleToFill"></image>
							<view>{{item.message}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="goods-list">
			<goodsList :goods="goodsList"></goodsList>
		</view>
		
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
				lebalText: '',
				headerNavigation: [],
				iconNavigation: [],
				activity_products: [],
				bigImg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg',
				activityImg: '',
				goodsList: []
			}
		},
		onLoad() {
			this.lebalText = this.$constData.lebalText
			this.headerNavigation = this.$constData.homeNavigation
			this.iconNavigation = this.$constData.homeIconNavigation
			this.activityImg = '../../static/images/activity_img.png'
			this.goodsList = [
				{
					id: 0,
					message: '随便买点什么',
					price: '10.1',
					master: 'pcs',
					images: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg'
				},
				{
					id: 1,
					message: 'aaa',
					price: '10.1',
					master: 'pcs',
					images: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg'
				},
				{
					id: 2,
					message: 'aaa',
					price: '10.1',
					master: 'pcs',
					images: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg'
				}
			]
		},
		methods: {
			navClick(index) {
				console.log(index)
			},
			iconNavClick(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		.header {
			height: 300rpx;
			background-color: $uni-color-primary;
			
			.search_content {
				padding: 40rpx 20rpx 20rpx 20rpx;
				.header_left {
					display: inline-block;
					text-align: center;
					width: 20%;
					.header_text {
						margin: auto;
						color: #fff;
						font-size: 42rpx;
					}
				}
				.header_right {
					display: inline-block;
					width: 75%;
					height: 54rpx;
					.input {
						position: relative;
						background-color: #fff;
						border-radius: 1em;
						height: 54rpx;
						padding: 5rpx;
						embed {
							width: 40rpx;
							height: 40rpx;
						}
						input {
							margin-left: 20rpx;
							display: inline-block;
							width: 350rpx;
							font-size: 30rpx;
						}
						.search {
							position: absolute;
							top: 8rpx;
							right: 20rpx;
						}
					}
				}
			}
			.home_header_navigation {
				display: flex;
				height: 50rpx;
				.home_navigation_bar {
					text-align: center;
					color: #fff;
					flex: 1;
					font-size: 30rpx;
					.isSelected {
						border-bottom: 2px #fff solid;
					}
				}
			}
			.big_img {
				margin: 20rpx;
				height: 290rpx;
				image {
					border-radius: 0.5em;
					width: 710rpx;
					height: 250rpx;
				}
			}
		}
		.body {
			margin-top: 170rpx;
			.icon_navigation {
				display: flex;
				height: 150rpx;
				.icon_navi_bar {
					flex: 1;
					text-align: center;
					font-size: 20rpx;
					image {
						width: 100rpx;
						height: 100rpx;
					}
				}
			}
			.activity_img {
				height: 120rpx;
				margin: 20rpx;
				image{
					height: 150rpx;
					width: 690rpx;
				}
			}
			.activity_area {
				margin: 40rpx 20rpx 30rpx 20rpx;
				height: 220rpx;
				width: 710rpx;
				background-color: $uni-color-primary;
				border-radius: 0.5em;
				.act_describe {
					margin: 5rpx 10rpx;
					color: #fff;
					font-size: 30rpx;
				}
				.activity_products {
					
				}
			}
		}
		.goods-list {
			background-color: #eee;
		}
	}
</style>
