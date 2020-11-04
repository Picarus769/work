<template>
	<view>
		<view class="goods">
			<view v-for="(item, index) in goods" :key="item.id" class="goodsItem" :class="[{goodsItem1: isOneCol},{goodsItem2: !isOneCol}]" @click="itemClick(item, index)">
				<image :src="$constData.imageServer + item.homePic" mode=""></image>
				<view class="message">{{item.name||item.productItemName}}</view>
				<!-- <view>
					<view class="price">{{"￥" + item.price}}</view><view class="old_price" v-if="item.oldPrice">{{"￥" + item.oldPrice}}</view>
				</view> -->
				<view>
					<view class="price">{{price[index][0].price}}</view>
				</view>
				<view>
				</view>
				<!-- <view class="master">
					<image :src="item.portrait" mode="aspectFit" class="portrait"></image>
					<view>{{item.master}}</view>
				</view> -->
				<view class="group" v-if="cate === 5">
					<view>{{item.peopleLimit}}人成团</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		props:{
			cate: {
				type: Number,
				default () {
					return null
				}
			},
			goods: {
				type: Array,
				default () {
					return []
				}
			},
			isBegin: {
				type: Boolean,
				default () {
					return true
				}
			},
			isOneCol: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		computed: {
			...mapGetters(['vipCate']),
			price() {
				let list = []
				for (let item of this.goods) {
					let price = []
					item.shopStore_ProductItems.forEach(productItem=>{
						if(productItem.productItemStr === null) {
							console.log("sss")
							price.push({
								price: productItem.price,
								integral: productItem.integral,
								returnIntegral: productItem.reIntegral,
								returnShopIntegral: productItem.reShopIntegral,
								shopIntegral: productItem.shopIntegral
							})
						} else {
							console.log(JSON.parse(productItem.productItemStr))
							console.log(JSON.parse(productItem.productItemStr).filter(i=>i.vipCate === this.vipCate)[0])
							price.push(JSON.parse(productItem.productItemStr).filter(i=>i.vipCate === this.vipCate)[0].price)
						}
					})
					console.log(price)
					list.push(price)
				}
				console.log(list)
				return list
			}
		},
		methods: {
			itemClick(item, index) {
				if (!this.isBegin) {
					uni.showToast({
						title: "活动未开始！",
						icon: 'none'
					})
					return
				}
				console.log(item)
				console.log(this.price[index])
				for(let i in item.shopStore_ProductItems) {
					item.shopStore_ProductItems[i].price = this.price[index][i].price
					item.shopStore_ProductItems[i].integral = this.price[index][i].integral
					item.shopStore_ProductItems[i].reIntegral = this.price[index][i].returnIntegral
					item.shopStore_ProductItems[i].reShopIntegral = this.price[index][i].returnShopIntegral
					item.shopStore_ProductItems[i].shopIntegral = this.price[index][i].shopIntegral
				}
				this.$store.commit('setCurrentProduct', item)
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + item.productId,
					// events: {
					//     // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					//     acceptDataFromOpenedPage: function(data) {
					//       console.log(data)
					//     },
					// },
					// success(res) {
					// 	let para 
					// 	if(!item.activityCate)
					// 	{
							
					// 		 para = {
					// 			cateId: 1,
					// 			cateName: "种类1",
					// 			createTime: "2020-10-18T13:02:00.363",
					// 			homePic: "Product/2/Home/ssqqbwmo.nwk.jpeg",
					// 			info: "产品内容介绍",
					// 			infoPic: "Product/2/Info/53bfokrc.jz2.jpeg,Product/2/Info/a4ovycjm.b4v.jpeg,Product/2/Info/euriwjmb.zl4.png",
					// 			name: "产品名称",
					// 			price: 29,
					// 			productId: 2,
					// 			shopId: 5,
					// 			shopStore_ProductItems : [{
					// 				cateId: 1,
					// 				cateName: "种类1",
					// 				count: 23,
					// 				id: 3,
					// 				integral: 10,
					// 				itemPic: "ProductItem/1/alsxso5k.z25.png",
					// 				price: 29,
					// 				productId: 2,
					// 				productItemId: 1,
					// 				productItemName: "产品属性名称",
					// 				reIntegral: 10,
					// 				reShopIntegral: 50,
					// 				shopIntegral: 0
					// 			}]
					// 	}
					// 	}else{
					// 		para = item;
					// 	}
							
					// 	res.eventChannel.emit('acceptDataFromOpenerPage', { data: para })
					// }
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.goods {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.goodsItem {
			position: relative;
			margin:  10rpx 0;
			padding: 10rpx;
			background-color: #fff;
			border-radius: 0.2em;

			.message {
				font-size: 36rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.old_price {
				display: inline-block;
				margin: 8rpx 0;
				font-size: 36rpx;
				font-weight: 800;
				color: #ccc;
				text-decoration: line-through;
			}
			.price {
				display: inline-block;
				margin: 8rpx 0;
				font-size: 36rpx;
				font-weight: 800;
				color: red;
			}
			.master {
				font-size: 22rpx;
				color: #ccc;
				.portrait {
					float: left;
					height: 55rpx;
					width: 55rpx;
					margin: 6rpx 20rpx 0 10rpx;
					
				}
			}
			.group {
				font-size: 26rpx;
				color: $uni-text-color-disable;
			}
		}
		.goodsItem1 {
			
			width: 100%;
			margin:  10rpx 0;
			padding: 10rpx;
			background-color: #fff;
			border-radius: 0.2em;
			
			image {
				height: 440rpx;
				width: 480rpx;
			}
		}
		.goodsItem2 {
			position: relative;
			width: 330rpx;
			margin:  10rpx 0;
			padding: 10rpx;
			background-color: #fff;
			border-radius: 0.2em;
			image {
				height: 330rpx;
				width: 330rpx;
			}
		}	
	}
</style>
