<template>
	<view class="shop-item">
		<view class="item-select">
			<CheckButton @click.native="checkedChange" :isChecked="item.checked"></CheckButton>
		</view>
		<view class="item-img">
			<img :src="item.image" alt="商品图片">
		</view>
		<view class="item-info">
			<view class="item-title">{{item.title}}</view>
			<view class="item-desc">{{item.desc}}</view>
			<view class="item-bottom">
				<view class="item-price">{{item.price}}元</view>
				<view class="item-count">×{{item.count}}</view>
			</view>
		</view>
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
			}
		}
	}
</script>

<style lang="scss">
	.shop-item {
		width: 100%;
		display: flex;
		font-size: 0;
		padding: 5px;
		border-bottom: 1px solid #ccc;
	}
	.item-select {
		width: 20px;
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
		padding: 5px;
	}
	.item-img img {
		width: 80px;
		height: 100px;
		display: block;
		border-radius: 5px;
	}
	.item-info {
		font-size: 17px;
		color: #333;
		padding: 5px 10px;
		position: relative;
		overflow: hidden;
	}
	.item-info .item-desc {
		font-size: 14px;
		color: #666;
		margin-top: 15px;
	}
	.item-bottom {
		margin-top: 10px;
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
	}
	.item-price {
		color: orangered;
	}
</style>
