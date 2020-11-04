<template>
	<view>
		<view class="bottom-bar">
			<view class="btn" @click="submit">
				提交订单
			</view>
			<view class="price">{{totalPrice}}</view>
			<view class="text">合计：</view>
			<view class="count">共{{count}}件,</view>
		</view>
		<view class="main">
			<view class="order">
				<view class="address area" @click="addressClick">
					<view class="left">
						<image src="../../static/images/position1.svg" mode=""></image>
					</view>
					<view class="center">
						<view class="top">
							<text class="name">{{address.name}}</text>
							<text class="phone">{{address.phone}}</text>
						</view>
						<view class="down">
							{{address.provinceName+address.cityName+address.countieName+address.info}}
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/arrow1.svg" mode=""></image>
					</view>
				</view>
				
				<view class="product area" v-for="item in product">
					<view class="shop_name"></view>
					<view class="product_item">
						<view class="left">
							<image :src="item.itemPic?$constData.imageServer + item.itemPic.split(',')[0]:$constData.defaultImg" mode=""></image>
						</view>
						<view class="center">
							<view class="product_message">
								{{item.productItemName}}
							</view>
						</view>
						<view class="right">
							<view class="price">
								￥{{item.price}}
							</view>
							<view class="count">
								×{{item.selectCount}}
							</view>
						</view>
					</view>
					<view class="distribution">配送方式：普通配送</view>
					<view class="distribution">快递费用：{{freight}}</view>
					<view class="total_price">
						
					</view>
				</view>
				
				<view class="points area">
					<image class="point_icon" src="../../static/images/score.svg" mode=""></image>
					<text>可用店铺积分抵扣{{sPrice}}元</text>
					<image class="check" @click="checkClick(0)" :src="shopIntChecked? '../../static/images/check_active.svg' : '../../static/images/check.svg'" mode=""></image>
				</view>
				<view class="points area">
					<image class="point_icon" src="../../static/images/score.svg" mode=""></image>
					<text>可用平台积分抵扣{{iPrice}}元</text>
					<image class="check" @click="checkClick(1)" :src="integralChecked? '../../static/images/check_active.svg' : '../../static/images/check.svg'" mode=""></image>
				</view>
				<view class="area voucher" @click="open"><text v-if="currentVoucherId === null">使用优惠券</text><text v-else>已使用优惠券减{{voucherMoney}}</text></view>
				<uni-popup ref="popup" type="bottom">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="vouchers">
							<coupon v-for="(item, index) in voucherFilter" :key="index" :btn="state(item.state)" :item="item" @useVoucher="useVoucher" theme="#ff0000"></coupon>
							<view class="block"></view>
							<view class="cancel" @click="useVoucher(0)"><view>不使用优惠券</view></view>
						</view>
					</scroll-view>
					
					
				</uni-popup>
				<view class="reIntegral">
					本次可反平台积分{{reIntegral}}分,店铺积分{{reShopInt}}
				</view>
				
			</view>
			
		</view>
	</view>
	
	
</template>

<script>
	import coupon from '@/components/coolc-coupon/coolc-coupon';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	import {mapGetters} from 'vuex'
	export default {
		components: {
			uniPopup,
			coupon
		},
		data() {
			return {
				integralChecked: false,
				shopIntChecked: false,
				product: [],
				orderProduct: [],
				specClass: 'none',
				address: {},
				vouchers: [],
				currentVoucherId: null,
				voucherMoney: null,
			}
		},
		computed: {
			...mapGetters(['userInfo', 'shop', 'freight']),
			
			filteredVouchers() {
				return this.vouchers.filter(item => item.state === 1)
			},
			count() {
				return this.product.reduce((sum, item) => {return sum + item.selectCount},0)
			},
			totalPrice() {
				let sPrice = this.shopIntChecked?this.shopIntPrice : 0
				let iPrice = this.integralChecked?this.intPrice : 0
				let temp = this.product.reduce((sum, item) => {return sum + item.price * item.selectCount},0).toFixed(2) - sPrice - iPrice + this.freight - this.voucherMoney
				return temp>this.freight? temp:this.freight
			},
			sPrice() {
				if(this.shopIntPrice>this.totalPrice-this.freight) return this.totalPrice-this.freight
				return this.shopIntPrice
			},
			iPrice() {
				if(this.intPrice>this.totalPrice-this.freight) return this.totalPrice-this.freight
				return this.intPrice
			},
			//店铺积分可抵扣
			shopIntPrice() {
				return this.product.reduce((sum, item) => {return sum + item.shopIntegral * this.userInfo.shopIntegral},0)
			},
			//平台积分可抵扣
			intPrice() {
				return this.product.reduce((sum, item) => {return sum + item.integral * this.userInfo.integral},0)
			},
			reShopInt() {
				return this.product.reduce((sum, item) => {return sum + item.reShopIntegral * item.selectCount},0)
			},
			reIntegral() {
				return this.product.reduce((sum, item) => {return sum + item.reIntegral * item.selectCount},0)
			},
			voucherFilter() {
				return this.vouchers.filter(item => item.state === 1)
			}
		},
		methods: {
			state(n) {
				if(n===0) {
					return '领取'
				} else if (n === 1) {
					return '使用'
				} else if (n === 2) {
					return '已使用'
				}
			},
			open(){
				this.$refs.popup.open()
			},
			useVoucher(payload) {
				if(payload === 0) {
					this.currentVoucherId = null
					this.voucherMoney = null
					this.$refs.popup.close()
					return
				}
				console.log(payload)
				if(payload.money>this.totalPrice) {
					uni.showToast({
						title: '不满足条件',
						icon: 'none'
					})
					return
				}
				this.currentVoucherId = payload.id
				this.voucherMoney = payload.price
				console.log(this.currentVoucherId)
				this.$refs.popup.close()
			},
			async getVoucher() {
				console.log(this.shop.shopId)
				const res = await this.$myRequest({
					url: 'api/Voucher',
					data: {
						ShopId: this.shop.shopId,
						userId: this.userInfo.id
					}
				})
				console.log(res.data)
				this.vouchers = res.data
			},
			checkClick(flag) {
				if(flag === 0) {
					this.shopIntChecked = !this.shopIntChecked
				} else if (flag ===1) {
					this.integralChecked = !this.integralChecked
				}
				// this.isChecked = !this.isChecked
			},
			addressClick() {
				uni.navigateTo({
					url: '../profile/address'
				})
			},
			async submit() {
				console.log(this.userInfo.id)
				console.log(this.$store.state.shop.shopId)
				console.log(this.shopIntChecked)
				console.log(this.integralChecked)
				console.log(this.orderProduct)
				console.log(this.product[0].activityId)
				console.log(this.address.id)
				console.log(this.currentVoucherId)
				const res = await this.$myRequest({
					url: 'api/UserOrders',
					method: 'POST',
					data: {
						"userAddressId": this.address.id,
						"userId": this.userInfo.id,
						"shopId": this.$store.state.shop.shopId,
						"activitieId": this.product[0].activityId||null,
						"useShopIntegral": this.shopIntChecked,
						"useIntegral": this.integralChecked,
						"productItems": this.orderProduct,
						"voucherId": this.currentVoucherId
					}
				})
				console.log(res)
				if(res.data>0) {
					uni.navigateTo({
						url: '/pages/profile/myOrder'
					})
				}
			}
		},
		onLoad(option) {
			this.getVoucher()
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptDataFromOpenerPage', data => {
				if (data.data.length) {
					console.log(0)
					this.product = data.data
				} else {
					console.log(1)
					let temp = data.data.product
					temp.selectCount = data.data.count
					if (temp.selectCount === 0) {
						temp.selectCount = 1
					}
					this.product.push(temp)
				}
				this.product.forEach(item => {
					this.orderProduct.push({
						productItemId: item.productItemId,
						count: item.selectCount
					}) 
				})
				console.log(this.orderProduct)
			})
			console.log(this.product)
			this.address = this.$store.state.oftenAddress

		}
	}
</script>

<style lang="scss">
	page {
		
		background-color: $uni-grey-bg-color;
	}
	scroll-view {
		height: 100%;
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
	.main {
		padding: 20rpx;
	}
	.order {
		.score_area {
			background-color: #fff;
			border-radius: 0.5em;
			
		}
		.area {
			background-color: #fff;
			padding: 20rpx;
			border-radius: 0.5em;
			margin-bottom: 20rpx;
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
						font-size: 26rpx;
						color: $font-color-disabled;
					}
				}
				.down {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 26rpx;
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
					color: $font-color-disabled;
					margin: 10rpx 20rpx;
					font-size: 28rpx;
				}
			}
			.points {
				display: flex;
				.point_icon {
					width: 50rpx;
					height: 50rpx;
					vertical-align: middle;
				}
				text {
					flex: 1;
					font-size: 26rpx;
					height: 50rpx;
					line-height: 50rpx;
				}
				.check {
					width: 40rpx;
					height: 40rpx;
					
				}
			}
			.vouchers {
				padding: 20rpx;
				background-color: #fff;
				
				.block {
					height: 80rpx;
				}
				.cancel{
					text-align: center;
					position: fixed;
					border-radius: 2em;
					bottom: 10rpx;
					margin: 0 150rpx;
					background-color: #eee;
					height: 80rpx;
					line-height: 80rpx;
					padding: 0 100rpx;
					view {
						
					}
				}
			}
			.reIntegral {
				margin: 20rpx 30rpx;
				font-size: 26rpx;
			}
			
			
		}
		.voucher {
			font-size: 30rpx;
		}
	</style>
