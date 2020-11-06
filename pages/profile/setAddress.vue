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
					<picker mode="selector" :value="selectProvinceValue" :range="provincesName" @change.prevent="provinceChange">
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
				 <!-- @click="labelClick(0)" -->
			</view>
			<view class="yt-list-cell b-b" @click="labelClick(0)">
				<view class="cell-tit clamp"><text class="red_color"></text>姓名</view>
				<view class="cell-tip">
					<input type="text" id="name" @blur="blur(0)" :focus="name_f" value="" v-model="name"/>
				</view>
			</view>
			<view class="yt-list-cell b-b" @click="labelClick(1)">
				<view class="cell-tit clamp"><text class="red_color"></text>电话</view>
				<view class="cell-tip">
					<input type="text" id="phone" @blur="blur(1)" :focus="phone_f" value="" v-model="phone"/>
				</view>
			</view>
			<view class="yt-list-cell b-b" @click="labelClick(2)">
				<view class="cell-tit clamp"><text class="red_color"></text>详细地址</view>
				<view class="cell-tip">
					<input type="text" id="info" @blur="blur(2)" :focus="info_f" value="" v-model="info"/>
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
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				needChange: null,
				name_f: false,
				phone_f: false,
				info_f: false,
				name: '',
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
				changeId: null,
				address: null
			}
		},
		beforeDestroy() {
			if(this.$store.state.oftenAddress===null) {
				uni.navigateTo({
					url: '/pages/profile/setAddress'
				})
			}
		},
		computed: {
			...mapGetters(['userInfo']),
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
			},
			// prefecturesRange() {
			// 	return this.provincesRange[this.selectProvinceValue].sub
			// }
		},
		async onLoad(options) {
			let that = this
			if (options.id) {
				this.changeId = options.id
				const eventChannel = this.getOpenerEventChannel()
				eventChannel.on('acceptData', function(data) {
				  console.log(data)
					that.needChange = data
				})
			}
			await this.getProvinceRange()
		},
		watch: {
			//将要修改的数据赋值
			provincesRange(val) {
				if(this.needChange) {
					for (let i in val) {
						if(val[i].name === this.needChange.provinceName){
							this.selectProvinceValue = i
							this.getCityRange()
							return
						}
					}
					// val.forEach(item => {
					// 	if(item.name === this.needChange.provinceName) {
					// 		this.selectProvinceValue = val.indexOf(item)
					// 		this.getCityRange()
					// 		return
					// 	}
					// })
				}
			},
			prefecturesRange(val) {
				if(this.needChange) {
					for (let i in val) {
						if(val[i].name === this.needChange.cityName){
							this.selectCityValue = i
							this.getCountiesRange()
							return
						}
					}
					// val.forEach(item => {
					// 	if(item.name === this.needChange.cityName) {
					// 		this.selectCityValue = val.indexOf(item)
					// 		this.getCountiesRange()
					// 		return
					// 	}
					// })
				}
			},
			countiesRange(val) {
				if(this.needChange) {
					for (let i in val) {
						if(val[i].name === this.needChange.countieName){
							this.selectCountiesValue = i
							this.name = this.needChange.name
							this.phone = this.needChange.phone
							this.info = this.needChange.info
							return
						}
					}
					// val.forEach(item => {
					// 	if(item.name === this.needChange.countieName) {
					// 		this.selectCountiesValue = val.indexOf(item)
					// 		this.name = this.needChange.name
					// 		this.phone = this.needChange.phone
					// 		this.info = this.needChange.info
					// 		return
					// 	}
					// })
				}
			}
			
		},
		destroyed() {
			
		},
		methods: {
			blur(id) {
				if(id === 0) {
					this.name_f = false
				} else if (id === 1) {
					this.phone_f = false
				} else if (id === 2) {
					this.info_f = false
				}
			},
			labelClick(id) {
				if(id === 0) {
					this.name_f = true
					this.phone_f = false
					this.info_f = false
				} else if (id === 1) {
					this.phone_f = true
					this.name_f = false
					this.info_f = false
				} else if (id === 2) {
					this.name_f = false
					this.phone_f = false
					this.info_f = true
				} else if (id === 3) {
					this.name_f = false
					this.phone_f = false
					this.info_f = false
				}
			},
			async provinceChange(e) {
				this.selectProvinceValue = e.detail.value
				await this.getCityRange()
			},
			async cityChange(e) {
				this.selectCityValue = e.detail.value
				await this.getCountiesRange()
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
					url: 'api/Province?id=0'
				})
				console.log(res)
				this.provincesRange = [...this.provincesRange,...res.data.data]
				console.log(this.provincesRange)
				// .map(item => {
				// 	let temp = {
				// 		name: '
				// 	}
				// 	return temp
				// })
				// this.addressData = res.data.data
				// console.log(this.addressData)
				// for (let counties of res.data.data) {
				// 	// this.countiesRange.push(counties.name)
				// 	// this.prefecturesRange.push(counties.city.name)
				// 	// let flag = this.provincesRange.some((item) => {
				// 	// 		return item.name === counties.city.provinceDto.name
				// 	// 	})
				// 	if (this.provincesRange.some((item) => {
				// 			return item.name === counties.city.provinceDto.name
				// 		})) return
				// 	this.provincesRange.push(counties.city.provinceDto)
				// 	console.log(this.provincesRange)
				// }
			},
			async getCityRange() {
				console.log(this.provincesRange[this.selectProvinceValue].id)
				const res = await this.$myRequest({
					url: 'api/City?ProvinceId=' + this.provincesRange[this.selectProvinceValue].id
				})
				console.log(res.data.data)
				// for (let item of this.provincesRange[this.selectProvinceValue]) {
				// 	if(item.areaName === counties.city.provinceDto.name) {
				// 		this.prefecturesRange.push(counties.city)
				// 	}
				// }
				this.prefecturesRange = res.data.data
				this.getCountiesRange()
			},
			async getCountiesRange() {
				console.log(this.prefecturesRange[this.selectCityValue].id)
				const res = await this.$myRequest({
					url: 'api/Counties?CityId=' + this.prefecturesRange[this.selectCityValue].id
				})
				console.log(res.data.data)
				this.countiesRange = res.data.data
				// for (let counties of this.addressData) {
				// 	if(this.prefecturesRange[this.selectCityValue].name === counties.city.name) {
				// 		this.countiesRange.push(counties)
				// 	}
				// }
			},
			async submit() {
				if(this.provincesRange[this.selectProvinceValue].id === -1 || 
						this.prefecturesRange[this.selectCityValue].id === -1 || 
						this.countiesRange[this.selectCountiesValue].id === -1) {
					uni.showToast({
						title: '请选择正确的地址',
						icon: "none"
					})
					return
				}
				 // else if(!(/^1(3|4|5|6|7|8|9)d{9}$/.test(this.phone))) {
					//  console.log(this.phone)
				 // 	uni.showToast({
				 // 		title: '输入手机号有误',
				 // 		icon: 'none'
				 // 	})
				 // 	return
				 // }
				 else {
					
					console.log(this.provincesRange[this.selectProvinceValue].id)
					let isFirst = this.$store.state.location.length === 0 ? true : false
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
							"isOften": isFirst,
							"name": this.name
						}
					}).then(res => {
						if(res === 0) {
							uni.showToast({
								title: '设置失败'
							})
							return
						}
						this.getAddress().then(res1 =>{
							console.log(res1.data.data)
							let areaId = res1.data.data.find(q=> q.isOften === true).countiesId
							this.getProduct(areaId)
						})
						// this.$myRequest({
						// 	url: 'api/Shop',
						// 	data: {
						// 				AreaId: areaId,
						// 				AreaCate: 3,
						// 			}
						// 	}
						// ).then((res1) => {
						// 	console.log('商店信息', res1.data.data[0])
						// 	this.$store.commit('setShop', res1.data.data[0])
						// 	shopId = res1.data.data[0].id
						// 	const res2 = this.$myRequest({
						// 		url: 'api/ShopStore?shopId=' + shopId
						// 	})
						// 	console.log(res2.data.products)
						// 	store.commit('setProducts', res2.data.products)
						// })
						
					})
				}
				},
				async getAddress() {
					const res = await this.$myRequest({
						url: 'api/Address?UserId=' + this.userInfo.id
					})
					this.address = res.data.data
					console.log(this.address)
					this.$store.commit('setLocation', this.address)
					console.log('跳转')
					uni.switchTab({
						url: '/pages/index/index',
						success() {
							console.log('aa')
						},
						fail(e) {
							console.log(e)
						}
					})
					return res
				},
				checkPhone(){ 
					if(!(/^1[3456789]d{9}$/.test(this.phone))){ 
						return false; 
					} else {
						return true
					}
				},
				async getProduct(areaId) {
					console.log(areaId)
					const res = await this.$myRequest({
						url: 'api/ShopStore',
						data: {
							AreaId: areaId,
							AreaCate: 3,
						}
					})
					console.log(res.data)
					this.$store.commit('setCate', res.data.cateDtos)
					this.$store.commit('setProducts', res.data.products)
					this.$store.commit('setFreight', res.data.cost)
					let temp = {
						rate: res.data.rate,
						shopId: res.data.shopId,
						shopRate:  res.data.shopRate,
						shopName: res.data.shopName,
						shopAvatar: res.data.shopAvatar,
						shopAddress: res.data.shopAddress,
						areaName: res.data.areaName
					}
					this.$store.commit('setShop', temp)
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
		padding:20rpx 20rpx 20rpx 0;
		picker {
			text-align: center;
			margin: auto;
			text {
				// border: 1px solid $uni-color-primary;
				background-color: #eee;
				padding: 10rpx 20rpx;
				border-radius: 1em;
			}
			
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
			width: 500rpx;
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