<template>
	<view class="coupon_box">
		<view class="other_type">
			<!-- <view class="text"><span>全面型优惠券</span></view> -->
		</view>
		<coupon v-for="(item, index) in vouchers" :key="index" :btn="state(item.state)" :item="item" theme="#ff0000"></coupon>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import coupon from '@/components/coolc-coupon/coolc-coupon';
	export default {
		components: {
			coupon
		},
		data() {
			return {
				vouchers: null,
			}
		},
		computed: {
			...mapGetters(['shop','userInfo']),
			// vouchersFilter() {
			// 	return this.vouchers.map(item =>)
			// }
			
		},
		onLoad() {
			this.getVoucher()
		},
		methods: {
			state(n) {
				if(n===0) {
					return '领取'
				} else if (n === 1) {
					return '已拥有'
				} else if (n === 2) {
					return '已使用'
				}
			},
			async getVoucher() {
				uni.showLoading({
					title:'加载中。。。'
				})
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
				uni.hideLoading()
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.coupon_box {
		box-sizing: border-box;
		width: 100%;
		height: auto;
		display: table;
		padding: 6rpx 26rpx 26rpx 26rpx;
	}

	.other_type {
		box-sizing: border-box;
		width: 100%;
		height: 90rpx;
		padding-top: 50rpx;

		.text {
			width: 100%;
			border-top: 1px solid #eeeeee;
			display: block;
			text-align: center;
			position: relative;
		}

		.text span {
			width: 180rpx;
			height: 40rpx;
			line-height: 40rpx;
			color: #999999;
			display: block;
			background: #ffffff;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -90rpx;
			margin-top: -20rpx;
			font-size: 28rpx;
		}
	}
</style>

