<template>
	<view class="detail">
		<swiper indicator-dots="true" autoplay="true">
			<swiper-item v-for="item in productDetail.images" :key="item.id">
				<image :src="item.url"></image>
			</swiper-item>
		</swiper>
		<view class="header area">
			<view class="info">
				<view class="describe">{{productDetail.name}}</view>
				<view class="share">
					<embed :src="config.shareIcon" type="">
					<view>分享</view>
				</view>
			</view>
			<view class="price_area">
				<view class="price1 price"><text>￥</text>{{productDetail.price1?productDetail.price1:'暂无'}}</view>
				<view class="price2 price"><text>￥</text>{{productDetail.price2?productDetail.price2:'暂无'}}</view>
				<view class="price3 price"><text>￥</text>{{productDetail.price3?productDetail.price3:'暂无'}}</view>
			</view>
			<view class="price_describe">
				<view>{{config.price1}}</view>
				<view>{{config.price2}}</view>
				<view>{{config.price3}}</view>
			</view>
		</view>
		<view class="options area">
			<!-- <view class="option">
				<view class="left">
					{{config.select}}
				</view>
				<view class="center">
					<picker mode="selector" :value="attrIndex" :range="productDetail.attribution" @change="selectAttr">
						<view>{{attrSelected ? productDetail.attribution[attrIndex] : config.selectValue}}</view>
					</picker>
				</view>
				<view class="right">
				</view>
			</view> -->
			<view class="option">
				<pop-menu
					title="购买类型"
					@hide="hideService"
					:specClass="specClass"
					@show="toggleSpec"
				>
					<view slot="content">
						<text class="selected-text">请选择规格</text>
					</view>
					<view slot="popup" @click.stop="stopPrevent">
						<view class="popup_content">
							<view class="popup_info">
								<image :src="currentAttr.itemPic" mode=""></image>
								<view class="info">
									<view class="name">{{currentAttr.name}}</view>
									<view class="price">￥{{currentAttr.price}}</view>
									<view class="count">库存：{{currentAttr.count ? currentAttr.count : 0}}</view>
								</view>
							</view>
							<view class="select_count">
								<text class="lebal">{{config.count}}</text>
								<view class="button_area">
									<text class="btn" @click="decrement">-</text>
									<text class="number">{{selectCount}}</text>
									<text class="btn" @click="increment">+</text>
								</view>
							</view>
						</view>
						<button type="default">完成</button>
					</view>
				</pop-menu>
			</view>
		</view>
		<view class="comment area">
			<view class="title">
				<view class="left">{{config.comment}}({{productDetail.comment.length}})</view>
				<view class="right">{{config.allComment}}
				<embed :src="$constData.arrowIcon2" type=""></view>
			</view>
		</view>
		<view class="shop area">
			<view class="left"></view>
			<view class="center"></view>
			<view class="right"></view>
		</view>
		<view class="bottom_bar">
			<view class="left">
				<navigator
					url="/pages/index/index"
					open-type="switchTab"
					class="navi"
				>
					<view>
						<embed :src="config.homeIcon" type="">
						<view>首页</view>
					</view>
				</navigator>
				<navigator
					url="/pages/chat/chat"
					open-type="switchTab"
					class="navi">
					<embed :src="config.chatIcon" type="">
					<view>客服</view>
				</navigator>
				<navigator
					url="/pages/cart/cart"
					open-type="navigate"
					class="navi">
					<embed :src="config.cartIcon" type="">
					<view>购物车</view>
				</navigator>
			</view>
			<view class="right">
				<view class="add_cart">加入购物车</view>
				<view class="buy_now">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import popMenu from '@/components/rf-item-popup/index.vue';
	import config from '@/config/detailData.js';
	import data from '@/data/detail/detail.js';
	
	export default {
		components: {
			popMenu
		},
		data() {
			return {
				specClass: 'none', // 商品参数弹窗
				attrIndex: 0,
				productDetail: {},
				config: config.detailConfig,
				attrSelected: false,
				selectCount: 0,
			}
		},
		computed: {
			currentAttr() {
				return this.productDetail.productItemDtos[this.attrIndex]
			}
		},
		methods: {
			//增加数量
			increment() {
				if(this.selectCount >= this.currentAttr.count) return
				this.selectCount++
				console.log(this.selectCount)
			},
			decrement() {
				if(this.selectCount === 0) return
				this.selectCount--
				console.log(this.selectCount)
			},
			//减少数量
			//规格关闭
			hideService() {
				this.specClass = 'none';
			},
			//规格窗口开启
			toggleSpec(row) {
				if (!this.productDetail) return;
				if (this.specClass === 'show') {
					this.currentStock = row.stock;
					this.currentSkuPrice = row.price;
					this.currentSkuName = row.skuName;
					this.currentCartCount = row.cartCount;
					const skuId = row.skuId;
					
					// if (this.cartType === 'cart') {
					// 	this.handleCartItemCreate(skuId);
					// } else if (this.cartType === 'buy') {
					// 	this.buy(skuId);
					// }
					// this.cartType = null;
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			selectAttr(event) {
				this.attrSelected = true
				this.attrIndex = event.detail.value
				console.log(event)
			},
			//阻止冒泡
			stopPrevent() {}
		},
		onLoad(options) {
			console.log(this.config)
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
				productItemDtos: [
						{
							"name": "属性1",
							"price": 20,
							"info": "产品1属性1",
							"productId": 16,
							"itemPic": 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg',
							"id": 1
						},
						{
							"name": "属性2",
							"price": 30,
							"info": "产品2属性2",
							"productId": 16,
							"itemPic": 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg',
							"id": 2
						}
				],
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding-bottom: 20rpx;
		background-color: $uni-grey-bg-color;
		swiper {
			width: 750rpx;
			height: 750rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.area {
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 0.5em;
		}
		.header {
			
			.info {
				margin-bottom: 10rpx;
				.describe {
					display: inline-block;
					width: 550rpx;
					height: auto;
				}
				.share {
					vertical-align: top;
					display: inline-block;
					text-align: center;
					width: 120rpx;
					height: 120rpx;
					font-size: 20rpx;
					embed {
						width: 70rpx;
						height: 70rpx;
					}
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
		.options {
			.option {
				.left {
					display: inline-block;
					color: $font-color-disabled;
				}
				.center {
					display: inline-block;
					margin-left: 20rpx;
				}
				.right {
					display: inline-block;
				}
			}
			.popup_content {
				width: 100%;
				height: auto;
				padding: 40rpx;
				
				.popup_info {
					padding-bottom: 40rpx;
					border-bottom: 1px solid #eee;
					image {
						border-radius: 0.3em;
						width: 180rpx;
						height: 180rpx;
						
					}
					.info {
						display: inline-block;
						vertical-align: top;
						padding-left: 40rpx;
						width: 490rpx;
						height: 180rpx;
						.name {
							margin-bottom: 20rpx;
						}
						.price {
							font-size: 34rpx;
							color: red;
						}
						.count {
							color: $font-color-disabled;
						}
					}
				}
				.select_count {
					margin-top: 20rpx;
					height: 80rpx;
					font-size: 38rpx;
					.lebal {
						height: 80rpx;
						line-height: 80rpx;
					}
					.button_area {
						background-color: $uni-grey-bg-color;
						display: inline-block;
						position: absolute;
						right: 20rpx;
						height: 80rpx;
						line-height: 80rpx;
						.btn {
							padding: 0 40rpx;
						}
					}
				}
			}
		}
		.comment {
			.title {
				.left {
					display: inline-block;
					font-weight: 600;
				}
				.right {
					display: inline-block;
					position: absolute;
					right: 20rpx;
					color: $uni-color-primary;
					embed {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
		.bottom_bar {
			position: fixed;
			bottom: 0;
			height: 100rpx;
			width: 100%;
			background-color: #fff;
			display: flex;
			
			.left {
				display: flex;
				.navi {
					flex: 1;
					text-align: center;
					embed {
						width: 50rpx;
						height: 50rpx;
						vertical-align: middle;
						margin: 5rpx 0;
					}
					view {
						font-size: 30rpx;
					}
				}
				flex: 1;
			}
			.right {
				flex: 1;
				display: flex;
				line-height: 100rpx;
				text-align: center;
				color: #fff;
				.add_cart {
					flex: 1;
					background-color: $add_cart;
				}
				.buy_now {
					flex: 1;
					background-color: $buy_now;
				}
			}
		}
	}
	
</style>
