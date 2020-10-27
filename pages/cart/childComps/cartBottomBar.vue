<template>
	<view class="bottom-bar">
		<view class="all-checked">
			<check-button class="check-button" @click.native="allCheck()" :class="{check: isAllCheck}"></check-button>
			<span>全选</span>
		</view>
		<span class="total-price">合计：{{totalPrice}}元</span>
		<view class="calc" @click="buyClick(cartList)">结算：{{checkLength}}</view>
	</view>
</template>

<script>
	import CheckButton from '@/components/checkButton/CheckButton.vue'
	export default {
		name: "CartBottomBar",
		components: {
			CheckButton
		},
		computed: {
			cartList() {
				return this.$store.state.cartList.filter(item => {
					return item.checked
				})
			},
			totalPrice() {
				return this.$store.state.cartList.filter(item => {
					return item.checked
				}).reduce((pre, item) => {
					return pre + item.price * item.selectCount
				}, 0).toFixed(2)
			},
			checkLength() {
				return this.$store.state.cartList.filter(item => {
					return item.checked
				}).length
			},
			isAllCheck() {
				if (this.$store.state.cartList.length === 0) return false
				return !this.$store.state.cartList.find(item => !item.checked)
			}
		},
		methods: {
			allCheck() {
				if(this.isAllCheck) {
					this.$store.state.cartList.forEach(item => item.checked = false)
				} else {
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
			},
			buyClick(cartList) {
				if(this.checkLength === 0) {
					uni.showToast({
						title: '没有选中的商品',
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: '/pages/order/order',
					
					success(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', {data: cartList})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.bottom-bar {
		height: 40px;
		background-color: #eee;
		position: fixed;
		bottom: 50px;
		width: 100%;
		line-height: 40px;
		display: flex;
	}
	.all-checked {
		display: flex;
		align-items: center;
		width: 75px;
		margin-left: 5px;
	}
	.check-button {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-left: 5px;
	}
	.total-price {
		margin-left: 30px;
		flex: 1;
	}
	.calc {
		text-align: center;
		width: 100px;
		color: #fff;
		background-color: red;
	}
	.check {
		background-color: #FF0000;
		border: none;
	}
</style>
