<template>
	<view class="coupon-item">
		<view class="coupon-money">
			<view class="nick" v-if="!types">{{item.seller_name}}使用</view>
			<view class="layof" :style="{color:theme}">￥{{item.money}}</view>
			<view class="end_time">{{item.end_time}}前使用</view>
			<view v-if="!types">
				<view class="tit">券号：{{item.ticket}}</view>
				<view class="demand">{{item.title}}</view>
			</view>
		</view>
		<view class="get-btn" v-if="types" :style="{color:color, borderColor:color, background:solid}">选择使用</view>
		<navigator class="get-btn" v-if="!types" :style="{color:color, borderColor:color, background:solid}" :url='item.url'>立即使用</navigator>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		props: {
			item: {
				type: Object
			},
			types: {
				type: String,
				default: ''
			},
			theme: {
				type: String,
				default: '#ff9000'
			},
			solid: {
				type: String,
				default: '#ffffff'
			},
			color: {
				type: String,
				default: '#ff9000'
			},
		},
		methods: {

		}
	}
</script>

<style lang='scss'>
	.coupon-item {
		box-sizing: border-box;
		width: 100%;
		height: auto;
		display: table;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin-top: 22rpx;
		border: 1px solid #eeeeee;
		position: relative;

		.coupon-money {
			width: 465rpx;
			height: auto;
			display: table;
			float: left;
			padding: 26rpx 0;
			border-style: none dotted none none;
			border-color: #eeeeee;

			.nick {
				width: 100%;
				height: 50rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #999999;
			}

			.tit {
				width: 100%;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				color: #999999;
			}

			.demand {
				width: 100%;
				height: 30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #999999;
			}

			.layof {
				width: 100%;
				height: 48rpx;
				line-height: 30rpx;
				font-size: 44rpx;
				color: #ff9000;
				font-weight: bold;
			}

			.end_time {
				width: 100%;
				height: 30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}

		.get-btn {
			width: 146rpx;
			height: 52rpx;
			line-height: 50rpx;
			position: absolute;
			top: 50%;
			right: 26rpx;
			margin-top: -26rpx;
			text-align: center;
			border-radius: 60rpx;
			color: #ff9000;
			border: 1px solid #ff9000;
			font-size: 24rpx;
			float: right;
		}
	}

	.coupon-item:after {
		width: 40rpx;
		height: 20rpx;
		position: absolute;
		left: 460rpx;
		top: -1px;
		border-radius: 0 0 40rpx 40rpx;
		content: "";
		display: block;
		background: #fff;
		border: 1px solid #eeeeee;
		border-top: 0px;
	}

	.coupon-item:before {
		width: 40rpx;
		height: 20rpx;
		position: absolute;
		left: 460rpx;
		bottom: -1px;
		border-radius: 40rpx 40rpx 0 0;
		content: "";
		display: block;
		background: #fff;
		border: 1px solid #eeeeee;
		border-bottom: 0px;
	}
</style>
