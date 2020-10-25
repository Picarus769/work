<template>
	<view>
		<view class="content">
			<view class="left">
				<image src="../../static/images/points.svg" mode=""></image>
			</view>
			<view class="center">
				<view>
					<text class="num">{{points}}</text>
					<text class="text1">积分></text>
				</view>
				<text class="text2">购物赚积分，积分万能兑</text>
			</view>
			<!-- <view class="right">规则</view> -->
		</view>
		<view class="change">
			<view class="lebal">权益兑换</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			points() {
				return this.$store.getters.userInfo.integral
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
	}
</style>
