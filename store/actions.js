export default {
	
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload.product.iid)
			if(payload.product.totalCount<payload.count) {
				uni.showToast({
					title:"数量超出库存",
					icon:'none'
				})
				
				return
			}
			if (oldProduct) {
				if(payload.product.totalCount<payload.count+oldProduct.selectCount) {
					uni.showToast({
						title:"数量超出库存",
						icon:'none'
					})
					return
				}
				context.commit('addCounter', {oldProduct, count:payload.count})
				resolve('商品数量+'+payload.count)
			} else {
				
				context.commit('addItem', payload.product)
				resolve('添加商品')
			}
		})
	}
}