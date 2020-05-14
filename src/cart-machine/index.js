import { Machine } from "xstate";
import { CART_EVENT, SAVE_FOR_LATER_EVENT } from "./action-types";
import { cartActions, CART_ACTIONS } from "./cart-actions";
import {
  saveForLaterActions,
  SAVE_FOR_LATER_ACTIONS
} from "./save-for-later-actions";
import { guards } from "./guards";
import { cartServices } from "./cart-services";

const defaultContext = {
  cart: {
    count: 0,
    products: [],
    subtotal: 0,
    delivery: 0,
    estimatedTaxesAndFees: 0,
    estimatedTotal: 0,
    error: undefined
  },
  savedForLater: {
    products: []
  }
};

// Machine Diagram : https://xstate.js.org/viz/?gist=5af85534a4f46ae0614125b837d54b40
const cartMachine = Machine(
  {
    id: "cartMachine",
    initial: "empty",
    context: defaultContext,
    type: "parallel",
    states: {
      cart: {
        id: "cart",
        initial: "empty",
        states: {
          empty: {
            on: {
              [CART_EVENT.ADD]: {
                target: "unpaid",
                actions: [
                  CART_ACTIONS.addProduct,
                  CART_ACTIONS.computeCartTotal
                ],
                cond: guards.isProduct
              }
            }
          },
          unpaid: {
            initial: "normal",
            on: {
              "": {
                target: "empty",
                cond: guards.isCartEmpty
              },
              [CART_EVENT.SAVE_FOR_LATER]: {
                actions: [
                  CART_ACTIONS.saveForLater,
                  CART_ACTIONS.removeProduct,
                  CART_ACTIONS.computeCartTotal
                ]
              },
              [CART_EVENT.REMOVE]: {
                target: ".normal",
                actions: [
                  CART_ACTIONS.removeProduct,
                  CART_ACTIONS.computeCartTotal
                ],
                cond: guards.isProduct
              },
              [CART_EVENT.ADD]: {
                target: ".normal",
                actions: [
                  CART_ACTIONS.addProduct,
                  CART_ACTIONS.computeCartTotal
                ],
                cond: guards.isProduct
              },
              [CART_EVENT.UPDATE_QTY]: {
                target: ".normal",
                actions: [
                  CART_ACTIONS.updateProduct,
                  CART_ACTIONS.computeCartTotal
                ],
                cond: guards.isProduct
              },
              UPDATE_PRICE: {
                target: ".normal",
                actions: [CART_ACTIONS.updateProduct], // review prices have changed? on exit after adding to cart always? separate transition
                cond: guards.isProduct
              },
              [CART_EVENT.PAY]: {
                target: "paying",
                cond: guards.isCartFilled
              }
            },
            states: {
              error: {},
              normal: {}
            }
          },
          paying: {
            invoke: {
              src: cartServices.pay,
              onDone: { target: "paid" },
              onError: { target: "unpaid.error" }
            }
          },
          paid: {
            after: {
              1000: {
                target: "empty",
                actions: [CART_ACTIONS.clearCart, CART_ACTIONS.computeCartTotal]
              }
            }
          }
        }
      },
      savedForLater: {
        id: "savedForLater",
        initial: "empty",
        on: {
          [SAVE_FOR_LATER_EVENT.ADD_TO_LIST]: {
            target: ".saved",
            actions: [SAVE_FOR_LATER_ACTIONS.addSaveForLater]
          }
        },
        states: {
          empty: {},
          saved: {
            on: {
              "": {
                target: "empty",
                cond: guards.isSavedEmpty
              },
              [SAVE_FOR_LATER_EVENT.UNSAVE]: {
                actions: [SAVE_FOR_LATER_ACTIONS.unsaveProduct]
              },
              [SAVE_FOR_LATER_EVENT.MOVE_TO_CART]: {
                actions: [
                  SAVE_FOR_LATER_ACTIONS.moveToCart,
                  SAVE_FOR_LATER_ACTIONS.unsaveProduct
                ]
              }
            }
          }
        }
      }
    }
  },
  {
    actions: {
      ...cartActions,
      ...saveForLaterActions
    },
    guards,
    services: {
      ...cartServices
    }
  }
);

export { cartMachine, CART_EVENT, SAVE_FOR_LATER_EVENT };
