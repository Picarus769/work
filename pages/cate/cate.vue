<template>
	<view class="cate">
		<view class="left">
			<view v-for="(item, index) in cate"
					:key="item.id"
					:class="{selected: selectedId === index}"
					@click="navClick(index)">{{item.message}}</view>
		</view>
		<view class="right" scroll-y="true" >
			<view class="right-up">
				<view>
					<embed class="icon" :src="lebalUp.icon" type="">
					<view class="lebal">{{lebalUp.message}}</view>
				</view>
				<view class="cate-icon">
					<view v-for="item in currentCate.online" :key="item.id" class="cate-item">
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
			}
		},
		onLoad() {
			this.lebalUp = this.$constData.lebalUp
			this.lebalDown = this.$constData.lebalDown
			this.cate = [
			{
				id: 0,
				message: '热门推荐',
				cateList: {
					online: [
						{
							id: 0,
							name: '直播特卖',
							img: ''
						},
						{
							id: 1,
							name: '直播特卖',
							img: ''
						},
						{
							id: 2,
							name: '直播特卖',
							img: ''
						}
					],
					address:[
						{
							id: 3,
							name: '直播特卖',
							img: ''
						},
						{
							id: 4,
							name: '直播特卖',
							img: ''
						},
						{
							id: 5,
							name: '直播特卖',
							img: ''
						},
						{
							id: 6,
							name: '直播特卖',
							img: ''
						}
					]
				},
			},
			{
				id: 1,
				message: '热门推荐',
				cateList: {
					online: [
						{
							id: 0,
							name: '直播特卖',
							img: ''
						},
						{
							id: 1,
							name: '直播特卖',
							img: ''
						},
						{
							id: 2,
							name: '直播特卖',
							img: ''
						}
					],
					address:[
						{
							id: 3,
							name: '直播特卖',
							img: ''
						},
						{
							id: 4,
							name: '直播特卖',
							img: ''
						},
						{
							id: 5,
							name: '直播特卖',
							img: ''
						},
						{
							id: 6,
							name: '直播特卖',
							img: ''
						},
						{
							id: 7,
							name: '直播特卖',
							img: ''
						}
					]
				},
			}
			],
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
			height: 100%;
			.selected {
				background-color: $uni-grey-bg-color;
			}
			view {
				width: 180rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				font-size: 36rpx;
			}
		}
		.right {
			
			width: 600rpx;
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
				height: 300rpx;
				width: 490rpx;
			}
			.right-down {
				padding: 20rpx;
				background-color: #fff;
				margin-top: 40rpx;
				height: calc(100vh - 188rpx - 360rpx);
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
					height: 200rpx;
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
