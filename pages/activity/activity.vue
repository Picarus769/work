<template>
	<view>
		<!-- <view v-if="cate === 2" class="activity_icon">
			<image src="../../static/images/seckill.svg" mode=""></image>
		</view>
		<view v-if="cate === 3" class="activity_icon">
			<image src="../../static/images/seckill.svg" mode=""></image>
		</view> -->
		<view class="block"></view>
		<goodsList :isBegin="isBeginf" :goods="goods" :cate="cate"></goodsList>
		<countdown-timer class="timer" ref="countdown" :time="time" @finish="onFinish" autoStart>
			<template v-slot="{day, hour, minute, second, remain, time}">
				<!-- 基本样式 -->
				<view class="case">
					<view class="title">{{activity.name}}</view>
					<text class="title" v-if="!isBeginf">活动开始倒计时：</text>
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
				currentTime: null,
				time: null,
				isBeginf: false,
				toVip: null
			}
		},
		components: {
			goodsList
		},
		computed: {
			...mapGetters(['activities']),
			activity() {
				let act = this.activities
				.filter(item => new Date(item.endTime).getTime() - new Date().getTime())
				.filter(item => item.activity_ProductItemDtos.length>0)
				if(this.toVip) {
					return act
					.filter(item => item.activityCate == this.cate)
					.filter(item => item.toVip == this.toVip)[0]
				} else {
					return act
					.filter(item => item.activityCate === this.cate)[0]
				}

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
			
			
		},
		methods: {
			onFinish() {
				if(isBeginf) {
					uni.showModal({
						title: '活动已结束',
						showCancel: false,
						success() {
							uni.navigateBack({
								
							})
						}
					})
					return
				}
				this.currentTime = new Date().getTime()
				console.log(this.currentTime)
				this.isBeginf = this.isBegin()
				this.time = this.calcTime()
				
			},
			calcTime() {
				if (this.isBeginf) {
					return new Date(this.activity.endTime).getTime() - this.currentTime
				} else {
					
					return this.currentTime - new Date (this.activity.beginTime).getTime()
				}
				
			},
			isBegin() {
				return new Date (this.activity.beginTime).getTime() < this.currentTime? true : false
			},
		},
		onLoad() {
			let that = this
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptData', function(data) {
			  console.log(data)
				that.cate = data.cate
				that.toVip = data.toVip
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
			this.currentTime = new Date().getTime()
			console.log(this.currentTime)
			this.isBeginf = this.isBegin()
			this.time = this.calcTime()
			console.log(this.time)
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
