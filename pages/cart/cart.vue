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
				const cartId = this.cartList.map(item => {return { id : item.iid,price : item.price}})
				let storeArr = new Array();
				this.products.map(q=> q.shopStore_ProductItems.map(a=>{return { id : a.id,price : a.price}})).forEach(q=>{
					storeArr = storeArr.concat(q);
				})
				
				storeArr.forEach(q=>{
					const index = cartId.findIndex(a=> a.id === q.id);
					
					if(index >= 0)
					{
						if(cartId[index].price !== q.price){
							this.$store.commit('setCartPrice', q);
						}
						
						cartId.splice(index,1);
					}
				})
				console.log(cartId)
				cartId.forEach(item => this.$store.commit('deleteItem', item.id))
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
