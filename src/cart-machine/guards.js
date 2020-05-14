export const guards = {
  isCartEmpty: (ctx, evt) => ctx.cart.products.length < 1,
  isSavedEmpty: (ctx, evt) => ctx.savedForLater.products.length < 1,
  isCartFilled: (ctx, evt) => ctx.cart.products.length > 0,
  isProduct: (ctx, evt) => {
    const p = evt.payload;
    return p && p.id && p.id.length > 0; // add more validations
  }
};
