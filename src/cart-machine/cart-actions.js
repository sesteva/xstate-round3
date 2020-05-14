import { assign, send } from "xstate";
import { SAVE_FOR_LATER_EVENT } from "./action-types";
const keyMirror = require("keymirror");

// How to unit test these ations
// cartActions.increment.assignment({count:100}, {"type":"ADD"})

const addProduct = assign((ctx, evt) => {
  const matches = ctx.cart.products.filter(i => i.id === evt.payload.id);
  if (matches.length > 0) {
    return {
      cart: {
        ...ctx.cart,
        products: ctx.cart.products.map(p => {
          if (p.id === evt.payload.id) {
            return {
              ...p,
              qty: p.qty + 1
            };
          }
          return p;
        })
      }
    };
  } else {
    return {
      cart: {
        ...ctx.cart,
        products: [...ctx.cart.products, evt.payload]
      }
    };
  }
});

const computeCartTotal = assign((ctx, evt) => {
  const sumAllProductsQty = (acc, val) => acc + val.qty;
  const totalQty = ctx.cart.products.reduce(sumAllProductsQty, 0);
  const sumAllProductsPrice = (acc, val) => acc + val.price * val.qty;
  const subTotal = ctx.cart.products.reduce(sumAllProductsPrice, 0);
  const sumAllProductsTaxAndFess = (acc, val) => acc + val.taxes * val.qty;
  const totalTaxesAndFees = ctx.cart.products.reduce(
    sumAllProductsTaxAndFess,
    0
  );
  return {
    cart: {
      ...ctx.cart,
      count: totalQty,
      subtotal: subTotal,
      delivery: 0,
      estimatedTaxesAndFees: totalTaxesAndFees,
      estimatedTotal: subTotal + totalTaxesAndFees
    }
  };
});

const removeProduct = assign((ctx, evt) => ({
  cart: {
    ...ctx.cart,
    products: ctx.cart.products.filter(p => {
      if (p.id === evt.payload.id) {
        return false;
      }
      return true;
    })
  }
}));

const updateProduct = assign((ctx, evt) => ({
  cart: {
    ...ctx.cart,
    products: ctx.cart.products.map(p => {
      if (p.id === evt.payload.id) {
        return {
          ...p,
          ...evt.payload
        };
      }
      return p;
    })
  }
}));

const saveForLater = send((ctx, event) => ({
  type: SAVE_FOR_LATER_EVENT.ADD_TO_LIST,
  payload: event.payload
}));

const clearCart = assign((ctx, evt) => {
  return {
    cart: {
      count: 0,
      products: [],
      subtotal: 0,
      delivery: 0,
      estimatedTaxesAndFees: 0,
      estimatedTotal: 0,
      error: undefined
    }
  };
});

export const cartActions = {
  addProduct,
  computeCartTotal,
  removeProduct,
  updateProduct,
  saveForLater,
  clearCart
};

export const CART_ACTIONS = keyMirror(cartActions);
