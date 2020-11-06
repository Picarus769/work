<template>
  <view>
		<view v-if="isEmpty" class="is_empty">空空如也</view>
		<view v-else>
			<cart-list></cart-list>
			<cart-bottom-bar>
			</cart-bottom-bar>
			<view class="block"></view>
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
			console.log(this.cartList,this.products)
			this.checkItems()
		},
		computed:{
			...mapGetters(['cartList', 'products']),
			isEmpty() {
				return this.cartList.length === 0?true:false
			}
		},
		methods: {
			checkItems() {
				this.products.forEach(item => {
					item.shopStore_ProductItems.forEach(productItem => {
						let cartItem = this.cartList.find(function(cart){
							return cart.iid === productItem.id
						})
						if(cartItem) {
							if(productItem.price !== cartItem.price) {
								let p = {
									price : productItem.price,
									id: cartItem.iid
								}
								this.$store.commit('setCartPrice', p)
							}
						} else {
							console.log('a')
							this.$store.commit('deleteItem', productItem.iid)
						}
					})
				})
			}
		},
		onTabItemTap() {
			this.$check()
		},
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
	.block {
		height: 200rpx;
	}
</style>
