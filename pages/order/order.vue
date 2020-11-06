<template>
	<view>
		<view class="bottom-bar">
			<view class="btn" @click="submit">
				提交订单
			</view>
			<view class="price">{{payPrice}}</view>
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
				
<!-- 				<view class="points area">
					<image class="point_icon" src="../../static/images/score.svg" mode=""></image>
					<text>可用{{costShopInt}}店铺积分抵扣{{sPrice}}元</text>
					<image class="check" @click="checkClick(0)" :src="shopIntChecked? '../../static/images/check_active.svg' : '../../static/images/check.svg'" mode=""></image>
				</view> -->
				<view class="points area">
					<image class="point_icon" src="../../static/images/score.svg" mode=""></image>
					<text>可用{{costInt}}平台积分抵扣{{intPrice}}</text>
					<image class="check" @click="checkClick(1)" :src="integralChecked? '../../static/images/check_active.svg' : '../../static/images/check.svg'" mode=""></image>
				</view>
				<view class="alert"><text class="red">*</text><text>抵扣优先级：优惠券>平台积分</text></view>
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
					本次可反平台积分{{reIntegral}}分
				</view>
				<view class="block"></view>
				<view class="block"></view>
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
				// sortByShopInt: [],
				sortByInt: [],
				integralChecked: false,
				// shopIntChecked: false,
				product: [],
				orderProduct: [],
				specClass: 'none',
				address: {},
				vouchers: [],
				currentVoucherId: null,
				voucherMoney: 0,
				totalPrice: 0,
				// costShopInt: 0,
				// shopIntPrice: 0,
				costInt: 0,
				intPrice: 0,
				intDeductCount: [],
				voucherUsed: false,
				voucherIntValue: 0
			}
		},
		computed: {
			...mapGetters(['userInfo', 'shop', 'freight', 'cartList']),
			
			filteredVouchers() {
				return this.vouchers.filter(item => item.state === 1)
			},
			count() {
				return this.product.reduce((sum, item) => {return sum + item.selectCount},0)
			},
			
			// totalPrice() {
			// 	let sPrice = this.shopIntChecked?this.shopIntPrice : 0
			// 	let iPrice = this.integralChecked?this.intPrice : 0
			// 	let temp = this.product.reduce((sum, item) => {return sum + item.price * item.selectCount},0).toFixed(2) - sPrice - iPrice + this.freight - this.voucherMoney
			// 	return temp>this.freight? temp:this.freight
			// },
			// sPrice() {
			// 	console.log('a')
			// 	if(this.shopIntPrice>this.totalPrice-this.freight) return this.totalPrice-this.freight
			// 	return this.shopIntPrice
			// },
			iPrice() {
				if(this.integralChecked === true) return this.intPrice
				return 0
			},
			
			// //平台积分可抵扣
			// intPrice() {
			// 	return this.product.reduce((sum, item) => {return sum + item.integral * this.userInfo.integral},0)-this.sPrice
			// },
			// reShopInt() {
			// 	return this.product.reduce((sum, item) => {
			// 		let a = item.reIntegral===-1?0:item.reIntegral
			// 		return sum + a * item.selectCount},0)
			// },
			reIntegral() {
				return this.product.reduce((sum, item) => {return sum + item.reIntegral * item.selectCount},0)
			},
			voucherFilter() {
				return this.vouchers.filter(item => item.state === 1)
			},
			// lastShopInt() {
			// 	return this.userInfo.shopIntegral - this.costShopInt
			// },
			lastInt() {
				if(this.voucherUsed) return this.userInfo.integral - this.costInt + this.voucherIntValue
				return this.userInfo.integral - this.costInt
			},
			voucherDeductPrice() {
				return this.totalPrice - this.voucherMoney
			},
			payPrice() {
				if (this.integralChecked) return this.totalPrice - this.iPrice  + this.freight
				return this.voucherDeductPrice + this.freight 
			},
			
			// iiPrice() {
			// 	return this.integralChecked?this.iPrice : 0
			// },
			// ssPrice() {
			// 	return this.shopIntChecked?this.sPrice : 0
			// }
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
			// //店铺积分可抵扣
			// calcShopIntPrice() {
			// 	this.costShopInt = 0
			// 	this.shopIntPrice = 0
			// 	if(this.totalPrice - this.voucherMoney === this.freight) {
			// 		 this.shopIntPrice === 0
			// 		return
			// 	} else if (this.userInfo.shopIntegral === 0) {
			// 		this.shopIntPrice === 0
			// 		return 
			// 	} else {
			// 		for(let i in this.sortByShopInt) {
			// 			if(this.sortByShopInt[i].shopStoreId == 1) {
			// 				continue
			// 			}
						
			// 			let totalP = this.sortByShopInt[i].selectCount * this.sortByShopInt[i].price
			// 			let costS = Math.ceil(totalP/this.sortByShopInt[i].shopIntegral)
			// 			if(this.lastShopInt<costS) {
			// 				this.costShopInt += this.lastShopInt
			// 				this.shopIntPrice += this.lastShopInt*this.sortByShopInt[i].shopIntegral
			// 				return
			// 			} else {
			// 				this.costShopInt += costS
			// 				this.shopIntPrice += totalP
			// 			}	
			// 		}
					
			// 	}
			// },
			//平台积分可抵扣
			calcIntPrice() {
				this.costInt = 0
				this.intPrice = 0
				this.intDeductCount = []
				let lastPrice = this.totalPrice
				for(let item of this.sortByInt) {
					//积分不足抵扣当前商品
					if(item.integral>this.lastInt) {
						continue
					} else {
						//抵扣当前商品数量
						
						for(let i=1;i<=item.selectCount;i++) {
							console.log(i)
							
							if(item.integral>this.lastInt) {
								this.intDeductCount.push(i-1)
								break;
							} else {
								if(lastPrice < item.price) {
									continue
								}
								this.costInt += item.integral
								this.intPrice = i*item.price
								lastPrice -= item.price
							}
						}
					}
					console.log(this.intPrice)
					// let totalP = item.selectCount * item.price
					// let costS = Math.ceil(totalP/item.integral)
					// if(this.lastInt<costS) {
					// 	this.costInt += this.lastInt
					// 	this.shopIntPrice += this.lastInt*item.shopIntegral
					// 	return
					// } else {
					// 	this.costInt += costS
					// 	this.intPrice += totalP
					// }	
				}
				if(this.voucherIntValue) {
					this.costInt = (this.costInt - this.voucherIntValue) > 0? this.costInt - this.voucherIntValue : 0
				}
				
				console.log('花费积分：',this.costInt)
				console.log('可抵扣', this.intPrice)
				console.log('计数', this.intDeductCount)
				// if(this.totalPrice - this.voucherMoney -this.ssPrice -this.freight === 0) {
				// 	this.intPrice === 0
				// 	return
				// } else if (this.userInfo.integral === 0) {
				// 	this.intPrice === 0
				// 	return
				// } else {
				// 	for(let item of this.sortByInt) {
				// 		let totalP = item.selectCount * item.price
				// 		let costS = Math.ceil(totalP/item.integral)
				// 		if(this.lastInt<costS) {
				// 			this.costInt += this.lastInt
				// 			this.shopIntPrice += this.lastInt*item.shopIntegral
				// 			return
				// 		} else {
				// 			this.costInt += costS
				// 			this.intPrice += totalP
				// 		}	
				// 	}
				// }
			},
			useVoucher(payload) {
				if(payload === 0) {
					this.currentVoucherId = null
					this.voucherMoney = 0
					this.voucherIntValue = 0
					this.calcIntPrice()
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
				this.voucherUsed = true
				this.currentVoucherId = payload.id
				this.voucherMoney = payload.price
				this.voucherIntValue = payload.int
				console.log(this.currentVoucherId)
				this.$refs.popup.close()
				// this.calcShopIntPrice()
				this.calcIntPrice()
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
				if(flag === 1) {
				// 	this.shopIntChecked = !this.shopIntChecked
				// 	this.calcShopIntPrice()
				// 	this.calcIntPrice()
				// } else if (flag ===1) {
					this.integralChecked = !this.integralChecked
					// this.calcShopIntPrice()
					this.calcIntPrice()
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
						// "useShopIntegral": this.shopIntChecked,
						"useShopIntegral": false,
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
					this.product.forEach(item => {
						if(item.iid) {
							this.$store.commit('deleteItem', item.iid)
						}
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
			console.log('订单列表', this.product)
			
			this.address = this.$store.state.oftenAddress
			// this.sortByShopInt = this.product.sort((a,b)=> b.shopIntegral - a.shopIntegral)
			this.sortByInt = this.product.sort((a,b)=> b.integral - a.integral)
			this.totalPrice = this.product.reduce((sum, item) => {return sum+item.price*item.selectCount},0)

			// this.calcShopIntPrice()
			this.calcIntPrice()
			// console.log(this.sortByShopInt)
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
		z-index: 99;
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
			.alert {
				margin: 20rpx;
				color: $font-color-disabled;
				font-size: 26rpx;
				.red {
					color: red;
				}
			}
			
		}
		.block {
			height: 80rpx;
		}
		.voucher {
			font-size: 30rpx;
		}
	</style>
