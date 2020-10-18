<template>
    <view class="container">
			<view class="picker">
				<gb-picker
				 :provincesRange='provincesRange'
				 :prefecturesRange='prefecturesRange'
				 :countiesRange='countiesRange'
				 @update="update"
				 @change="change">
				    <text>{{text}}</text>
				 </gb-picker>
			</view>
      <view class="notice">
      	<text style="color: red;">*</text>
      	根据地区查找附近商家，省区市为必选项。
      </view>
			<view class="btn">
				<button type="default" size="mini">确认</button>
			</view>
			
    </view>
</template>

<script>
	export default {
	    data() {
	        return {
	            provincesRange: ['河南省'],
	            prefecturesRange: ['郑州市','开封市'],
							countiesRange: ['禹王台区','金水区'],
	            text: '',
	        }
	    },
	    methods: {
	        update (e) {
	            this.text = e.name.join('/')
	        },
	        change(e) {
	            console.log(e.code)
	            this.text = e.name.join('/')
	        }
	    }
	}
</script>

<style lang="scss" scoped>
	.picker {
		background-color: $uni-grey-bg-color;
		padding: 30rpx;
		margin: 100rpx 30rpx;
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
</style>
