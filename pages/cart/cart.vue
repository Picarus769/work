<template>
  <view>
    <cart-list></cart-list>
		<cart-bottom-bar></cart-bottom-bar>
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
			...mapGetters(['cartList'])
		}
  }
</script>

<style>
</style>
