<template>
	<view class="category_list">
		<view class="header">
			<view class="left" @click="priceClick">价格
				<view class="sort_icon">
					<image :src="upSort ? sortIcon.active_icon : sortIcon.icon" mode="" class="up"></image>
					<image :src="downSort ? sortIcon.active_icon : sortIcon.icon" mode=""></image>
				</view>
			</view>
			<view class="center" @click="hotClick">热销</view>
			<view class="right" @click="newClick">上新</view>
		</view>
		<view class="block"></view>
		<wyb-popup ref="popup" type="top" height="200" width="" radius="6" :showCloseIcon="true">
		    <view class="popup-content">
		        我是里面的内容
		    </view>
		</wyb-popup>
		<view class="list">
			<goodsList :goods="goods"></goodsList>
		</view>
	</view>
</template>

<script>
	import popup from '@/components/wyb-popup/wyb-popup.vue'
	import goodsList from '@/components/goodsList/goodsList.vue';
	import data from '@/data/cate/category_list.js'
	
	export default {
		components: {
			goodsList,
			popup
		},
		data() {
			return {
				upSort: false,
				downSort: false,
				sortIcon: {
					icon: '../../static/images/triangle.svg',
					active_icon: '../../static/images/triangle_active.svg'
				},
				goods: []
			}
		},
		methods: {
			priceClick() {
				this.$refs.popup.show() // 显示
			},
			hotClick() {
				
			},
			newClick() {
				
			},
			// this.$refs.popup.show() // 显示
			// this.$refs.popup.hide() // 隐藏
		},
		onLoad(options) {
			this.goods = data.temp.data
			console.log(options, this.goods)
		}
	}
</script>

<style lang="scss">
	.category_list {
		height: calc(100vh - 88rpx);
		background-color: $uni-grey-bg-color;
		.block {
			height: 80rpx;
		}
		.header {
			color: #515151;
			background-color: #fff;
			position: fixed;
			top: 88rpx;
			width: 100%;
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			z-index: 9999;
			.left {
				flex: 1;
				display: inline-block;
				.sort_icon {
					vertical-align: top;
					display: inline-block;
					width: 30rpx;
					text-align: center;
					line-height: 16rpx;
					margin: 20rpx 0;
					.up {
						transform:rotate(180deg);
					}
					image {
						width: 16rpx;
						height: 16rpx;
					}
				}
			}
			.center {
				flex: 1;
				display: inline-block;
			}
			.right {
				flex: 1;
				display: inline-block;
			}
		}
	}
</style>
