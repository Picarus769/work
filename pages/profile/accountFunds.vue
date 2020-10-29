<template>
	<view>
		<view class="button_area">
			<view v-if="config === {}" class="no_content">
				无菜单列表
			</view>
			<view v-else>
				<view>
					
					<view class="button big" @click="itemClick">
						<view class="title">营销账户 </view>
						<!-- <image :src="item.icon" type="" class="button_icon"> -->
						<view class="button_price">￥0.00</view>
						<image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon">
					</view>
					<view class="button big" @click="itemClick">
						<view class="title">店铺保证金</view>
						<view class="button_price">￥0.00</view>
						<image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon">
					</view>
					<view class="button" @click="itemClick">
						<view class="button_name">银行卡管理</view>
						<image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				config: {
					
				}
			};
		},
		methods: {
			itemClick(url) {
				if (url === '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url
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
	.no_content{
		text-align: center;
	}
	.big {
		padding: 20rpx;
	}
.button {
	padding-left: 20rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
	.title {
		color: #888888;
		font-size: 30rpx;
	}
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
		font-size: 30rpx;
		color: #888888;
		line-height: 100rpx;
	}
	.button_price {
		display: inline-block;
		height: 100rpx;
		font-size: 44rpx;
		line-height: 100rpx;
	}
}
</style>
