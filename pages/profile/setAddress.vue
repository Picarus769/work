<template>
	<view>
		<view class="yt-list">
			<!-- <view class="yt-list-cell b-b">
				<view class="cell-tit clamp"><text class="red_color">*</text>省市区</view>
				<text class="cell-tip" @click="toggleMaskLocation()">
					<text class="choose-text">{{addressByPcrs}}</text>
					<text class="iconfont icon-xiangxia"></text>
				</text>
			</view> -->
			<view class="container">
				<!-- <view class="picker">
					<gb-picker
					 :provincesRange='provincesRange'
					 :prefecturesRange='prefecturesRange'
					 :countiesRange='countiesRange'
					 @update="update"
					 @change="change">
					    <text>{{text}}</text>
					 </gb-picker>
				</view> -->
				<view class="my_picker">
					<picker mode="selector" :value="selectProvinceValue" :range="provincesName" @change="provinceChange">
						<view> <text>{{provincesRange[selectProvinceValue].name}}</text></view>
					</picker>
					<picker mode="selector" :value="selectCityValue" :range="prefecturesName" @change="cityChange">
						<view> <text>{{prefecturesRange[selectCityValue].name}}</text></view>
					</picker>
					<picker mode="selector" :value="selectCountiesValue" :range="countiesName" @change="countiesChange">
						<view><text>{{countiesRange[selectCountiesValue].name}}</text></view>
					</picker>
				</view>
				
			  <!-- <view class="notice">
			  	<text style="color: red;">*</text>
			  	根据地区查找附近商家，省区市为必选项。
			  </view> -->
				<!-- <view class="btn">
					<button type="default" size="mini">确认</button>
				</view> -->
				
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-tit clamp"><text class="red_color"></text>电话</view>
				<view class="cell-tip">
					<input type="text" value="" v-model="phone"/>
				</view>
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-tit clamp"><text class="red_color"></text>详细地址</view>
				<view class="cell-tip">
					<input type="text" value="" v-model="info"/>
				</view>
			</view>
		</view>
		
		<!-- <text class="notice">
			<text style="color: red;">*</text>
			根据地区查找附近商家，省区市为必选项。
		</text> -->
		<button type="default" @click="submit">提交</button>
		<!-- <gk-city
			:headtitle="headtitle"
			:provincedata="provincedata"
			:data="selfData"
			mode="cityPicker"
            ref="cityPicker"
            @funcvalue="getpickerParentValue"
            :pickerSize="3"></gk-city> -->
	</view>
</template>

<script>
	import provinceData from '@/common/city.data.js';
	export default {
		data() {
			return {
				selectProvinceValue: 0,
				provincesRange: [{name: '选择省',id: -1}],
				selectCityValue: 0,
				prefecturesRange: [{name:'选择市',id: -1}],
				selectCountiesValue: 0,
				countiesRange: [{name:'选择区',id: -1}],
				addressData: [],
				text: '',
				// provincedata:[
				// 	{
				// 	text:'北京市',
				// 	value:'1'
				// 	}
				// ],
				// selfData:provinceData,
				// headtitle:"请选择所在地",
				// addressByPcrs:"请选择所在地",
				provinceId: -1,
				cityId: -1,
				countiesId: -1,
				info: '',
				phone: null,
				changeId: null
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
		onLoad(options) {
			if (options.id) {
				this.changeId = options.id
			}
			this.getProvinceRange()
		},
		methods: {
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
			// update (e) {
			//     this.text = e.name.join('/')
			// },
			// change(e) {
			//     console.log(e.code)
			//     this.text = e.name.join('/')
			// },
			async getProvinceRange() {
				const res = await this.$myRequest({
					url: 'api/Counties?Name&Id=0'
				})
				this.addressData = res.data.data
				console.log(this.addressData)
				for (let counties of res.data.data) {
					// this.countiesRange.push(counties.name)
					// this.prefecturesRange.push(counties.city.name)
					// let flag = this.provincesRange.some((item) => {
					// 		return item.name === counties.city.provinceDto.name
					// 	})
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
			// async getCityRange() {
			// 	const res = await this.$myRequest({
			// 		url: 'api/Province?Name&Id=0'
			// 	})
			// 	this.addressData = res.data.data
			// 	for (let counties of res.data.data) {
			// 		// this.countiesRange.push(counties.name)
			// 		// this.prefecturesRange.push(counties.city.name)
			// 		// this.provincesRange.push(counties.city.provinceDto.name)
			// 	}
			// },
			// toggleMaskLocation(){
			// 	this.$refs["cityPicker"].show();
			// },
			// getpickerParentValue(data){
			// 	this.provincedata=data;
			// 	this.addressByPcrs=data[0].text+" "+data[1].text+" "+data[2].text;
			// 	this.provinceId = data[0].value
			// 	this.cityId = data[1].value
			// 	this.countiesId = data[2].value
			// },
			async submit() {
				
				// console.log(this.phone)
				// console.log(this.provincesRange[this.selectProvinceValue].id)
				// console.log(this.prefecturesRange[this.selectCityValue].id)
				// console.log(this.countiesRange[this.selectCountiesValue].id)
				let isOften = this.$store.state.location.length === 0 ? true : false
				const res = await this.$myRequest({
					url: 'api/Address',
					method: 'POST',
					data: {
						"id": this.changeId ? parseInt(this.changeId) : 0,
						"provinceId": this.provincesRange[this.selectProvinceValue].id,
						"cityId": this.prefecturesRange[this.selectCityValue].id,
						"countiesId": this.countiesRange[this.selectCountiesValue].id,
						"info": this.info,
						"userId": this.$store.state.userInfo.id,
						"phone": this.phone,
						"isOften": isOften
					}
				}).then(res => {
					console.log(res)
					uni.navigateBack({
						
					})
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	button {
		margin: 30rpx;
	}
	// .notice {
	// 	margin: 30rpx;
	// 	font-size: 24rpx;
	// 	color: $font-color-disabled;
	// }
	.my_picker {
		display: flex;
		padding:20rpx 200rpx 20rpx 0;
		picker {
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
	.notice {
		margin: 30rpx;
		font-size: 24rpx;
		color: $font-color-disabled;
	}
	.btn {
		text-align: center;
	}
.yt-list {
		background: #fff;
	}
	.yt-list-cell-warnning{
		display: flex;
		padding: 10rpx 30rpx 10rpx 40rpx;
		color: red;
	}
	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 6px 12px 6px 17px;
		line-height: 70rpx;
		position: relative;
		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30rpx;
			right: 30rpx;
			
		}
		.gray{
			flex: 1;
			font-size: 28rpx;
			margin-right: 10rpx;
			height: 25px;
			line-height: 20px;
			color: gray;
		}
		.cell-icon {
			height: 32rpx;
			width: 32rpx;
			font-size: 28rpx;
			color: #fff;
			text-align: center;
			line-height: 32rpx;
			background: #f85e52;
			border-radius: 4rpx;
			margin-right: 12rpx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 28rpx;
			color: #000;
			margin-left: 8rpx;
			margin-right: -10rpx;
		}

		.cell-tit {
			flex: 1;
			font-size: 14px;
			color: #000;
			margin-right: 10rpx;
		}
		.money{
			
			color: red;
			font-weight: bold;
			margin-left: 10px;
		}
		.picker-class{
			display: inline-block;
		}
		.cell-tip {
			font-size: 26px;
			color: #000;
			flex-direction: column;
			&.disabled {
				color: #000;
			}

			&.active {
				color: $uni-color-primary;
			}
			&.red{
				color: #000;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90rpx;
			}
		}

		.desc {
			flex: 1;
			font-size: 14px;
			color: #000;
		}
	}
	.b-b:after, .b-t:after {
	    position: absolute;
	    z-index: 3;
		bottom: 0;
	    left: 0;
	    right: 0;
	    height: 0;
	    content: '';
	    -webkit-transform: scaleY(0.5);
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    border-bottom: 1px solid #E4E7ED;
	}
	.red_color{
		color: red;
		display: inline-flex;
		padding-right: 6px;
	}
</style>