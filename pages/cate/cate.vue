<template>
	<view class="cate">
		<view class="left">
			<scroll-view scroll-y="true">
				<view v-for="item in cate" :key="item.id" :class="{selected: selectedId === item.id}" @click="navClick(item.id)">{{item.cateName}}</view>
			</scroll-view>
		</view>
		<view class="right">
			<scroll-view scroll-y="true" v-show="selectedId">
				<view>
					<goodsList :goods="filteredItems" :isOneCol="isOneCol"></goodsList>
				</view>
			</scroll-view>

			<view class="right-up" v-show="selectedId === 0">
				暂无活动
				<!-- <view>
					<image class="icon" :src="lebalUp.icon" type="">
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
					<image class="icon" :src="lebalDown.icon" type="">
					<view class="lebal">{{lebalDown.message}}</view>
				</view>
				<view class="cate-icon">
					<view v-for="item in currentCate.address" :key="item.id" class="cate-item">
						<view class="cate-name">{{item.name}}</view>
						<image :src="item.img?item.img:$constData.defaultImg" mode=""></image>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	import goodsList from '../../components/goodsList/goodsList.vue'
	import data from '@/data/cate/cate.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		components: {
			goodsList
		},
		data() {
			return {
				isOneCol: true,
				currentCate: null,
				selectedId: 1,
				lebalUp: null,
				lebalDown: null
			}
		},
		computed: {
			...mapGetters(['products']),
			cate() {
				// return [{
				// 	id: 0,
				// 	cateName: '热门活动'
				// }, ...this.$store.state.cate]
				
				return this.$store.state.cate;
			},
			filteredItems() {
				return this.products.filter(item => item.cateId === this.selectedId)
			}
		},
		methods: {
			navClick(id) {
				this.selectedId = id
				// this.currentCate = this.cate[index].cateList
				// console.log(this.currentCate)
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
			// this.cate = data.temp
			// console.log(this.cate)
			this.currentCate = this.cate[this.selectedId].cateList
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-grey-bg-color;
	}

	.cate {

		scroll-view {
			height: 100%;
		}

		display: flex;

		.left {
			background-color: #fff;
			width: 180rpx;
			height: calc(100vh - 50px);

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
			height: calc(100vh - 50px);
			display: flex;
			flex-direction: column;
			overflow: hidden;
			box-sizing: border-box;
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
				flex: 1;
				padding: 20rpx;
				background-color: #fff;
				margin-top: 40rpx;
				width: 490rpx;
			}

			.cate-icon {
				display: flex;
				flex-wrap: wrap;

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
