<template>
	<view class="home">
		<scroll-view show-scrollbar="false" scroll-y="true" >
			<view>
				<view class="header">
					<view class="search_content">
						<view class="header_left">
							<view class="header_text">{{lebalText}}</view>
						</view>
						<view class="header_right">
							<view class="input">
								<input type="text" v-model="inputValue">
								<image src="../../static/images/search.svg" class="search" type="" @click="searchClick(inputValue)">
							</view>
						</view>
					</view>
					<!-- <view class="home_header_navigation">
						<view v-for="(item, index) in headerNavigation" :key="item.name" class="home_navigation_bar" @click="navClick(index)">
							<view>
								<text :class="{isSelected: item.selected}">{{item.name}}</text>
							</view>
						</view>
					</view> -->
					<view class="big_img" @click="actClick(0)">
						<image :src="bigImg" mode=""></image>
					</view>
				</view>
				<view class="block"></view>
				<view class="body">
					<view class="icon_navigation">
						<view v-for="item in iconNavigation" class="icon_navi_bar" :key="item.name" @click="iconNavClick(item.url)">
							<view>
								<image :src="item.icon" mode=""></image>
								<view>{{item.name}}</view>
							</view>
						</view>
					</view>
					<view class="activity_img" @click="actClick(1)">
						<image :src="activityImg" mode=""></image>
					</view>
					<!-- <view class="activity_area">
						<view class="act_describe">新人推荐</view>
						<view class="act_nav">
							<view class="activity_products">
								<view class="act_product_item">
									<view>
										<image :src="$constData.defaultImg" mode="scaleToFill"></image>
									<view>暂无活动</view>
								</view>
									<view>
										<image :src="$constData.defaultImg" mode="scaleToFill"></image>.
										<view>暂无活动</view>
									</view>
								</view>
								<view class="activity_item" v-for="item in activity_products" :key="item.id">
									<image :src="item.img ? item.img : $constData.defaultImg" mode="scaleToFill"></image>
									<view>{{item.message}}</view>
								</view>
							</view>
						</view>
					</view> -->
				</view>
				<view class="goods-list">
					<goodsList :goods="goodsList"></goodsList>
				</view>
				
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import goodsList from '@/components/goodsList/goodsList.vue'
	import {mapGetters} from 'vuex'
	export default {
		components: {
			goodsList
		},
		data() {
			return {
				lebalText: '',
				headerNavigation: [],
				iconNavigation: [],
				activity_products: [],
				bigImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2087149704,1454267624&fm=15&gp=0.jpg',
				activityImg: '',
				goodsList: [],
				inputValue: ''
			}
		},
		onLoad() {
			console.log("aaa")
			this.getLocation()
			this.lebalText = this.$constData.lebalText
			this.headerNavigation = this.$constData.homeNavigation
			this.iconNavigation = this.$constData.homeIconNavigation
			this.activityImg = '../../static/images/activity_img.png'
			this.activity_products = [
				{
					id: 0,
					message: '暂无活动'
					},
				{
					id: 1,
					message: '暂无活动',
					}
			]
			this.goodsList = this.$store.state.products
			
		},
		onShow() {
			// if (this.goodsList === []) {
			// 	uni.navigateTo({
			// 		url: 'pages/index/index'
			// 	})
			// }
		},
		computed: {
			...mapGetters(['activities']),
		  isFollow () {
		    return this.$store.state.products　　//需要监听的数据
		  }
		},
		watch: {
		  isFollow (newVal, oldVal) {
				this.goodsList = this.$store.state.products
				console.log(this.goodsList)
		  }
		},
		methods: {
			actClick(index) {
				if(index === 0) {
					uni.navigateTo({
						url: '../activity/activity'
					})
				} else if(index ===1 ){
					uni.navigateTo({
						url: '../activity/voucher'
					})
					
					// uni.showToast({
					// 	title: "敬请期待",
					// 	icon: "none"
					// })
				}
				
			},
			searchClick(inputValue) {
				// uni.showToast({
				// 	title: '暂不支持搜索',
				// 	icon: 'none'
				// })
				this.$store.commit('setSearchValue', inputValue)
				uni.navigateTo({
					url: './search',
					success(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', { data: inputValue })
					}
				})
			},
			getLocation() {
				// console.log(this.$store.state.location)
				
			},
			navClick(index) {
				console.log(index)
			},
			iconNavClick(url) {
				if(url==='') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	scroll-view {
		height: 100%;
	}
	.home {
		.header {
			height: 300rpx;
			background-color: $uni-color-primary;
			
			.search_content {
				padding: 40rpx 20rpx 20rpx 20rpx;
				.header_left {
					display: inline-block;
					text-align: center;
					width: 20%;
					.header_text {
						margin: auto;
						color: #fff;
						font-size: 42rpx;
					}
				}
				.header_right {
					display: inline-block;
					width: 75%;
					height: 54rpx;
					.input {
						position: relative;
						background-color: #fff;
						border-radius: 1em;
						height: 54rpx;
						padding: 5rpx;
						image {
							width: 40rpx;
							height: 40rpx;
						}
						input {
							margin-left: 20rpx;
							display: inline-block;
							width: 350rpx;
							font-size: 30rpx;
						}
						.search {
							position: absolute;
							top: 8rpx;
							right: 20rpx;
						}
					}
				}
			}
			.home_header_navigation {
				display: flex;
				height: 50rpx;
				.home_navigation_bar {
					text-align: center;
					color: #fff;
					flex: 1;
					font-size: 30rpx;
					.isSelected {
						border-bottom: 2px #fff solid;
					}
				}
			}
			.big_img {
				margin: 20rpx;
				height: 290rpx;
				image {
					border-radius: 0.5em;
					width: 710rpx;
					height: 250rpx;
				}
			}
		}
		.block {
			height: 120rpx;
		}
		.body {
			
			.icon_navigation {
				display: flex;
				height: 150rpx;
				.icon_navi_bar {
					flex: 1;
					text-align: center;
					font-size: 20rpx;
					image {
						width: 100rpx;
						height: 100rpx;
					}
				}
			}
			.activity_img {
				height: 150rpx;
				margin: 20rpx;
				image{
					height: 150rpx;
					width: 690rpx;
				}
			}
			.activity_area {
				margin: 40rpx 20rpx 30rpx 20rpx;
				height: 250rpx;
				width: 710rpx;
				background-color: $uni-color-primary;
				border-radius: 0.5em;
				.act_describe {
					margin: 15rpx 10rpx;
					color: #fff;
					font-size: 30rpx;
				}
				.activity_products {
					display: flex;
					justify-content: space-around;
					margin: auto;
					width: 680rpx;
					height: 180rpx;
					text-align: center;
					.act_product_item {
						display: flex;
						width: 310rpx;
						height: 180rpx;
						background-color: #fff;
						border-radius: 0.3em;
						image {
							text-align: center;
							margin: 15rpx 0 0 0;
							width: 120rpx;
							height: 120rpx;
							border-radius: 0.3em;
						}
						view {
							font-size: 24rpx;
						}
					}
					.activity_item {
						border-radius: 0.3em;
						width: 150rpx;
						height: 180rpx;
						background-color: #fff;
						image {
							text-align: center;
							margin: 15rpx 0 0 0;
							width: 120rpx;
							height: 120rpx;
							border-radius: 0.3em;
						}
						view {
							font-size: 24rpx;
						}
					}
				}
			}
		}
		.goods-list {
			background-color: #eee;
		}
	}
</style>
