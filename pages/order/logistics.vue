<template>
	<view>
		<view class="info area">
			<view class="good_img">
				<image :src="order.pic? $constData.imageServer+''+order.pic:$constData.defaultImg" mode=""></image>
				<view>{{order.productItemName}}</view>
			</view>
			<view class="orange_area">
				<view class="state">已发货</view>
				<view class="info">包裹离你越来越近</view>
			</view>
		</view>
		<view class="company area">
			<image :src="$constData.defaultImg" mode=""></image>
			<view class="name">圆通快递</view>
			<view class="phone">官方电话：123456</view>
		</view>
		<view class="steps area">
			<uni-steps active-color="#FE8E22" :options="[{title:'买家下单',desc:'2018-11-11'},{title:'卖家发货',desc:'2018-11-12'},{title:'买家签收',desc:'2018-11-13'},{title:'交易完成',desc:'2018-11-14'}]" direction="column" :active="2"></uni-steps>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				order: null
			};
		},
		onLoad() {
			let that = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.order = data.data.productItems[0]
			})
			console.log(this.order)
			
		},
		methods: {
			// async getExpressage
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 20rpx 40rpx;
	}
	.area {
		border-radius: 0.5em;
		background-color: #FBFBFB;
		margin-bottom: 20rpx;
	}
	.info {
		.good_img {
			margin: 0rpx auto;
			padding: 40rpx 0;
			width: 160rpx;
			height: 160rpx;
			text-align: center;
			image {
				width: 120rpx;
				height: 120rpx;
			}
			view {
				height: 40rpx;
				line-height: 40rpx;
				font-size: 26rpx;
			}
		}
		.orange_area {
			padding: 30rpx 40rpx;
			color: #fff;
			background: linear-gradient(rgb(255,126,0),rgb(254,157,63));
			border-bottom-right-radius:0.5em;
			border-bottom-left-radius:0.5em;
			.state {
				font-size: 32rpx;
			}
			.info {
				font-size: 24rpx;
			}
		}
	}
	.company {
		overflow: hidden;
		box-shadow: 0 2px 1px #ccc;
		color: #808080;
		image {
			float: left;
			margin: 5rpx 20rpx;
			width: 80rpx;
			height: 80rpx;
		}
		.name {
			
		}
		.phone {
			font-size: 26rpx;
		}
	}
	
</style>
