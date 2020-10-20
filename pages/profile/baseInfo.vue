<template>
	<view class="page">
		
		<view class="cell_list" @click="onUnloadImg">
			<view class="cell_left txt">头像</view>
			<view class="cell_right">
				<image :src="avatar" mode=""></image>
			</view>
		</view>
		<z-prompt :value="nickname" text="请输入昵称" @confirm="onNameChange" :options="popupOptions">
			<view class="cell_list">
				<view class="cell_left txt">昵称</view>
				<view class="cell_right arrow">{{ nickname }}</view>
			</view>
		</z-prompt>
		<view class="cell_list" @click="addressClick">
			<view class="cell_left txt">收获地址</view>
			<view class="cell_right arrow">{{ address }}</view>
		</view>
		<!-- <z-prompt :value="phone" text="请输入手机号" @confirm="onPhoneChange" :options="popupOptions">
			<view class="cell_list">
				<view class="cell_left txt">手机号</view>
				<view class="cell_right arrow">{{ phone }}</view>
			</view>
		</z-prompt> -->
		<!-- 按钮 -->
		<!-- <view class=""></view> -->
		<view class="form_but"><button class="active" @click="onSubmit">保存</button></view>
	</view>
</template>

<script>
	import zPrompt from '@/components/prompt';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			zPrompt
		},
		data() {
			return {
				popupOptions: {
					placeholder: ''
				},
				avatar: '',
				nickname: '',
				phone: "",
				address: ''
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		//第一次加载
		onLoad() {
			this.avatar = this.userInfo.avatar || "../../static/images/avatar.svg";
			this.nickname = this.userInfo.name || "默认";
			// this.phone = this.userInfo.phone || "";
		},
		//页面显示
		onShow() {},
		//方法
		methods: {
			// ...mapMutations(['setUserInfo']),
			//修改昵称
			onNameChange(e) {
				this.nickname = e.value;
				e.close();
			},
			//修改手机号
			onPhoneChange(e) {
				if (!this.$base.phoneRegular.test(e.value)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return;
				}
				this.phone = e.value;
				e.close();
			},
			//修改头像
			onUnloadImg() {
				uni.chooseImage({
					success: (res) => {
						this.avatar = res.tempFilePaths[0];
					}
				})
			},
			//提交
			async login() {
				const res = await this.$myRequest({
					url: 'api/User?Id=2&OpenId'
				})
				console.log(res.data.data[0])
				this.$store.commit('setUserInfo', res.data.data[0]);
			},
			async submitInfo() {
				const res = await this.$myRequest({
					url: 'api/User',
					method: 'POST',
					data: {
						"id": this.$store.state.userInfo.id,
						"name": this.nickname,
						"avatar": this.avatar
					}
				})
				console.log(res)
			},
			async onSubmit() {
				if (this.avatar == '') {
					uni.showToast({
						title: '请上传头像',
						icon: 'none'
					});
					return;
				}
				if (this.nickname == '') {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					});
					return;
				}
				// const response = this.uploadImgToBase64(this.avatar)
				// console.log(response)
				console.log(this.nickname, this.avatar)
			},	
				// this.submitInfo()
				// this.login()
				// let httpData = {
				// 	nickname: this.nickname,
				// 	avatar: this.avatar
				// };
				
				// if(this.phone){
				// 	if (!this.$base.phoneRegular.test(this.phone)) {
				// 		uni.showToast({
				// 			title: '请输入正确的手机号',
				// 			icon: 'none'
				// 		});
				// 		return;
				// 	}
				// 	if(this.phone != this.userInfo.phone){
				// 		httpData.phone = this.phone;
				// 	}
				// }
				// this.$http
				// 	.post('api/common/v1/edit_user_info', httpData)
				// 	.then(res => {
				// 		this.setUserInfo({
				// 			nickname: this.nickname,
				// 			avatar: this.avatar,
				// 			// phone: this.phone || this.userInfo.phone
				// 		});
				// 		uni.showToast({
				// 			title: '修改成功！'
				// 		});
				// 	});
			
			// uploadImgToBase64 (file) {
			//   const reader = new FileReader()
			// 	console.log(file)
			//   reader.onload = function () { // 图片转base64完成后返回reader对象
			// 		console.log(reader)
			//   }
			//   reader.readAsDataURL(file)
			// },
			 
			addressClick() {
				uni.navigateTo({
					url: '/pages/profile/address'
				})
			}
		},
		//页面隐藏
		onHide() {},
		//页面卸载
		onUnload() {},
		//页面下来刷新
		onPullDownRefresh() {},
		//页面上拉触底
		onReachBottom() {},
		//用户点击分享
		onShareAppMessage(e) {
			return this.wxShare();
		}
	};
</script>
<style lang="scss" scoped>
	@import '@/style/mixin.scss';
	.cell_list {
		background-color: #fff;
		padding: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #f5f5f5;
		&:active {
			background-color: #f5f5f5;
		}
		&.interval {
			margin-bottom: 20upx;
			border-bottom: 0;
		}
		.cell_left {
			font-size: 28upx;
			color: #333333;
			display: flex;
			align-items: center;
			image {
				width: 30upx;
				height: 30upx;
				margin-right: 20upx;
			}
		}
		.cell_right {
			font-size: 28upx;
			color: #333333;
			display: flex;
			align-items: center;
			&.arrow::after {
				content: '';
				// @include bis('./static/icon/me_lise_more.png', 100% 100%);
				width: 12upx;
				height: 22upx;
				margin-left: 20upx;
			}
			image {
				width: 140rpx;
				height: 140rpx;
				margin-left: 20upx;
				border-radius: 50%;
			}
		}
	}
</style>
