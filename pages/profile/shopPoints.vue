<template>
	<view>
		<view class="content">
			<view class="left">
				<image src="../../static/images/points.svg" mode=""></image>
			</view>
			<view class="center">
				<view>
					<text class="num">{{userInfo.shopIntegral}}</text>
					<text class="text1">积分></text>
				</view>
				<text class="text2">购物赚积分，积分万能兑</text>
			</view>
			<!-- <view class="right">规则</view> -->
		</view>
		<view class="change">
			<view class="lebal">权益兑换</view>
			<view>可提现金额{{maxValue}}</view>
			<view class="input">
				<label for="num">提现</label><input id="num" type="number" v-model="inputValue" @input="input"/>
			</view>
			
			<button type="default" size="mini" @click="btnClick">提交</button>
		</view>
		
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				inputValue: null
			};
		},
		computed: {
			...mapGetters(['userInfo', 'shop']),
			btnClick() {
				this.submit()
			},
			maxValue() {
				return this.userInfo.shopIntegral*this.shop.shopRate
			}
		},
		methods: {
			
			input(e) {
				if(this.inputValue>this.maxValue){setTimeout(()=> this.inputValue = this.maxValue,0)}
			},
			async submit() {
				const res = await this.$myRequest({
					url: 'api/WithdrawRecord',
					method: 'POST',
					data: {
						userId: this.userInfo.id,
						shopId: this.shop.shopId,
						price: parseInt(this.inputValue)
					}
				})
				console.log(res)
				if (res.statusCode === 200) {
					uni.showToast({
						title: '提交成功！'
					})
				} else {
					uni.showToast({
						title: '提交失败！',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-grey-bg-color;
	}
	.content {
		background-color: #fff;
		display: flex;
		height: 120rpx;
		width: 100%;
		padding: 40rpx;
		.left {
			margin-right: 10rpx;
			width: 120rpx;
			image {
				width: 120rpx;
				height: 120rpx;
			}
		}
		.center {
			width: 460rpx;
			.num {
				font-size: 42rpx;
				color: #FE3F14;
				margin-right: 10rpx;
				height: 70rpx;
				line-height: 70rpx;
			}
			.text1 {
				font-size: 30rpx;
				color: #FE3F14;
			}
			.text2 {
				font-size: 30rpx;
				color: $uni-text-color-disable;
			}
		}
		.right {
			width: 80rpx;
			font-size: 28rpx;
			color: $uni-text-color-disable;
		}
	}
	.change {
		margin: 40rpx 20rpx;
		.lebal {
			
			font-size: 38rpx;
			font-weight: 600;
		}
		.input {

						height: 40rpx;
						line-height: 40rpx;
			input {
						vertical-align: middle;
						height: 40rpx;
						line-height: 40rpx;
						display: inline-block;
						background-color: #fff;
					
			}
			}
	}
	button {
		margin-top: 50rpx;
	}
</style>
