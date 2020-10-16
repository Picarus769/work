<template>
  <view>
    <cart-list></cart-list>
		<cart-bottom-bar></cart-bottom-bar>
  </view>
</template>

<script>
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/cartBottomBar.vue'
  export default{
    name:'Cart',
		components: {
			CartList,
			CartBottomBar
		},
		onLoad() {
			
		}
  }
</script>

<style>
</style>
