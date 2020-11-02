<template>
	<view class="shop-item">
		<view class="item-select">
			<CheckButton @click.native="checkedChange" :isChecked="item.checked"></CheckButton>
		</view>
		<view class="item-img">
			<image :src="item.image" alt="商品图片">
		</view>
		<view class="item-info">
			<view class="item-title">{{item.productItemName}}</view>
			<view class="item-desc">{{item.desc}}</view>
			<view class="item-bottom">
				<view class="item-price">{{item.price}}元</view>
				<view class="item-count">×{{item.selectCount}}</view>
			</view>
		</view>
		<view class="delete" @click="deleteCart">删除</view>
	</view>
</template>

<script>
	import CheckButton from 'components/checkButton/CheckButton.vue'
	export default {
		name: "CartListItem",
		components: {
			CheckButton
		},
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			checkedChange() {
				if (this.item.checked) {
					this.item.checked = false
				} else {
					this.item.checked = true
				}
			},
			deleteCart() {
				this.$emit('deleteItem', this.item.iid)
			}
		}
	}
</script>

<style lang="scss">
	.shop-item {
		width: 100%;
		display: flex;
		font-size: 0;
		padding: 10rpx;
		border-bottom: 1px solid #ccc;
	}
	.item-select {
		width: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-title, .item-desc {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.item-img {
		padding: 10rpx;
	}
	.item-img image {
		width: 180rpx;
		height: 180rpx;
		display: block;
		border-radius: 10rpx;
	}
	.item-info {
		width: 350rpx;
		font-size: 32rpx;
		color: #333;
		padding: 10rpx 20rpx;
		position: relative;
		overflow: hidden;
	}
	.item-info .item-desc {
		font-size: 28rpx;
		color: #666;
		
	}
	.item-bottom {
		
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		right: 20rpx;
	}
	.item-price {
		white-space: nowrap;
		
		color: orangered;
	}
	.delete {
		margin-left: auto;
		padding: 10rpx 20rpx;
		color: #ccc;
		font-size: 30rpx;
	}
</style>
