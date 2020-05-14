import {
  cartMachine,
  CART_EVENT,
  SAVE_FOR_LATER_EVENT
} from "../../cart-machine";
import { useMachine } from "@xstate/react";

// This is out React adapter leveraging useMachine hook, hiding abstracting our consumers from knowing anything about a state machine.
export function useCartMachine() {
  const [state, send] = useMachine(cartMachine);
  console.log(state);

  function addToCart(product) {
    send(CART_EVENT.ADD, { payload: product });
  }
  function saveForLater(product) {
    send(SAVE_FOR_LATER_EVENT.ADD_TO_LIST, { payload: product });
  }
  function removeFromCart({ id }) {
    send(CART_EVENT.REMOVE, { payload: { id } });
  }
  function unsave({ id }) {
    send(SAVE_FOR_LATER_EVENT.UNSAVE, { payload: { id } });
  }
  function updateCartProductQty(product) {
    send(CART_EVENT.UPDATE_QTY, { payload: product });
  }
  function moveToCart(product) {
    send(SAVE_FOR_LATER_EVENT.MOVE_TO_CART, { payload: product });
  }
  function moveToSaveForLater(product) {
    send(CART_EVENT.SAVE_FOR_LATER, { payload: product });
  }

  function pay() {
    send(CART_EVENT.PAY);
  }

  const {
    count: cartCount,
    products: cartItems,
    subtotal,
    delivery,
    estimatedTaxesAndFees,
    estimatedTotal,
    error
  } = state.context.cart;
  const {
    count: savedCount,
    products: savedItems
  } = state.context.savedForLater;

  return {
    state,
    send,
    cartCount,
    cartItems,
    savedCount,
    savedItems,
    balance: {
      subtotal,
      delivery,
      estimatedTaxesAndFees,
      estimatedTotal,
      error
    },
    addToCart,
    saveForLater,
    removeFromCart,
    unsave,
    updateCartProductQty,
    moveToCart,
    moveToSaveForLater,
    pay
  };
}
