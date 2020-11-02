<template>
	<view>
		<!-- <view v-if="cate === 2" class="activity_icon">
			<image src="../../static/images/seckill.svg" mode=""></image>
		</view>
		<view v-if="cate === 3" class="activity_icon">
			<image src="../../static/images/seckill.svg" mode=""></image>
		</view> -->
		<view class="block"></view>
		<goodsList :isBegin="isBegin" :goods="goods" :cate="cate"></goodsList>
		<countdown-timer class="timer" ref="countdown" :time="time" @finish="onFinish" autoStart>
			<template v-slot="{day, hour, minute, second, remain, time}">
				<!-- 基本样式 -->
				<view class="case">
					<view class="title">{{activity.name}}</view>
					<text class="title" v-if="!isBegin">活动开始倒计时：</text>
					<text class="title" v-else>活动倒计时：</text>
					<text>{{day}}天{{hour}}时{{minute}}分{{second}}秒</text>				
				</view>
			</template>
		</countdown-timer>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList/goodsList.vue'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				cate: null,
				currentTime: new Date().getTime()
			}
		},
		components: {
			goodsList
		},
		computed: {
			...mapGetters(['activities']),
			activity() {
				return this.activities
				.filter(item => new Date(item.endTime).getTime() - new Date().getTime())
				.filter(item => item.activity_ProductItemDtos.length>0)
				.filter(item => item.activityCate === this.cate)[0]
			},
			goods() {
				return this.activity
				.activity_ProductItemDtos
				.map(item => {
					if(item.productItemPic === null) {
						item.homePic = null
						return item
					} else {
						item.homePic = item.productItemPic.split(',')[0]
						return item
					}
				})
			},
			isBegin() {
				return new Date (this.activity.beginTime).getTime() < this.currentTime? true : false
			},
			time() {
				if (new Date (this.activity.beginTime).getTime() < this.currentTime) {
					return this.currentTime - new Date (this.activity.beginTime).getTime()
				} else {
					return new Date(this.activity.endTime).getTime() - this.currentTime
				}
				
			}
			
			
		},
		methods: {
			onFinish() {
				uni.showModal({
					title: '活动已结束',
					showCancel: false,
					success() {
						uni.navigateBack({
							
						})
					}
				})
			}
		},
		onLoad() {
			let that = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptData', function(data) {
			  console.log(data)
				that.cate = data.cate
			})
			console.log(this.cate)
			if (this.cate === null) {
				uni.showModal({
					title: '无活动',
					showCancel: false,
					success() {
						uni.navigateBack({
							
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: $uni-grey-bg-color;
	.activity_icon {
		position: fixed;
		right: 20rpx;
		bottom: 200rpx;
		image {
			width: 120rpx;
			height: 120rpx;
		}
	}
	.block {
		height: 120rpx;
	}
	.timer {
		color: #fff;
		position: fixed;
		top: 0rpx;
		width: 100%;
		height: 120rpx;
		text-align: center;
		background: linear-gradient(120deg ,rgb(255,159,0), rgb(255,154,0),rgb(245,22,22));
		view {
			line-height: 60rpx;
			height: 60rpx;
		}
	}
}
</style>
