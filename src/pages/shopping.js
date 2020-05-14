import React, { useState } from "react";
import {
  Cart,
  Balance,
  SavedForLater,
  useCartMachine
} from "../components/shopping-cart";
import { ShoppingList } from "../components/shopping-list";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;

export const Shopping = () => {
  const {
    state,
    cartCount,
    cartItems,
    balance,
    savedCount,
    savedItems,
    addToCart,
    saveForLater,
    removeFromCart,
    unsave,
    updateCartProductQty,
    moveToCart,
    moveToSaveForLater,
    pay
  } = useCartMachine();

  const [isCollapsed, setCollapse] = useState(true);

  return (
    <Layout style={{ marginLeft: 0 }}>
      <Header
        style={{
          background: "hsl(52, 98%, 69%)",
          padding: "0px"
        }}
      >
        <h1>POC Walmart like Shopping Cart using Xstate</h1>
      </Header>
      <Layout>
        <Content style={{ margin: "2rem 1rem 0", overflow: "initial" }}>
          <ShoppingList
            buy={addToCart}
            save={saveForLater}
            style={{ padding: "2rem", background: "#fff", textAlign: "center" }}
          />
        </Content>
        <Sider
          style={{
            margin: "2rem 1rem 0",
            background: "#fff",
            overflow: "auto"
          }}
          collapsible
          collapsed={isCollapsed}
          onCollapse={setCollapse}
          width="25%"
          collapsedWidth="15%"
        >
          <Cart
            count={cartCount}
            items={cartItems}
            state={state.value.cart}
            remove={removeFromCart}
            updateQty={updateCartProductQty}
            saveForLater={moveToSaveForLater}
            collapsed={isCollapsed}
          />

          <SavedForLater
            count={savedCount}
            items={savedItems}
            state={state.value.savedForLater}
            remove={unsave}
            moveToCart={moveToCart}
            collapsed={isCollapsed}
          />

          <Balance
            data={balance}
            state={state.value.cart}
            pay={pay}
            collapsed={isCollapsed}
          />
        </Sider>
      </Layout>
    </Layout>
  );
};
