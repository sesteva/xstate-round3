import React from "react";
import { List, Button } from "antd";
import { Branch } from "../branch";

const SavedTitle = ({ items }) => (
  <h3 className="ui-cart-container-title">
    {items.length} {items.length > 1 ? "items" : "item"} saved for later
  </h3>
);
const SavedEmpty = () => <div>You have no saved items</div>;

const SavedSummaryCollapsed = ({ items, state }) => {
  return (
    <section className="ui-cart-container">
      <SavedTitle items={items} />
      <div className="ui-cart">
        <div data-active={state === "empty"} className="ui-cart-section">
          <SavedEmpty />
        </div>
        <div
          data-state={state}
          data-active={state === "saved"}
          data-collapsed="true"
          className="ui-cart-section"
        >
          Expand to see the details
        </div>
      </div>
    </section>
  );
};

const SavedForLaterDetails = ({ state, items, remove, moveToCart }) => {
  return (
    <section className="ui-cart-container">
      <SavedTitle items={items} />
      <div className="ui-cart">
        <div data-active={state === "empty"} className="ui-cart-section">
          <SavedEmpty />
        </div>
        <div
          data-active={state === "saved"}
          data-collapsed="false"
          data-state={state}
          className="ui-cart-section"
        >
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={item => (
              <List.Item>
                <div>
                  <span className="ui-cart-item-title">{item.name}</span>
                  <Button
                    style={{ marginRight: "0.25rem" }}
                    onClick={() => remove({ id: item.id })}
                  >
                    X
                  </Button>
                  <Button onClick={() => moveToCart(item)}>add to cart</Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export const SavedForLater = props => (
  <Branch
    condition={props.collapsed}
    Left={SavedSummaryCollapsed}
    Right={SavedForLaterDetails}
    {...props}
  />
);
