<template>
	<view class="detail">
		<swiper indicator-dots="true" circular="true" autoplay="true">
			<swiper-item  v-for="(item,index) in infoPics" :key="item.index">
				<image :src="$constData.imageServer+item"></image>
			</swiper-item>
		</swiper>
		<view class="header area">
			<view class="info">
				<view class="describe">{{productDetail.name}}</view>
				<view class="share" @click="share">
					<image :src="config.shareIcon" type="">
					<view>分享</view>
				</view>
			</view>
			<view class="price_area">
				<view class="price1 price"><text>￥</text>{{this.currentAttr.price}}</view>
				<!-- 
				<view class="price2 price"><text>￥</text>{{productDetail.price2?productDetail.price2:'暂无'}}</view>
				<view class="price3 price"><text>￥</text>{{productDetail.price3?productDetail.price3:'暂无'}}</view> -->
			</view>
			<view class="price_describe">
				<!-- <view>价格</view> -->
				<!-- <view>{{config.price2}}</view> --><!-- 
				<view>{{config.price3}}</view> -->
			</view>
			<view class="int">
				<!-- <view>每店铺积分可抵：{{this.currentAttr.shopIntegral>0?this.currentAttr.shopIntegral:'0'}}</view> -->
				<view>可用{{this.currentAttr.integral}}平台积分兑换</view>
				<!-- <view>{{config.price2}}</view> --><!-- 
				<view>{{config.price3}}</view> -->
			</view>
			<view class="int">
				<!-- <view>每店铺积分可抵：{{this.currentAttr.shopIntegral>0?this.currentAttr.shopIntegral:'0'}}</view> -->
				<view>可返{{this.currentAttr.reIntegral}}平台积分</view>
				<!-- <view>{{config.price2}}</view> --><!-- 
				<view>{{config.price3}}</view> -->
			</view>
		</view>
		
		<view class="options area">
			<view class="option" @click="open">
				<view class="left">规格</view>
				<view class="center" v-if="selectCount===0">请选择规格</view>
				<view class="center" v-else>{{currentAttr.productItemName+ ' '+'×'+selectCount}}</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="popup_content">
					<view class="popup_info">
						<image :src="currentAttr.itemPic?$constData.imageServer+currentItemImg:$constData.defaultImg"
						 mode=""></image>
						<view class="info">
							<view class="name">{{currentAttr.productItemName}}</view>
							<view class="price">￥{{selectCount === 0 ? currentAttr.price : totalPrice}}</view>
							<view class="count">库存：{{currentAttr.count ? currentAttr.count : 0}}</view>
						</view>
					</view>
					<view class="popup_attr">
						<view v-for="item in productDetail.shopStore_ProductItems" :key="item.id" class="attr_item" @click="selectAttr(item.id)">
							<view type="default" size="mini" :class="{is_selected: item.id===currentAttr.id}">{{item.productItemName}}</view>
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
				<view class="btn_area">
					<button type="default" @click="close">完成</button>
				</view>
				
			</uni-popup>
			<!-- <pop-menu title="购买类型" @hide="hideService" :specClass="specClass" @show="toggleSpec">
					<view slot="content">
						<text class="selected-text" v-if="selectCount===0">请选择规格</text>
						<text class="selected-text" v-if="selectCount!==0">{{currentAttr.productItemName+ ' '+'×'+selectCount}}</text>
					</view>
					<view slot="popup" @click.stop="stopPrevent">
						<view class="popup_content">
							<view class="popup_info">
								<image :src="currentAttr.itemPic?$constData.imageServer+currentItemImg:$constData.defaultImg"
								 mode=""></image>
								<view class="info">
									<view class="name">{{currentAttr.productItemName}}</view>
									<view class="price">￥{{selectCount === 0 ? currentAttr.price : totalPrice}}</view>
									<view class="count">库存：{{currentAttr.count ? currentAttr.count : 0}}</view>
								</view>
							</view>
							<view class="popup_attr">
								<view v-for="item in productDetail.shopStore_ProductItems" :key="item.id" class="attr_item" @click="selectAttr(item.id)">
									<view type="default" size="mini" :class="{is_selected: item.id===currentAttr.id}">{{item.productItemName}}</view>
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
						<button type="default" @click="attrChecked">完成</button>
					</view>
				</pop-menu> -->

			<view class="option">
				<view class="left">发货</view>
				<view class="center"><text>{{shop.areaName+' '}}</text><text v-if="freight">快递{{freight}}元</text><text v-else>免邮费</text></view>
				
			</view>
		</view>
		<view class="comment area">
			<view class="title">
				<view class="left">{{config.comment}}({{productDetail.comments?productDetail.comments.length : 0}})</view>
				<view class="right">{{config.allComment}}
					<image :src="$constData.arrowIcon2" type="">
				</view>
			</view>
			<view class="comment_content">
			</view>
		</view>
		<view class="shop area" @click="shopClick">
			<view class="shop_info">
				<view class="left">
					<image :src="shop.shopAvatar?$constData.imageServer+shop.shopAvatar:$constData.defaultImg" mode=""></image>
				</view>
				<view class="center">
					{{shop.shopName}}
				</view>
				<view class="right">进店逛逛</view>
			</view>
			<view class="shop_comment">
				<view v-for="item in shopComment" :key="item.name" class="score">
					<text>{{item.name}}</text>
					<text>{{item.score}}</text>
				</view>
			</view>
		</view>
		<view class="split">——————宝贝详情——————</view>
		<view class="detail_img">
			<view v-for="(item, index) in infoPics" :key="index">
				<image :src="$constData.imageServer+item" mode="widthFix"></image>
			</view>
		</view>
		<view class="block_area">
		</view>
		<view class="bottom_bar">
			<view class="left">
				<navigator url="/pages/index/index" open-type="switchTab" class="navi">
					<view>
						<image :src="config.homeIcon" type="">
							<view>首页</view>
					</view>
				</navigator>
				<navigator url="/pages/chat/chat" open-type="navigate" class="navi">
					<image :src="config.chatIcon" type="">
						<view>客服</view>
				</navigator>
				<navigator url="/pages/cart/cart" open-type="switchTab" class="navi">
					<image :src="config.cartIcon" type="">
						<view>购物车</view>
				</navigator>
			</view>
			<view class="right">
				<view class="add_cart" @click="addCart">加入购物车</view>
				<view class="buy_now" @click="buyClick(currentAttr,selectCount)">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import popMenu from '@/components/rf-item-popup/index.vue';
	import config from '@/config/detailData.js';
	import data from '@/data/detail/detail.js';
	import {
		mapGetters
	} from 'vuex'
	export default {

		components: {
			popMenu,
			uniPopup
		},
		data() {
			return {
				specClass: 'none', // 商品参数弹窗
				attrId: 0,
				infoPics: [],
				productDetail: {},
				config: config.detailConfig,
				attrSelected: false,
				selectCount: 0,
				shopComment: []
			}
		},
		computed: {
			...mapGetters(['shop', 'freight', 'cartList']),
			currentAttr() {
				
				if (this.productDetail.shopStore_ProductItems) {
					return this.productDetail.shopStore_ProductItems.filter((item) => this.attrId == item.id)[0]
				} else {
					return {
						activityId: this.productDetail.activityId,
						count: this.productDetail.count,
						id: this.productDetail.id,
						integral: this.productDetail.integral,
						itemPic: this.productDetail.productItemPic,
						price: this.productDetail.price,
						productId: this.productDetail.productId,
						productItemId: this.productDetail.productItemId,
						productItemName: this.productDetail.productItemName,
						reIntegral: this.productDetail.returnIntegral,
						reShopIntegral: this.productDetail.returnShopIntegral,
						shopIntegral: this.productDetail.shopIntegral
					}
				}
			},
			totalPrice() {
				return this.currentAttr.price * this.selectCount
			},
			currentItemImg() {
				return this.currentAttr.itemPic.split(',')[0]
			}
			//监听点击商品
			// productClick() {
			// 	return this.$store.state.currentProduct
			// }

		},
		watch: {

		},
		methods: {
			open(){
				if (!this.productDetail) return;
				if(this.selectCount === 0) this.selectCount = 1
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			share() {
				uni.navigateTo({
					url: './share'
				})
			},
			//加入购物车
			addCart() {
				if (this.currentAttr.activityId) {
					uni.showToast({
						title: '活动商品不支持加入购物车',
						icon:"none"
					})
					return
				}
				// let old = this.cartList.find(item=> this.currentAttr.id === item.iid)
				// if (old.count)
				console.log(this.currentAttr.id)
				const product = {}
				product.activityId = this.currentAttr.activityId
				product.itemPic = this.currentAttr.itemPic
				product.productItemName = this.currentAttr.productItemName
				product.totalCount = this.currentAttr.count
				product.selectCount = this.selectCount != 0 ? this.selectCount : 1
				product.integral = this.currentAttr.integral
				product.reIntegral = this.currentAttr.reIntegral
				product.reShopIntegral = this.currentAttr.reShopIntegral
				product.shopIntegral = this.currentAttr.shopIntegral
				product.desc = this.productDetail.info
				product.price = this.currentAttr.price
				product.iid = this.currentAttr.id
				product.shopStoreId = this.productDetail.shopId
				product.productItemId = this.currentAttr.productItemId
				this.$store.dispatch('addCart', {product, count:this.selectCount===0?1:this.selectCount}).then(res => {
					uni.showToast({
						title: res
					})
					// this.$toast.show(res, 1500)
				})
			},
			buyClick(currentAttr, selectCount) {
				uni.navigateTo({
					url: '/pages/order/order',
					success(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: {
								product: currentAttr,
								count: selectCount
							}
						})
					}
				})
			},
			//增加数量
			increment() {
				if (this.selectCount >= this.currentAttr.count) return
				this.selectCount++
			},
			//减少数量
			decrement() {
				if (this.selectCount === 0) return
				this.selectCount--
			},
			attrChecked() {
				this.specClass = 'none';
			},
			//规格关闭
			hideService() {
				this.specClass = 'none';
			},

			//规格窗口开启
			toggleSpec(row) {
				
				if (!this.productDetail) return;
				if(this.selectCount === 0) this.selectCount = 1
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
			//选择规格
			selectAttr(id) {
				this.attrSelected = true
				this.attrId = id
				console.log(this.currentAttr)
			},
			//点击商家
			shopClick() {
				uni.navigateTo({
					url: '/pages/shop/shop'
				})
			},
			//阻止冒泡
			stopPrevent() {}
		},
		onLoad(option) {
			this.productDetail = this.$store.state.currentProduct
			this.infoPics = this.productDetail.infoPic ? this.productDetail.infoPic.split(',') : []

			if (!this.productDetail.shopStore_ProductItems) {
				this.attrId = 1
			} else {
				this.attrId = this.productDetail.shopStore_ProductItems[0].id
			}
			console.log(this.$constData.imageServer + this.shop.shopAvatar)
			console.log(this.productDetail)
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

					image {
						width: 70rpx;
						height: 70rpx;
					}
				}
			}

			.price_area {
				display: flex;
				text-align: center;
				text {
					font-size: 20rpx;
				}

				.price {
					// flex: 1;
					
					font-size: 40rpx;
				}

				.price1 {
					color: $price1;
				}

				.price2 {
					color: $price2;
				}

				.price3 {
					color: $price3;
				}
			}

			.price_describe {
				margin-bottom: 10rpx;
				display: flex;
				text-align: center;
				view {
					// flex: 1;
					font-size: 20rpx;
					color: $font-color-disabled;
				}
			}
			.int {
				margin-bottom: 10rpx;
				display: flex;
				text-align: center;
				view {
					// flex: 1;
					font-size: 20rpx;
					color: $font-color-disabled;
				}
			}
		}

		.options {
			.option {
				display: flex;
				align-items: center;
				padding: 20rpx 30rpx;
				position: relative;
				font-size: $font-sm + 2upx;
				.left {
						width: 140rpx;
						color: $font-color-disabled;
				}

				.center {
					display: inline-block;
					flex: 1;
				}

				.right {
					display: inline-block;
				}
			}

			.popup_content {
				background-color: #fff;
				width: 100%;
				height: auto;
				box-sizing: border-box;
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
						width: 450rpx;
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

				.popup_attr {
					display: flex;
					flex-wrap: wrap;

					.attr_item {
						view {
							display: inline-block;
							padding: 10rpx;
							margin: 10rpx;
							border-radius: 0.5em;
							font-size: 22rpx;
							background-color: $uni-grey-bg-color;
						}

						.is_selected {
							background-color: #ccc;
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
			.btn_area{
				background-color: #fff;
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
					right: 50rpx;
					color: $uni-color-primary;

					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}

		.block_area {
			height: $bottom_bar_height;
		}

		.shop {
			.shop_info {
				height: 100rpx;

				.left {
					display: inline-block;

					image {
						width: 100rpx;
						height: 100rpx;
					}
				}

				.center {
					margin-left: 50rpx;
					vertical-align: top;
					height: 100rpx;
					line-height: 100rpx;
					display: inline-block;
					font-weight: 600;
				}

				.right {
					float: right;
					margin: 19rpx 0;
					padding: 5rpx 20rpx;
					height: 50rpx;
					line-height: 50rpx;
					display: inline-block;
					vertical-align: top;
					border: 1px solid $uni-color-primary;
					border-radius: 1.2em;
					color: $uni-color-primary;
				}
			}

			.shop_comment {
				margin: 10rpx;
				display: flex;

				.score {
					text-align: center;
					flex: 1;
					font-size: 24rpx;
				}
			}
		}

		.split {
			text-align: center;
			margin: 20rpx 0;
			font-size: 28rpx;
			color: $font-color-disabled;
		}

		.detail_img {
			image {
				width: 100%;
			}
		}

		.bottom_bar {
			position: fixed;
			bottom: 0;
			height: $bottom_bar_height;
			width: 100%;
			background-color: #fff;
			display: flex;

			.left {
				display: flex;

				.navi {
					flex: 1;
					text-align: center;

					image {
						width: 45rpx;
						height: 45rpx;
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
				font-size: 32rpx;

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
