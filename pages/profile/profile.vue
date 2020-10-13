<template>
	<view class="container">
		<view class="header">
			<view class="header_left">
				<image src="../../static/images/Roulette1.png" mode="" class="header_left_image"></image>
			</view>
			<view class="header_center">
				<view>用户名</view>
				<view class="gray_font">店铺编号:726840795</view>
			</view>
			<view class="header_right">
				<view class="gray_font">基本信息 ></view>
			</view>
		</view>
		<view class="main">
			<view class="button_area">
				<view class="button">
					<embed :src="config.myOrder.icon" type="" class="button_icon">
					<view class="button_name">{{config.myOrder.message}}</view>
				</view>
				<view class="button">
					<embed :src="config.accountFunds.icon" type="" class="button_icon">
					<view class="button_name">{{config.accountFunds.message}}</view></view>
				<view class="button">
					<embed :src="config.myPoints.icon" type="" class="button_icon">
					<view class="button_name">{{config.myPoints.message}}</view></view>
				<view class="button">
					<embed :src="config.settings.icon" type="" class="button_icon">
					<view class="button_name">{{config.settings.message}}</view></view>
			</view>
			<view class="deadline"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: {}
			}
		},
		methods: {},
		onLoad() {
			this.config = this.$constData.profileConfig
			console.log(this.config)
		}
	}
</script>

<style lang="scss">
	.container {
		.header {
			width: 100%;
			height: 155rpx;
			padding: 15rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			color: #000;
			border-bottom: 1px solid #c8c7cc;

			.header_left {
				width: 125rpx;
				height: 100%;

				.header_left_image {
					width: 100%;
					height: 100%;
				}
			}

			.header_center {
				display: flex;
				height: 100%;
				flex-direction: column;
				justify-content: space-around;
				.gray_font{
					font-size: 12rpx;
					color: #c8c7cc;
				}
			}

			.header_right {
				display: flex;
				align-items: center;
				.gray_font{
					font-size: 12rpx;
					color: #c8c7cc;
				}
			}
		}
		.main {
			background-color: $uni-grey-bg-color;
			
			.button {
				margin: 20rpx 0;
				height: 100rpx;
				background-color: #fff;
				.button_icon {
					margin: 25rpx;
					vertical-align: middle;
					width: 50rpx;
					height: 50rpx;
				}
				.button_name {
					display: inline-block;
					height: 100rpx;
					line-height: 100rpx;
				}
			}
			.deadline {
				height: 5rpx;
				width: 100%;
				background-color: $uni-grey-bg-color;
			}
		}
	}
</style>
