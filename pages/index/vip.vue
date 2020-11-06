<template>
	<view>
		<view class="vip">
			<view class="header area">
				<text class="level">当前会员身份:</text>
				<view class="level">{{vipCate}}</view>
			</view>
			<view class="upgrade area">
				<view class="title">套餐升级</view>
				<view class="upgrade_area">
					<view class="upgrade_item" v-for="item in $constData.vipOptions" @click="actClick(7, item.toVip)" :key="item.id">
						<view class="text">
							<view class="title">{{item.title}}</view>
							<view class="info">{{item.info}}</view>
						</view>
						<view class="image" :class="{isFirst: item.id === 0}"><image :src="item.icon" mode=""></image></view>
					</view>
				</view>
			</view>
			<view class="info_area area">
				<view class="title">会员权益</view>
				<view class="main">
					<view>VIP会员</view>
					<view>
						<view v-for="item in $constData.vipInfo" :key="item.id">
							<view>
								<text>{{item.title}}:</text><text>{{item.info}}</text>
							</view>
						</view>
					</view>
					<view>伊客会员</view>
					<view>
						<view v-for="item in $constData.sVipInfo" :key="item.id">
							<view>
								<text>{{item.title}}:</text><text>{{item.info}}</text>
							</view>
							
						</view>
					</view>
				</view>
			</view>
			<view class="welfare area">
				<view class="title">
					福利区
				</view>
				
				<!-- <view v-for="item in welfareItem" :key="item.id" class="welfare_item">
					<image :src="item.image||$constData.defaultImg" mode=""></image>
					<view class="right">
						<view class="item_title"></view>
						<view class="item_info"></view>
						<view class="btn">去看看</view>
					</view>
				</view> -->
			</view>
			
		</view>
		<goodsList :goods="vipEnjoy"></goodsList>
	</view>
	
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['activities','userInfo']),
			vipEnjoy() {
				let vipAct = this.activities.filter(item => item.activityCate === 6)
				if(vipAct.length === 0) return []
				
				let temp = vipAct.filter(item => item.activity_ProductItemDtos.length>0)
				
				if(temp.length===0) return []
				return temp[0].activity_ProductItemDtos
			},
			vipCate() {
				if(this.userInfo.vipCate === 1) return '普通会员'
				else if(this.userInfo.vipCate === 2) return '伊客会员'
				else return '非会员'
			}
		},
		methods: {
			actClick(id, vip) {
				console.log(this.vipEnjoy)
				if(id === 7) {
					uni.navigateTo({
						url: '../activity/activity',
						success: function(res) {
						  res.eventChannel.emit('acceptData', { cate: 7, toVip: vip})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		
		background-color: $uni-grey-bg-color;
	}
.vip {
	padding: 20rpx;
	.area {
		margin-bottom: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 0.5em;
		.title {
			font-weight: 600;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
		}
	}
	.header {
		height: 250rpx;
		color: #fff;
		background: url(../../static/images/vip_cart.png);
		background-size: 100% 100%;
		padding: 40rpx;
		.level {
			
		}
	}
	.upgrade {
		
		.upgrade_area{
			display: flex;
			.text {
				width: 192rpx;
				overflow: hidden;
				margin: 15rpx 0;
				display: inline-block;
				.title {
					height: 50rpx;
					line-height: 50rpx;
					font-size: 32rpx;
				}
				.info {
					height: 40rpx;
					line-height: 40rpx;
					color: $font-color-disabled;
					font-size: 24rpx;
				}
			}
			.upgrade_item{
				padding: 10rpx;
				height: 120rpx;
				flex: 1;
				view{
					
				}
				.isFirst {
					border-right: 2px solid #eee;
				}
				.image {
					display: inline-block;
					vertical-align: top;
					
					image {
						margin: 15rpx;
						width: 90rpx;
						height: 90rpx;
					}

				}
			}
		}
	}
	.info_area {
		.title {
			font-weight: 600;
		}
		.main {
			font-size: 26rpx;
			view {
				margin: 10rpx 0;
			}
		}
	}
	.welfare {
		
	}
}
</style>
