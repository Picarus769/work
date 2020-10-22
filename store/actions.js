export default {
	
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
			if (oldProduct) {
				context.commit('addCounter', oldProduct)
				resolve('商品数量+1')
			} else {
				
				context.commit('addItem', payload)
				resolve('添加商品')
			}
		})
	}
}