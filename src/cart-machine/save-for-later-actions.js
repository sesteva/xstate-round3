import { assign, send } from "xstate";
import { CART_EVENT } from "./action-types";
const keyMirror = require("keymirror");

const addSaveForLater = assign((ctx, evt) => {
  const matches = ctx.savedForLater.products.filter(
    i => i.id === evt.payload.id
  );
  if (matches.length > 0) return ctx.savedForLater;
  return {
    savedForLater: {
      ...ctx.savedForLater,
      products: [...ctx.savedForLater.products, evt.payload]
    }
  };
});

const unsaveProduct = assign((ctx, evt) => ({
  savedForLater: {
    ...ctx.savedForLater,
    products: ctx.savedForLater.products.filter(p => {
      if (p.id === evt.payload.id) {
        return false;
      }
      return true;
    })
  }
}));

const moveToCart = send((context, event) => ({
  type: CART_EVENT.ADD,
  payload: event.payload
}));

export const saveForLaterActions = {
  addSaveForLater,
  unsaveProduct,
  moveToCart
};

export const SAVE_FOR_LATER_ACTIONS = keyMirror(saveForLaterActions);
