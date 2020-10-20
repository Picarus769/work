<template>
	<view class="address">
		<view class="address_item" v-for="item in address" :key="item.id">
			<view>
				<text class="name">{{item.userName}}</text><text>{{item.phone}}</text>
			</view>
			<view>
				{{item.provinceName + '  ' + item.cityName + '  ' + item.countieName}}
			</view>
			<view>
				{{item.info}}
			</view>
			<view class="btn_area">
				<view class="left" :class="{isOften: item.isOften}" @click="setOften(item.id, item.isOften)">
					<image
					:src="item.isOften ? '../../static/images/check_active.svg' : '../../static/images/check.svg'"
					mode=""
					></image>
					设为默认
				</view>
				<view class="center"></view>
				<view class="right">
					<text @click="deleteAddress(item.id, item.isOften)">删除</text>
					<text @click="changeAddress(item.id)">修改</text>
				</view>
			</view>
		</view>
		<button type="default" @click="btnClick">
			添加收货地址
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					id: 1
				},
				address: []
			}
		},
		onLoad() {
			// this.getAddress()
		},
		onShow() {
			this.getAddress()
		},
		methods: {
			async deleteAddress(id, isOften) {
				if (this.address.length === 1) {
					uni.showToast({
						title: '不能删除最后一条数据',
						icon: 'none'
					})
					return
				}
				const res = await this.$myRequest({
					url: 'api/Address/' + id,
					method : 'DELETE'
				})
				.then(() => {
					if (isOften) {
						let tempId = null
						for (let item of this.address) {
							if (item.id != id) {
								tempId = item.id
								break
							}
						}
						this.setOften(tempId, !isOften)
					}
					this.getAddress()
				})
			},
			changeAddress(id) {
				uni.navigateTo({
					url: '/pages/profile/setAddress?id='+ id
				})
			},
			async getAddress() {
				const res = await this.$myRequest({
					url: 'api/Address?UserId=' + this.userInfo.id
				})
				this.address = res.data.data
				console.log(this.address)
			},
			async setOften(id, isOften) {
				if (isOften) {
					uni.showToast({
						title: '已设为默认'
					})
					return
				}
				const res = await this.$myRequest({
					url: 'api/Address/ChangeOften',
					method : 'POST',
					data: {
						"id": id,
						"isOften": true
					}
				})
				.then(() => {
					for (let value of this.address) {
						if (value.isOften === true && value.id != id) {
						  return this.$myRequest({
								url: 'api/Address/ChangeOften',
								method : 'POST',
								data: {
									"id": value.id,
									"isOften": false
								}
							})
							value.isOften = false
						}
					}
				})
				.then(() => {
					this.getAddress()
				})
			},
			btnClick() {
				uni.navigateTo({
					url: '/pages/profile/setAddress'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: $uni-grey-bg-color;
}
.address {
	
	.address_item {
		margin-bottom: 20rpx;
		background-color: #fff;
		padding: 20rpx 20rpx 0 20rpx;
		font-size: 28rpx;
		.name {
			margin-right: 100rpx;
		}
		.btn_area {
			border-top: 1px solid #eee;
			margin-top: 10rpx;
			height: 80rpx;
			display: flex;
			line-height: 80rpx;
			.isOften {
				color: #FE3F13;
			}
			.left {
				flex: 1;
				
				image {
					vertical-align: middle;
					width: 35rpx;
					height: 35rpx;
				}
			}
			.center {
				flex: 1;
			}
			.right {
				flex: 1;
				display: flex;
				text {
					text-align: center;
					color: #ccc;
					flex: 1;
				}
			}
		}
	}
	button {
		margin-top: 80rpx;
		color: #fff;
		font-size: 34rpx;
		background-color: #FE3F13;
	}
}
</style>
