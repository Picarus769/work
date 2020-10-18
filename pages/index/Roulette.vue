<template>
	<view>
		<view class="Roulette_header-bar">
			<image src="../../static/images/Roulette_total.svg">
			<text>余额积分:</text>
			<text>{{total}}</text>
		</view>
		<view class="Roulette_container">
            <view class="Roulette_container_disc" :class="[{'animate':animateFlag}]">
				<image src="../../static/images/Roulette_disc.png" mode="" class="Roulette_container_image1"></image>
				<text class="price_one">{{prizeData.prizeData["0"].name}}</text>
				<text class="price_two">{{prizeData.prizeData["1"].name}}</text>
				<text class="price_three">{{prizeData.prizeData["2"].name}}</text>
				<text class="price_four">{{prizeData.prizeData["3"].name}}</text>
				<text class="price_five">{{prizeData.prizeData["4"].name}}</text>
            	<!-- <image src="../../static/images/Roulette_disc.png" mode="" class="Roulette_container_image1"></image> -->
            </view>
			<image src="../../static/images/Roulette_pointer.png" mode="" class="Roulette_container_image2"></image>
		</view>
		<view class="Roulette_footer">
			<image src="../../static/images/Roulette_menu.svg">
			<view class="Roulette_footer_start" v-on:click="clickBtn">
                {{flag ? "开始抽奖" : "未开始"}}
			</view>
			<image src="../../static/images/Roulette_timer.svg">
		</view>
	</view>
</template>

<script>
	import prizeData from "../../config/prizeData.config.js"
	export default {
		data() {
			return {
				total: 200,
				flag:false,
				prizeData:prizeData,
				animateFlag:false
			}
		},
		// props:["total","flag"],
		methods: {
            clickBtn(){
				if(this.animateFlag){
					return;
				}
                this.animateFlag = true;
				this.timer = setInterval(() => {
					uni.showToast({
						title:"很遗憾 未中奖"
					})
					this.animateFlag = false;
					clearInterval(this.timer);
				},3000)
			}
		}
	}
</script>

<style lang="scss">
	.animate{
		animation:turn 2s ease;      
		animation-fill-mode:both;
		// margin: 100px auto;
	}
	.Roulette_header-bar {
		width: 260rpx;
		margin: 80rpx auto 0;
		display: flex;
		justify-content: space-around;
		color: $uni-color-primary;

		image {
			width: 45rpx;
			height: 45rpx;
		}
	}
	.Roulette_container{
		width: 500rpx;
		height: 500rpx;
		margin: 100rpx auto 0;
		position: relative;
		.Roulette_container_disc{
			width: 100%;
			height: 100%;
			position: relative;
			.price_one{
				position: absolute;
				left: 120rpx;
				top: 120rpx;
			}
			.price_two{
				position: absolute;
				left: 280rpx;
				top: 120rpx;
			}
			.price_three{
				position: absolute;
				left: 320rpx;
				top: 260rpx;
			}
			.price_four{
				position: absolute;
				left: 200rpx;
				top: 360rpx;
			}
			.price_five{
				position: absolute;
				left: 80rpx;
				top: 260rpx;
			}
			.Roulette_container_image1{
				width: 100%;
				height: 100%;
			}
		}
		.Roulette_container_image2{
			width: 20%;
		    height: 25%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.Roulette_footer{
		width: 90%;
		margin: 150rpx auto 0;
		display: flex;
		justify-content: space-around;
		.Roulette_footer_start{
			width: 450rpx;
			height: 50rpx;
			text-align: center;
			line-height: 30rpx;
			background-color: $uni-color-primary;
			border-radius: 25rpx;
			padding: 10rpx 0;
			box-sizing: border-box;
			font-weight: bold;
			color: $uni-color-warning;
		}
		image{
			width: 50rpx;
			height: 50rpx;
		}
	}
	 @keyframes turn{
	      0%{-webkit-transform:rotate(0deg);}
	      100%{-webkit-transform:rotate(700deg);}
	    }
</style>
