<template>
	<view>
		<view class="qrcode">
			<text>微信扫码</text>
			 <qrcode-vue :value="shareUrl" :size="size" level="H"></qrcode-vue>
		</view>
		
	</view>
</template>

<script>
	import QrcodeVue from 'qrcode.vue'
	export default {
		components:{
			QrcodeVue
		},
		data() {
			return {
				size: 250
			}
		},
		computed: {
			shareUrl() {
				return 'https://admin.counselor.hzrxkjgs.cn/api/home/login?inviterId='+ this.$store.getters.userInfo.id +'&cate=1'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.qrcode {
/* 	background-color: #4CD964;
	padding: 100rpx 50rpx;
	font-size: 40rpx;
	color: #fff; */
	position: absolute;
	text-align: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
