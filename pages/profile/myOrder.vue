<template>
	<view class="my_order">
		<view class="nav_bar">
			<view class="nav_item" @click="navClick(item.id)" :class="{is_selected : selectId == item.id}" v-for="item in nav" :key="item.id">
				<text>{{item.message}}</text>
			</view>
		</view>
		<order-list :orderList="state===0?product:filteredProduct">
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
				const res = await this.$myRequest({
					url: 'api/UserOrders?UserId=' + this.$store.state.userInfo.id,
				})
				this.product = res.data.data
				console.log(res.data.data)
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
			// this.product = [
			// 	{
			// 		"id": 0,
			// 		"orderState": 0,
			// 		"paiedTime": "2020-10-19T02:16:08.779Z",
			// 		"sendTime": "2020-10-19T02:16:08.779Z",
			// 		"userId": 0,
			// 		"userName": "string",
			// 		"shopId": 0,
			// 		"shopName": "string",
			// 		"discount": 0,
			// 		"discountInfo": "string",
			// 		"voucherId": 0,
			// 		"price": 0,
			// 		"integral": 0,
			// 		"productItems": [
			// 			{
			// 				"id": 0,
			// 				"userOrderId": 0,
			// 				"productItemId": 0,
			// 				"productItemName": "string",
			// 				"count": 1,
			// 				"discount": 0,
			// 				"price": 20,
			// 				"discountInfo": "string",
			// 				"pic": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg"
			// 			},
			// 			{
			// 				"id": 1,
			// 				"userOrderId": 0,
			// 				"productItemId": 0,
			// 				"productItemName": "string",
			// 				"count": 2,
			// 				"price": 100,
			// 				"discount": 0,
			// 				"discountInfo": "string",
			// 				"pic": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"id": 1,
			// 		"orderState": 1,
			// 		"paiedTime": "2020-10-19T02:16:08.779Z",
			// 		"sendTime": "2020-10-19T02:16:08.779Z",
			// 		"userId": 0,
			// 		"userName": "string",
			// 		"shopId": 0,
			// 		"shopName": "string",
			// 		"discount": 0,
			// 		"discountInfo": "string",
			// 		"voucherId": 0,
			// 		"price": 0,
			// 		"integral": 0,
			// 		"productItems": [
			// 			{
			// 				"id": 0,
			// 				"userOrderId": 0,
			// 				"productItemId": 0,
			// 				"productItemName": "string",
			// 				"count": 1,
			// 				"discount": 0,
			// 				"price": 20,
			// 				"discountInfo": "string",
			// 				"pic": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg"
			// 			},
			// 			{
			// 				"id": 1,
			// 				"userOrderId": 0,
			// 				"productItemId": 0,
			// 				"productItemName": "string",
			// 				"count": 2,
			// 				"price": 100,
			// 				"discount": 0,
			// 				"discountInfo": "string",
			// 				"pic": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165531883,1410252634&fm=26&gp=0.jpg"
			// 			}
			// 		]
			// 	}
			// ],
			
			
			
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
