<template>
	<view class="detail">
		<swiper indicator-dots="true" autoplay="true">
			<swiper-item v-for="(item,index) in infoPics" :key="item.index">
				<image :src="'https://admin.counselor.hzrxkjgs.cn/'+item"></image>
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
				<view class="price1 price"><text>￥</text>{{productDetail.price?productDetail.price:'暂无'}}</view>
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
				<pop-menu title="购买类型" @hide="hideService" :specClass="specClass" @show="toggleSpec">
					<view slot="content">
						<text class="selected-text">请选择规格</text>
					</view>
					<view slot="popup" @click.stop="stopPrevent">
						<view class="popup_content">
							<view class="popup_info">
								<image :src="currentAttr.itemPic?'https://admin.counselor.hzrxkjgs.cn/'+currentAttr.itemPic:$constData.defaultImg"
								 mode=""></image>
								<view class="info">
									<view class="name">{{currentAttr.name}}</view>
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
				</pop-menu>
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
					<image :src="shop.shopAvatar?'https://admin.counselor.hzrxkjgs.cn/'+shop.shopAvatar:$constData.defaultImg" mode=""></image>
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
				<image :src="'https://admin.counselor.hzrxkjgs.cn/'+item" mode=""></image>
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
	import popMenu from '@/components/rf-item-popup/index.vue';
	import config from '@/config/detailData.js';
	import data from '@/data/detail/detail.js';
	import {
		mapGetters
	} from 'vuex'
	export default {

		components: {
			popMenu,

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
			...mapGetters(['shop']),
			currentAttr() {

				if (this.productDetail.shopStore_ProductItems) {
					return this.productDetail.shopStore_ProductItems.filter((item) => this.attrId == item.id)[0]
				} else {
					return {
						cateId: 1,
						cateName: "种类1",
						count: 23,
						id: 3,
						integral: 10,
						itemPic: "ProductItem/1/alsxso5k.z25.png",
						price: 29,
						productId: 2,
						productItemId: 1,
						productItemName: "产品属性名称",
						reIntegral: 10,
						reShopIntegral: 50,
						shopIntegral: 0
					}
				}
			},
			totalPrice() {
				return this.currentAttr.price * this.selectCount
			},
			//监听点击商品
			// productClick() {
			// 	return this.$store.state.currentProduct
			// }

		},
		watch: {

		},
		methods: {
			share() {
				uni.navigateTo({
					url: './share'
				})
			},
			//加入购物车
			addCart() {
				const product = {}
				product.image = 'https://admin.counselor.hzrxkjgs.cn/' + this.currentAttr.itemPic
				product.productItemName = this.currentAttr.productItemName
				product.cateId = this.currentAttr.cateId
				product.cateName = this.currentAttr.cateName
				product.totalCount = this.currentAttr.count
				product.selectCount = this.selectCount != 0 ? this.selectCount : 1
				product.integral = this.currentAttr.integral
				product.reIntegral = this.currentAttr.reIntegral
				product.reShopIntegral = this.currentAttr.reShopIntegral
				product.shopIntegral = this.currentAttr.shopIntegral
				product.desc = this.productDetail.info
				product.price = this.currentAttr.price
				product.iid = this.currentAttr.id
				product.productItemId = this.currentAttr.productItemId
				this.$store.dispatch('addCart', product).then(res => {
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
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptDataFromOpenerPage', function(data) {


				this.productDetail = data.data
			})
			this.shopComment = [{
					name: '宝贝描述',
					score: 4.8
				},
				{
					name: '卖家服务',
					score: 4.8
				},
				{
					name: '物流服务',
					score: 4.8
				}
			]
			
			if(!this.$store.state.currentProduct.cateId)
			{
			
			this.productDetail = {
				cateId: 1,
				cateName: "种类1",
				createTime: "2020-10-18T13:02:00.363",
				homePic: "Product/2/Home/ssqqbwmo.nwk.jpeg",
				info: "产品内容介绍",
				infoPic: "Product/2/Info/53bfokrc.jz2.jpeg,Product/2/Info/a4ovycjm.b4v.jpeg,Product/2/Info/euriwjmb.zl4.png",
				name: "产品名称",
				price: 29,
				productId: 2,
				shopId: 5,
				shopStore_ProductItems: [{
					cateId: 1,
					cateName: "种类1",
					count: 23,
					id: 3,
					integral: 10,
					itemPic: "ProductItem/1/alsxso5k.z25.png",
					price: 29,
					productId: 2,
					productItemId: 1,
					productItemName: "产品属性名称",
					reIntegral: 10,
					reShopIntegral: 50,
					shopIntegral: 0
				}]
			}
			
			}else{
				this.productDetail = this.$store.state.currentProduct
			}

			this.infoPics = this.productDetail.infoPic ? this.productDetail.infoPic.split(',') : []

			if (!this.productDetail.shopStore_ProductItems) {
				this.attrId = 1
			} else {
				this.attrId = this.productDetail.shopStore_ProductItems[0].id
			}

			console.log(this.shop)
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

				.price2 {
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
					width: 360rpx;
					vertical-align: top;
					display: inline-block;
					font-weight: 600;
				}

				.right {
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
