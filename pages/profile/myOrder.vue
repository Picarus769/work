<template>
	<view class="my_order">
		<view class="nav_bar">
			<view class="nav_item" @click="navClick(item.id)" :class="{is_selected : selectId == item.id}" v-for="item in nav" :key="item.id">
				<text>{{item.message}}</text>
			</view>
		</view>
		<order-list @receive="receive" :orderList="state===0?product:filteredProduct">
		</order-list>
	</view>
</template>

<script>
	import orderList from '@/components/orderList/orderList'
	export default {
		components: {
			orderList
		},
		data() {
			return {
				selectId: 0,
				product: [],
				state: 0,
				nav: [
					{
						id: 0,
						message: '全部',
						state: 0
					},
					{
						id: 1,
						message: '未付款',
						state: 1
					},
					{
						id: 2,
						message: '待发货',
						state: 2
					},
					{
						id: 3,
						message: '待收货',
						state: 3
					},
					{
						id: 4,
						message: '退款/售后',
						state: 4
					}
				]
			}
		},
		methods: {
			navClick(id) {
				this.selectId = id
				this.state = id
			},
			async getOrders() {
				uni.showLoading({
					title: '加载中...',
					mask: true,
					success() {
						console.log('aaa')
					},
					fail(e) {
						console.log(e)
					}
				})
				const res = await this.$myRequest({
					url: 'api/UserOrders?UserId=' + this.$store.state.userInfo.id,
				})
				this.product = res.data.data
				console.log(res.data.data)
				uni.hideLoading();
			},
			async receive(id) {
				console.log(id)
				const res = await this.$myRequest({
					url: 'api/UserOrders/ChangeUserOrderState',
					method: 'POST',
					data: {
						id: id,
						OrderState: 4
					}
				})
				console.log(res)
				await this.changeInt()
				await this.getOrders()
			},
			async changeInt() {
				const res = await this.$myRequest({
					url: 'api/User?id='+this.$store.state.userInfo.id
				})
				console.log(res.data.data)
				let temp = {
					shopIntegral: res.data.data[0].shopIntegral,
					integral: res.data.data[0].integral
				}
				this.$store.commit('setInt', temp)
			}
		},
		computed: {
			filteredProduct() {
				return this.product.filter(item => {
					return item.orderState === this.state
				})
			}
		},
		onLoad() {
			this.getOrders()

		}
	}
</script>

<style lang="scss" scoped>
	.nav_bar {
		display: flex;
		background-color: #fff;
		.is_selected {
			text {
				padding: 16rpx 0;
				border-bottom: 2px solid $uni-color-primary;
			}
			color: $uni-color-primary;
			
		}
		.nav_item {
			height: 80rpx;
			line-height: 80rpx;
			flex: 1;
			text-align: center;
			font-size: 28rpx;
		}
	}
</style>
