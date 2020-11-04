<template>
	<view class="coupon-item">
		<view class="coupon-money">
			<view class="nick" v-if="item.shopId === 1">全店铺可用</view>
			<view class="nick" v-else>限制在{{item.shopName}}店内使用</view>
			<view class="layof" :style="{color:theme}">￥{{item.price+" "}} <small>({{item.integral}}积分)</small></view>
			<view class="end_time" v-if="item.state > 0">{{item.limitTime|timeFormat()}}前使用</view>

			<view v-if="!types">
				<!-- <view class="tit">券号：{{item.ticket}}</view> -->
				<view class="demand">满{{item.limitMoney}}使用</view>
			</view>
		</view>
		<view @click="btnClick(item.id, item.limitMoney, item.price)" class="get-btn" v-if="types" :style="{color:color, borderColor:color, background:solid}">{{btn}}</view>
		<view @click="btnClick(item.id, item.limitMoney,item.price)" class="get-btn" v-if="!types" :style="{color:color, borderColor:color, background:solid}">{{btn}}</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		filters: {
			timeFormat(v) {
				if (v) {
					let date = new Date(v)
					let fmt = 'YYYY-mm-dd HH:MM:SS'
					let ret;
					const opt = {
						"Y+": date.getFullYear().toString(), // 年
						"m+": (date.getMonth() + 1).toString(), // 月
						"d+": date.getDate().toString(), // 日
						"H+": date.getHours().toString(), // 时
						"M+": date.getMinutes().toString(), // 分
						"S+": date.getSeconds().toString() // 秒
						// 有其他格式化字符需求可以继续添加，必须转化成字符串
					};
					for (let k in opt) {
						ret = new RegExp("(" + k + ")").exec(fmt);
						if (ret) {
							fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
						};
					};
					return fmt
				}
				return ''

			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		props: {
			btn: {
				type: String,
				default: '使用'
			},
			item: {
				type: Object
			},
			types: {
				type: String,
				default: ''
			},
			theme: {
				type: String,
				default: '#ff9000'
			},
			solid: {
				type: String,
				default: '#ffffff'
			},
			color: {
				type: String,
				default: '#ff9000'
			},
		},
		methods: {
			btnClick(id, money, price) {
				console.log(money)
				if (this.btn === '已拥有' || this.btn === '已使用') return
				if (this.btn === '使用') {
					let payload = {
						id: id,
						money: money,
						price: price
					}
					this.$emit('useVoucher', payload)
					return
				}
				this.getVoucher(id)
			},
			async getVoucher(id) {
				uni.showLoading({
					title: '加载中。。。'
				})
				const res = await this.$myRequest({
					url: 'api/Voucher_user',
					method: 'POST',
					data: {
						userId: this.userInfo.id,
						voucherId: id
					}
				})
				console.log(res)

				uni.hideLoading()
				this.$emit('refresh')
			}
		}
	}
</script>

<style lang='scss'>
	.coupon-item {
		box-sizing: border-box;
		width: 100%;
		height: auto;
		display: table;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin-top: 22rpx;
		border: 1px solid #eeeeee;
		position: relative;

		.coupon-money {
			width: 465rpx;
			height: auto;
			display: table;
			float: left;
			padding: 26rpx 0;
			border-style: none dotted none none;
			border-color: #eeeeee;

			.nick {
				width: 100%;
				height: 50rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #999999;
			}

			.tit {
				width: 100%;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				color: #999999;
			}

			.demand {
				width: 100%;
				height: 30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #999999;
			}

			.layof {
				width: 100%;
				height: 48rpx;
				line-height: 30rpx;
				font-size: 44rpx;
				color: #ff9000;
				font-weight: bold;
			}

			.end_time {
				width: 100%;
				height: 30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}

		.get-btn {
			width: 146rpx;
			height: 52rpx;
			line-height: 50rpx;
			position: absolute;
			top: 50%;
			right: 26rpx;
			margin-top: -26rpx;
			text-align: center;
			border-radius: 60rpx;
			color: #ff9000;
			border: 1px solid #ff9000;
			font-size: 24rpx;
			float: right;
		}
	}

	.coupon-item:after {
		width: 40rpx;
		height: 20rpx;
		position: absolute;
		left: 460rpx;
		top: -1px;
		border-radius: 0 0 40rpx 40rpx;
		content: "";
		display: block;
		background: #fff;
		border: 1px solid #eeeeee;
		border-top: 0px;
	}

	.coupon-item:before {
		width: 40rpx;
		height: 20rpx;
		position: absolute;
		left: 460rpx;
		bottom: -1px;
		border-radius: 40rpx 40rpx 0 0;
		content: "";
		display: block;
		background: #fff;
		border: 1px solid #eeeeee;
		border-bottom: 0px;
	}
</style>
