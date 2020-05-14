import React from "react";
import { InputNumber, List, Button, Icon } from "antd";
import { Branch } from "../branch";

const CartTitle = ({ count }) => (
  <h3 className="ui-cart-container-title">
    {count} {count > 1 ? "items" : "item"} in your cart
  </h3>
);
const CartEmpty = () => <div>Go ahead and add something!</div>;

const CartSummaryCollapsed = ({ count, state }) => {
  return (
    <section className="ui-cart-container">
      <CartTitle count={count} />
      <div className="ui-cart">
        <div data-active={state === "empty"} className="ui-cart-section">
          <CartEmpty />
        </div>
        <div
          data-active={state !== "empty"}
          data-state={state.unpaid}
          data-collapsed="true"
          className="ui-cart-section"
        >
          Expand to see the details
        </div>
      </div>
    </section>
  );
};

const CartDetails = ({
  items,
  state,
  count,
  remove,
  updateQty,
  saveForLater
}) => {
  return (
    <section className="ui-cart-container">
      <CartTitle count={count} />
      <div className="ui-cart">
        <div data-active={state === "empty"} className="ui-cart-section">
          <CartEmpty />
        </div>
        <div
          data-active={state !== "empty"}
          data-state={state.unpaid}
          data-collapsed="false"
          className="ui-cart-section"
        >
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={item => (
              <List.Item>
                <div>
                  <span className="ui-cart-item-title">{item.name}</span>
                  <InputNumber
                    style={{ width: "3rem", marginRight: "1rem" }}
                    value={item.qty}
                    onChange={value => updateQty({ ...item, qty: value })}
                  />
                  <Button
                    style={{ marginRight: "0.25rem" }}
                    onClick={() => saveForLater(item)}
                  >
                    <Icon type="save" />
                  </Button>
                  <Button onClick={() => remove({ id: item.id })}>X</Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export const Cart = props => (
  <Branch
    condition={props.collapsed}
    Left={CartSummaryCollapsed}
    Right={CartDetails}
    {...props}
  />
);
