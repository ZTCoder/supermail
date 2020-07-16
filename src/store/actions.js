import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default {
  realAddToCart(context, payload) {
    let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
    // for(let item of context.state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldproduct = item
    //   }
    // }
    if (oldproduct) {
      //oldproduct.count += 1
      context.commit(ADD_COUNT, oldproduct)
    } else {
      payload.count = 1;
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
