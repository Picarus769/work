<template>
	<view>
		<view class="button_area">
			<!-- <view v-if="config === {}" class="no_content">
				无菜单列表
			</view> -->
			<!-- <view v-else> -->
				<view>

					<!-- <view class="button big" @click="itemClick">
						<view class="title">账户 </view>
						<!-- <image :src="item.icon" type="" class="button_icon"> -->
						<!-- <view class="button_price">￥0.00</view>
						<image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon">
					</view> -->

					<!-- <view class="button big" @click="itemClick">
						<view class="title">店铺保证金</view>
						<view class="button_price">￥0.00</view>
						<image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon">
					</view> -->

					<view class="button" v-for="item in cards" :key="item.id">
						<view class="button_name">{{item.num}}</view>
						<view class="arrow_icon" @click="deleteItem(item.id)">删除</view>
					</view>
					
					<view class="button" @click="itemClick">
						<view class="button_name">银行卡管理</view>
						
						<!-- <image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon"> -->
					</view>
					<view class="button" @click="itemClick">
						<label class="button_name">输入银行卡号</label>
						<input class="input" type="number" value="" v-model="inputValue"/>
						<!-- <image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon"> -->
					</view>
					<!-- <view class="button" @click="itemClick">
						<input type="number" value="" v-model="inputValue"/>
						<!-- <image :src="$constData.arrowIcon1" type="" class="button_icon arrow_icon"> 
					</view> -->
					<button type="default" @click="addCard">添加银行卡</button>
					<view class="alert"><text class="red">*</text><text>添加银行卡以使用积分提现</text></view>
				</view>
			</view>
		<!-- </view> -->
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {

		data() {
			return {
				inputValue: null,
				bankName: '',
				cards: []
			};
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			itemClick(url) {
				if (url === '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url
					})
				}
			},
			
			async getBankCard() {
				const res = await this.$myRequest({
					url: 'api/BankCard?UserId=' + this.userInfo.id
				})
				console.log(res.data.data)
				this.cards = res.data.data
			},
			async addCard() {
				if(this.inputValue === null) {
					uni.showToast({
						title: '输入内容为空',
						icon: 'none'
					})
					return
				}
				const res = await this.$myRequest({
					url: 'api/BankCard',
					method: 'POST',
					data: {
						id: 0,
						userId: this.userInfo.id,
						num: this.inputValue,
						// bankName: this.bankName
					}
				})
				this.inputValue = null
				console.log(res)
				if(res.data>0) {
					this.getBankCard()
				}
			},
			async deleteItem(id) {
				const res = await this.$myRequest({
					url: 'api/BankCard/'+id,
					method: 'DELETE',
					
				})
				console.log(res)
				this.getBankCard()
			}
		
		},
		onLoad() {
			this.getBankCard()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-grey-bg-color;
	}

	.no_content {
		text-align: center;
	}

	.big {
		padding: 20rpx;
	}
	.alert {
		margin: 20rpx;
		color: $font-color-disabled;
		font-size: 26rpx;
		.red {
			color: red;
		}
	}
	.button {
		padding-left: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		.input {
			padding-bottom: 20rpx;
		}
		.title {
			color: #888888;
			font-size: 30rpx;
		}

		.button_icon {
			margin: 25rpx;
			vertical-align: middle;
			width: 50rpx;
			height: 50rpx;
		}

		.arrow_icon {
			color: $uni-text-color-disable;
			float: right;
			margin-right: 20rpx;
			height: 100rpx;
			line-height: 100rpx;
		}	

		.button_name {
			display: inline-block;
			height: 100rpx;
			font-size: 30rpx;
			color: #888888;
			line-height: 100rpx;
		}

		.button_price {
			display: inline-block;
			height: 100rpx;
			font-size: 44rpx;
			line-height: 100rpx;
		}
	}
</style>
