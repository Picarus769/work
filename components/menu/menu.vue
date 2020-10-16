<template>
	<view>
		<view class="button_area">
			<view v-if="config === {}" class="no_content">
				无菜单列表
			</view>
			<view v-else>
				<view v-for="item in config" :key="item.message">
					<view class="button" @click="itemClick(item.url)">
						<image :src="item.icon" type="" class="button_icon">
						<view class="button_name">{{item.message}}</view>
						<image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			config: {
				type: Array,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			itemClick(url) {
				uni.navigateTo({
					url
				})
				console.log(url)
			}
		}
	}
</script>

<style lang="scss">
	.no_content{
		text-align: center;
	}
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
</style>
