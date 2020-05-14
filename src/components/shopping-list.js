import React from "react";
import { products } from "../products-data";
import { List, Card, Button } from "antd";
import { Money } from "./money";

export const ShoppingList = ({ buy, save }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3
      }}
      dataSource={products}
      renderItem={item => (
        <List.Item>
          <Card title={item.name}>
            <Money>{item.price}</Money>
            <div>
              <Button onClick={() => save({ ...item })}>Save</Button>
              <Button
                type="primary"
                onClick={() => buy({ ...item, qty: 1 })}
                style={{ margin: "0.5rem" }}
              >
                Buy
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
