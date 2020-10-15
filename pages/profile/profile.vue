<template>
	<view class="container">
		<view v-if="isLogin">
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
		</view>
		<view v-else>
			<view class="header">
				<view class="login_btn" @click="loginClick">点击登录</view>
			</view>
		</view>
		<view class="main">
			<view class="button_area">
				<view v-for="item in config" :key="item.message">
					<view class="button">
						<image :src="item.icon" type="" class="button_icon">
						<view class="button_name">{{item.message}}</view>
						<image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon">
					</view>
				</view>
			</view>
			<view class="deadline"></view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				config: {},
				isLogin: false
			}
		},
		methods: {
			loginClick() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		},
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
			.login_btn {
				margin: auto;
				width: 200rpx;
				height: 70rpx;
				border: 1px solid $uni-color-primary;
				color: $uni-color-primary;
				border-radius: 0.5em;
				text-align: center;
				line-height: 70rpx;
				font-size: 32rpx;
			}
			
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
				.arrow_icon {
					position: absolute;
					right: 20rpx;
					margin: 35rpx;
					width: 30rpx;
					height: 30rpx;
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
