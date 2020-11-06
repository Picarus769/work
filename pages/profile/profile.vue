<template>
	<view class="container">
		<view v-if="userInfo">
			<view class="header">
				<view class="header_left">
					<image :src="userInfo.avatar ? decodeURIComponent(userInfo.avatar) : '../../static/images/Roulette1.png'" mode="" class="header_left_image"></image>
				</view>
				<view class="header_center">
					<view>{{userInfo.name}}</view>
					<!-- <view class="gray_font">店铺编号:726840795</view> -->
				</view>
				<view class="header_right" @click="infoClick">
					<view class="gray_font">收货地址 ></view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="header">
				<view class="login_btn" @click="loginClick">点击登录</view>
			</view>
		</view>
		<view class="main">
			<menuList :config="config"></menuList>
			<view class="deadline"></view>
		</view>
		
	</view>
</template>

<script>
	import menuList from '../../components/menu/menu.vue'
	import {mapGetters} from 'vuex'
	export default {
		components: {
			menuList
		},
		data() {
			return {
				config: {},
				
			}
		},
		onTabItemTap() {
			this.$check()
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			loginClick() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			infoClick() {
				uni.navigateTo({
					url: '/pages/profile/address'
				})
			}
		},
		onLoad() {
			this.config = this.$constData.profileConfig
			console.log(this.userInfo.avatar)
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
					font-size: 30rpx;
					color: #c8c7cc;
				}
			}

			.header_right {
				display: flex;
				align-items: center;
				.gray_font{
					font-size: 28rpx;
					color: #c8c7cc;
				}
			}
		}
		.main {
			background-color: $uni-grey-bg-color;
			
			
			.deadline {
				height: 5rpx;
				width: 100%;
				background-color: $uni-grey-bg-color;
			}
		}
	}
</style>
