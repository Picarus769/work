<template>
  <view>
		<view v-if="isEmpty" class="is_empty">空空如也</view>
		<view v-else>
			<cart-list></cart-list>
			<cart-bottom-bar>
			</cart-bottom-bar>
		</view>
  </view>
</template>

<script>
	import CartList from './childComps/CartList.vue'
	import { mapGetters } from 'vuex'
	import CartBottomBar from './childComps/cartBottomBar.vue'
  export default{
    name:'Cart',
		components: {
			CartList,
			CartBottomBar
		},
		onLoad() {
			console.log(this.cartList)
		},
		computed:{
			...mapGetters(['cartList']),
			isEmpty() {
				return this.cartList.length === 0?true:false
			}
		}
  }
</script>

<style scoped lang="scss">
	.is_empty {
		color: $font-color-disabled;
		position: absolute;
		text-align: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
