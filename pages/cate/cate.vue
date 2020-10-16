<template>
	<view class="cate">
		<view class="left">
			<scroll-view scroll-y="true" >
				<view v-for="(item, index) in cate"
						:key="item.id"
						:class="{selected: selectedId === index}"
						@click="navClick(index)">{{item.message}}</view>
			</scroll-view>
		</view>
		<view class="right" scroll-y="true" >
			<view class="right-up">
				<view>
					<embed class="icon" :src="lebalUp.icon" type="">
					<view class="lebal">{{lebalUp.message}}</view>
				</view>
				<view class="cate-icon">
					<view v-for="item in currentCate.online" :key="item.id" class="cate-item" @click="cateClick(item.id)">
						<image :src="item.img?item.img:$constData.defaultImg" mode=""></image>
						<view class="cate-name">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="right-down">
				<view>
					<embed class="icon" :src="lebalDown.icon" type="">
					<view class="lebal">{{lebalDown.message}}</view>
				</view>
				<view class="cate-icon">
					<view v-for="item in currentCate.address" :key="item.id" class="cate-item">
						<view class="cate-name">{{item.name}}</view>
						<image :src="item.img?item.img:$constData.defaultImg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import data from '@/data/cate/cate.js'
	
	export default {
		data() {
			return {
				cate: [],
				currentCate: null,
				selectedId: 0,
				lebalUp: null,
				lebalDown: null
			}
		},
		methods: {
			navClick(index) {
				this.selectedId = index
				this.currentCate = this.cate[index].cateList
				console.log(this.currentCate)
			},
			cateClick(id) {
				uni.navigateTo({
					url: './category_list?id=' + id
				})
			}
		},
		onLoad() {
			this.lebalUp = this.$constData.lebalUp
			this.lebalDown = this.$constData.lebalDown
			this.cate = data.temp
			this.currentCate = this.cate[this.selectedId].cateList
		}
	}
</script>

<style lang="scss">
	
	.cate {
		background-color: $uni-grey-bg-color;
		height: calc(100vh - 188rpx);
		display: flex;
		.left {
			background-color: #fff;
			width: 180rpx;
			height: calc(100vh - 188rpx);
			.selected {
				background-color: $uni-grey-bg-color;
			}
			view {
				
				width: 180rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				font-size: 32rpx;
			}
		}
		.right {
			display: flex;
			flex-direction: column;
			height: calc(100vh - 188rpx);
			overflow: hidden;
			width: 580rpx;
			padding: 20rpx;
			.icon {
				width: 50rpx;
				height: 50rpx;
				vertical-align: middle;
			}
			.lebal {
				display: inline-block;
				line-height: 50rpx;
				height: 50rpx;
			}
			.right-up {
				padding: 20rpx;
				background-color: #fff;
				width: 490rpx;
			}
			.right-down {
				padding: 20rpx;
				background-color: #fff;
				margin-top: 40rpx;
				height: calc(100vh - 190rpx - 360rpx);
				width: 490rpx;
			}
			.cate-icon {
				display: flex;
				flex-wrap:wrap;
				.cate-item {
					background-color: $uni-grey-bg-color;
					margin: 20rpx;
					text-align: center;
					width: 120rpx;
					image {
						margin-top: 10rpx;
						width: 90rpx;
						height: 90rpx;
						line-height: 90rpx;
					}
					.cate-name {
						height: 100rpx;
						line-height: 100rpx;
						font-size: 20rpx;
						overflow: hidden;
					}
				}
			}
			
		}
	}
</style>
