<template>
	<view class="message">
		<view class="header">
			<view v-for="item in config" :key='item.name' class="nav_bar" @click="itemClick">
				<view class="icon" :class="item.bgColor">
					<image :src="item.icon" type="">
				</view>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="middle_line"></view>
		<view class="chat_list" v-for="item in messageList" :key="item.id" @click="itemClick">
			<view class="chat_item">
				<view class="chat_left">
					<image :src="item.portrait" mode=""></image>
				</view>
				<view class="chat_center">
					<view class="chat_name">{{item.name}}</view>
					<view class="chat_message">{{item.message}}</view>
				</view>
				<view class="chat_right">
					<view class="chat_time">{{item.lastTime}}</view>
					<view class="uncheck_count">{{item.unCheckCount}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: [],
				messageList: []
			}
		},
		methods: {
			itemClick() {
				uni.showToast({
					title: "功能尚未完成",
					icon: "none"
				})
			}
		},
		onLoad() {
			this.config = this.$constData.msgHeaderConfig
			this.messageList = [
				{
					id: 0,
					name: '服务通知',
					portrait: '../../static/images/portrait.png',
					message: '啊啊啊啊啊啊啊啊啊',
					unCheckCount: 2,
					lastTime: '10:10'
				}
			]
		}
	}
</script>

<style lang="scss">
	.message {
		.header {
			display: flex;
			justify-content: space-around;
			height: 160rpx;
			padding-top: 20rpx;
			width: 100%;
			
			.nav_bar {
				text-align: center;
				width: 130rpx;
				height: 160rpx;
				.icon {
					margin: auto;
					text-align: center;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					vertical-align: middle;
					image {
						margin-top: 15rpx;
						margin-left: 5rpx;
						vertical-align: middle;
						text-align: center;
						width: 50rpx;
						height: 50rpx;
					}
				}
				view {
					color: $uni-grey-font-color;
					font-size: 28rpx;
					height: 60rpx;
					line-height: 60rpx;
				}
			}
		}
		.middle_line {
			background-color: $uni-grey-bg-color;
			height: 20rpx;
		}
		.chat_list {
			border-bottom: 1rpx solid #eee;
			
			.chat_item {
				height: 150rpx;
				width: 100%;
				
				.chat_left {
					display: inline-block;
					width: 150rpx;
					image {
						margin: 15rpx;
						width: 120rpx;
						height: 120rpx;
					}
				}
				.chat_center {
					display: inline-block;
					vertical-align: top;
					width: 450rpx;
					height: 100%;
					.chat_name {
						height: 55rpx;
						line-height: 55rpx;
						font-size: 36rpx;
						margin-top: 20rpx;
						color: $uni-color-primary;
					}
					.chat_message {
						font-size: 26rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						text-overflow: ellipsis;
						overflow: hidden;
						height: 55rpx;
						line-height: 55rpx;
						margin-bottom: 20rpx;
						color: $uni-grey-font-color;
					}
				}
				.chat_right {
					width: 150rpx;
					height: 100%;
					display: inline-block;
					text-align: center;
					vertical-align: top;
					.chat_time {
						margin-top: 20rpx;
						height: 55rpx;
						line-height: 55rpx;
						font-size: 20rpx;
					}
					.uncheck_count {
						margin: auto;
						background-color: $uni-color-primary;
						border-radius: 50%;
						color: #fff;
						height: 45rpx;
						width: 45rpx;
						line-height: 45rpx;
						font-size: 20rpx;
					}
				}
			}
		}
	}
	.bg_color1 {
		background-color: $uni-msgicon-color1;
	}
	.bg_color2 {
		background-color: $uni-msgicon-color2;
	}
	.bg_color3 {
		background-color: $uni-msgicon-color3;
	}
	.bg_color4 {
		background-color: $uni-msgicon-color4;
	}
	.bg_color5 {
		background-color: $uni-msgicon-color5;
	}
</style>
