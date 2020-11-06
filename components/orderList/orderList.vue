<template>
	<view>
		<view class="product area" v-for="(order, index) in orderList" :key="order.id">
			<view class="shop_name">
				{{order.shopName}}
			</view>
			<view class="product_item" v-for="item in order.productItems" :key="item.id">
				<view class="left">
					<image :src="item.pic?$constData.imageServer+item.pic.split(',')[0]:''" mode=""></image>
				</view>
				<view class="center">
					<view class="product_message">
						{{item.productItemName}}
					</view>
				</view>
				<view class="right">
					<view class="price">
						￥{{item.productItemPrice}}
					</view>
					<view class="count">
						×{{item.count}}
					</view>
				</view>
			</view>
			<view class="distribution">
				<view v-if="order.orderState === 0">订单异常</view>
				<view v-if="order.orderState === 1">未付款</view>
				<view v-if="order.orderState === 2">付款时间：</view>
				<view v-if="order.orderState === 3">已发货</view>
				<view v-if="order.orderState === 4">已完成</view>
				<view v-if="order.orderState === 4">返平台积分{{order.reIntegral}}</view>
			</view>
			<view class="freight distribution">邮费：{{freight}}</view>
			<view v-if="order.orderState === 3" class="freight distribution">快递单号：{{order.proof}}</view>
			<view class="intergral"><text>花费平台积分{{order.payIntegral}}</text></view>
			<!-- <view class="intergral"><text>花费店铺积分{{order.payShopIntegral<0?0:order.payShopIntegral}}</text></view> -->
			
			<view class="price">
				<text>实付款
					<text class="moneyIcon">￥</text>
					{{order.payPrice}}
				</text>
				<text class="total_price">
					<text>总价
						<text class="moneyIcon">￥</text>
						{{totalPrice[index]}},
					</text>
				</text>
				
			</view>
			
			<view class="btn">
				<view v-if="order.orderState === 0" class="btn_item">异常</view>
				<view v-if="order.orderState === 1" @click="btnClick(order.orderState)" class="btn_item">去付款</view>
				<view v-if="order.orderState === 3" @click="btnClick(order.orderState,'',order.id)" class="btn_item">确认收货</view>
				<!-- <view v-if="order.orderState === 3" @click="btnClick(9,'/pages/order/logistics', order)" class="btn_item">查看物流</view> -->
				<view v-if="order.orderState === 4" @click="btnClick(order.orderState)" class="btn_item">评价</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		props:{
			orderList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		computed: {
			...mapGetters(['freight']),
			totalPrice() {
				let arr = []
				for (let i=0; i<this.orderList.length;i++) {
					let sum = 0
					this.orderList[i].productItems.forEach(item => sum+=item.count*item.productItemPrice)
					arr.push(sum)
				}
				return arr
			}
		},
		methods: {
			btnClick(state, url ,order) {
				if (state === 1) {
					uni.showToast({
						title: '请等待后台核实',
						icon: 'none'
					})
				} else if (state === 3) {
					this.$emit('receive', order)
				} else if (state === 9) {
					uni.navigateTo({
						url,
						success: function(res) {
						  res.eventChannel.emit('acceptDataFromOpenerPage', { data: order })
						}
					})
				} else {
					uni.showToast({
						title: '功能未完成',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background-color: $uni-grey-bg-color;
	}
	.area {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 0.5em;
		margin: 20rpx;
	}
	.product {
		.product_item {
			margin: 10rpx 0;
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
				position: relative;
				.count {
					color: $font-color-disabled;
					position: absolute;
					right: 0;
				}
			}
		}
		.distribution {
			color: $font-color-disabled;
			margin: 20rpx;
			font-size: 28rpx;
		}
		.price {
			display: flex;
			flex-direction: row-reverse;
		}
		.intergral {
			display: flex;
			flex-direction: row-reverse;
			font-size: 28rpx;
			color: $font-color-disabled;
		}
		.total_price {
			color: $font-color-disabled;
			font-size: 34rpx;
			
		}
		.moneyIcon {
			font-size: 20rpx;
		}
		.btn {
			display: flex;
			flex-direction: row-reverse;
			margin-top: 40rpx;
			.btn_item {
				margin-left: 20rpx;
				padding: 10rpx 20rpx;
				font-size: 30rpx;
				border-radius: 1em;
				border: 1px solid $uni-color-primary;
				color: $uni-color-primary;
			}
		}
	}
</style>
