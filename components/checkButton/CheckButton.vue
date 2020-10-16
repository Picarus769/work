<template>
	<view class="check-button" :class="{checked: isChecked}">
		<image src="../../static/images/tick.svg" alt="">
	</view>
</template>

<script>
	export default {
		name: "CheckButton",
		props: {
			isChecked: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>
	image {
		width: 20px;
		height: 20px;
	}
	.check-button {
		border-radius: 50%;
		border: 2px #ccc solid;
		
	}
	.checked {
		border-color: pink;
		background-color: pink;
		
	}
</style>
