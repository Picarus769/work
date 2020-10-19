<template>
	<view>
		<button @click="open">打开弹窗</button>
		<uni-popup ref="popup" type="share">
			
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import menuList from '@/components/menu/menu.vue'
	export default {
		data() {
			return {
				menuList,
				uniPopup,
        uniPopupMessage,
        uniPopupDialog
			}
		},
		methods: {
			open(){
				 this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss">
	.pop {
		background-color: #fff;
		width: 100%;
		height: 500rpx;
	}
</style>
