import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default {
  realAddToCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldproduct) {
        context.commit(ADD_COUNT, oldproduct)
        resolve('当前商品数量加一')
      } else {
        payload.count = 1;
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
