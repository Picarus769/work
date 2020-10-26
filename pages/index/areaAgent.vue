<template>
	<view class="agent">
		<view class="button_area">
			<view class="buttons" :class="{selectet: selectId === item.id}" v-for="item in buttons" :key="item.id" @click="buttonsClick(item.id)">
				{{item.title}}
			</view>
		</view>
		<view class="map">
			<image src="../../static/images/agentMap.png" mode=""></image>
		</view>
		<view class="my_picker">
			<picker :class="{select_able: selectId >= 0}" mode="selector" :value="selectProvinceValue" :range="provincesName" @change="provinceChange">
				<view> <text>{{provincesRange[selectProvinceValue].name}}</text></view>
			</picker>
			<picker :class="{select_able: selectId >= 1}" mode="selector" :value="selectCityValue" :range="prefecturesName" @change="cityChange">
				<view> <text>{{prefecturesRange[selectCityValue].name}}</text></view>
			</picker>
			<picker :class="{select_able: selectId >= 2}" mode="selector" :value="selectCountiesValue" :range="countiesName" @change="countiesChange">
				<view><text>{{countiesRange[selectCountiesValue].name}}</text></view>
			</picker>
		</view>
		
		<view class="text_area"><text class="red_star">*</text>所有店铺在注册时要完善店铺地址，更改地址不得跨区，区域代理分别有区域代（县代理）.市级代理.省级代理 每个地区唯一制，不得有第二家。
		</view>
		<view class="btn" @click="submit">申请代理</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectId: 0,
				buttons: [
					{
						id: 0,
						title: '省级代理'
					},
					{
						id: 1,
						title: '市级代理'
					},
					{
						id: 2,
						title: '区级代理'
					}
				],
				selectProvinceValue: 0,
				provincesRange: [{name: '选择省',id: -1}],
				selectCityValue: 0,
				prefecturesRange: [{name:'选择市',id: -1}],
				selectCountiesValue: 0,
				countiesRange: [{name:'选择区',id: -1}],
				addressData: [],
			}
		},
		
		computed: {
			
			provincesName() {
				let arr = []
				for (let item of this.provincesRange) {
					arr.push(item.name)
				}
				return arr
			},
			prefecturesName() {
				let arr = []
				for (let item of this.prefecturesRange) {
					arr.push(item.name)
				}
				return arr
			},
			countiesName() {
				let arr = []
				for (let item of this.countiesRange) {
					arr.push(item.name)
				}
				return arr
			}
		},
		onLoad() {

			this.getProvinceRange()
		},
		methods: {
			submit() {
				uni.showToast({
					title: '申请提交'
				})
			},
			buttonsClick(id) {
				this.selectId = id
			},
			//更改
			provinceChange(e) {
				this.selectProvinceValue = e.detail.value
				this.getCityRange()
			},
			cityChange(e) {
				this.selectCityValue = e.detail.value
				this.getCountiesRange()
			},
			countiesChange(e) {
				this.selectCountiesValue = e.detail.value
			},
			//请求省
			async getProvinceRange() {
				const res = await this.$myRequest({
					url: 'api/Counties?Name&Id=0'
				})
				this.addressData = res.data.data
				console.log(this.addressData)
				for (let counties of res.data.data) {
					if (this.provincesRange.some((item) => {
							return item.name === counties.city.provinceDto.name
						})) return
					this.provincesRange.push(counties.city.provinceDto)
					console.log(this.provincesRange)
				}
			},
			getCityRange() {
				this.prefecturesRange = []
				for (let counties of this.addressData) {
					if(this.provincesRange[this.selectProvinceValue].name === counties.city.provinceDto.name) {
						this.prefecturesRange.push(counties.city)
					}
				}
				this.getCountiesRange()
			},
			getCountiesRange() {
				this.countiesRange = []
				for (let counties of this.addressData) {
					if(this.prefecturesRange[this.selectCityValue].name === counties.city.name) {
						this.countiesRange.push(counties)
					}
				}
			},
			async getAddress() {
				const res = await this.$myRequest({
					url: 'api/Address?UserId=' + this.userInfo.id
				})
				this.address = res.data.data
				console.log(this.address)
				this.$store.commit('setLocation', this.address)
				return res
			},
			
		}
	}
</script>

<style lang="scss">
.agent {
	.button_area {
		display: flex;
		padding: 50rpx 30rpx;
		.buttons {
			margin: 10rpx;
			flex:1;
			text-align: center;
			border: 1px solid #ccc;
			padding: 15rpx 20rpx;
			border-radius: 1em;
		}
		.selectet {
			background-color: $uni-color-primary;
			border: none;
			color: #fff;
		}
	}
	.map {
		image {
			width: 640rpx;
			
			margin: 0 65rpx;
		}
	}
	.my_picker {
		background-color: #eee;
		display: flex;
		padding: 20rpx 80rpx;
		.select_able {
			display: inline-block;
		}
		picker {
			display: none;
			text-align: center;
			flex: 1;
			
			// text {
			// 	border-bottom: 1px solid $uni-color-primary;
			// }
			
		}
	}
	.picker {
		background-color: $uni-grey-bg-color;
		padding: 20rpx;
		margin: 0 30rpx 30rpx;
		border: 1px solid #ccc;
		
		border-radius: 0.5em;
		text-align: center;
	}
	.text_area {
		margin: 30rpx 50rpx;
		font-size: 26rpx;
		color: $font-color-disabled;
		
	}
	.red_star {
		color: red;
	}
	.btn {
		margin: 50rpx 150rpx;
		padding: 15rpx 50rpx;
		text-align: center;
		border-radius: 1em;
		background-color: $uni-color-primary;
		color: #fff;
	}
	
}
</style>
