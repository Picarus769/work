<template>
	<view class="cart-list">
		<cart-list-item v-for="(item, index) in cartList"
			:key="index"
			:item="item" />
	</view>
	
</template>

<script>
	
	import CartListItem from './CartListItem.vue'

	import { mapGetters } from 'vuex'
	export default {
		name: "CartList",
		components: {
			
			CartListItem
			
		},
		computed: {
			...mapGetters(['cartList'])
		}
	}
</script>

<style lang="scss">
	.cart-list {
		height: calc(100vh - 44px - 49px - 40px);
	}
	.content {
		height: 100%;
		overflow: hidden;
	}
</style>
