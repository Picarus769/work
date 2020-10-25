<template>
	<view>
		<view class="conscribe_container">
			<image src="../../static/images/conscribe.png" class="conscribe_container_img"></image>
			<image :src="two_code" class="two_code"></image>
	    </view>
		<button type="default" v-on:click="clickBtn">保存图片</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				two_code:"../../static/images/defaultImg.png"
			}
		},
		methods: {
	      clickBtn(){
			  uni.downloadFile({
			  		url: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2560672746,3633361578&fm=26&gp=0.jpg',
			  		success: (res) =>{
						console.log(res);
			  			if (res.statusCode === 200){
			  				uni.saveImageToPhotosAlbum({
			  					filePath: res.tempFilePath,
			  					success: function() {
			  						uni.showToast({
			  							title: "保存成功",
			  							icon: "none"
			  						});
			  					},
			  					fail: function() {
			  						uni.showToast({
			  							title: "保存失败，请稍后重试",
			  							icon: "none"
			  						});
			  					}
			  				});
			  			}
			  		}
			  	})
		  }
		}
	}
</script>

<style lang="scss">
	.conscribe_container{
		width: 90%;
		margin: 120rpx auto 0;
		height: 600rpx;
		background-color:#4CD964;
		position: relative;
		.conscribe_container_img{
			width: 100%;
			height: 100%;
		}
		.two_code{
			position: absolute;
			width: 242rpx;
			height: 242rpx;
			left: 315rpx;
			top: 130rpx;
		}
	}
	button{
		width: 200px;
		margin: 100rpx auto;
		border-radius: 25px;
		color: #fff;
		border: 1px solid $uni-color-primary;
		background-color: $uni-color-primary;
	}
</style>
