<template>
	<view class="shop">
		<view class="info">
			<view class="left">
				<image :src="shopInfo.shopAvatar" mode=""></image>
			</view>
			<view class="right">
				<view class="shop_name">{{shopInfo.name}}</view>
				<view class="shop_address">{{shopInfo.addressInfo}}</view>
			</view>
		</view>
		<view class="nav_bar">
			<view class="nav_item" @click="navClick(item.id)" :class="{is_selected : selectId == item.id}" v-for="item in nav" :key="item.id">
				{{item.message}}
			</view>
		</view>
		<goods-list :goods="[]"></goods-list>
	</view>
</template>

<script>
	import goodsList from '@/components/goodsList/goodsList.vue'
	export default {
		components: {
			goodsList
		},
		data() {
			return {
				shopInfo: null,
				product: [],
				selectId: 0,
				nav: [
					{
						id: 0,
						message: '综合'
					},
					{
						id: 1,
						message: '新品'
					},
					{
						id: 2,
						message: '销量'
					},
					{
						id: 3,
						message: '价格'
					}
				]
			};
		},
		methods: {
			navClick(id) {
				this.selectId = id
			}
		},
		onLoad() {
			this.shopInfo = {
				"name": "商店名称",
				"adressId": 1,
				"areaCate": 1,
				"cost": 100,
				"addressInfo": "地址",
				"gps": "gps坐标",
				"shopLevel": 1,
				"staffsId": 1,
				"staffName": "商家姓名",
				"shopAvatar": null,
				"id": 1
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: $uni-grey-bg-color;
}
.shop {
	.info {
		background: linear-gradient(120deg ,rgb(255,159,0), rgb(255,154,0),rgb(245,22,22));
		padding: 50rpx;
		color: #fff;
		height: 120rpx;
		.left {
			display: inline-block;
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}
		.right {
			vertical-align: top;
			margin: 10rpx 0;
			display: inline-block;
			.shop_name {
				height: 60rpx;
				line-height: 60rpx;
				font-size: 34rpx;
			}
			.shop_address{
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
			}
		}
	}
	.nav_bar {
		display: flex;
		.is_selected {
			color: $uni-color-primary;
			border-bottom: 2px solid $uni-color-primary;
		}
		.nav_item {
			margin: 20rpx 60rpx;
			height: 60rpx;
			line-height: 60rpx;
			flex: 1;
			text-align: center;
		}
	}
}
</style>
