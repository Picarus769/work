export default {
	
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload.product.iid)
			if (oldProduct) {
				context.commit('addCounter', {oldProduct, count:payload.count})
				resolve('商品数量+'+payload.count)
			} else {
				
				context.commit('addItem', payload.product)
				resolve('添加商品')
			}
		})
	}
}