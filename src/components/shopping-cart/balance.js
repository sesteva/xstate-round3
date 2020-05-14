import React from "react";
import { Money } from "../money";
import { Button } from "antd";
import { Branch } from "../branch";

const BalanceSummaryCollapsed = ({ state, data, pay }) => {
  return (
    <section className="ui-balance-container">
      <div data-active={state === "paid"}>Your transaction was a Success</div>
      <div data-active={state === "paying"}>Processing your transaction</div>

      <div
        data-active={state.unpaid === "normal" || state.unpaid === "error"}
        className="ui-balance-details"
      >
        <div
          data-active={state.unpaid === "error"}
          className="ui-balance-error"
        >
          Error {data.error}
        </div>
        <div className="ui-balance-total">
          <Money title="Est. total">{data.estimatedTotal}</Money>
        </div>
        <div className="ui-balance-pay">
          <Button
            type="primary"
            block
            onClick={() => pay()}
            disabled={!state.unpaid}
          >
            Pay
          </Button>
        </div>
      </div>
    </section>
  );
};
const BalanceDetails = ({ data, state, pay }) => {
  return (
    <section className="ui-balance-container">
      <div data-active={state === "paid"}>Your transaction was a Success</div>
      <div data-active={state === "paying"}>Processing your transaction</div>

      <div
        data-active={state.unpaid === "normal" || state.unpaid === "error"}
        className="ui-balance-details"
      >
        <div
          data-active={state.unpaid === "error"}
          className="ui-balance-error"
        >
          Error {data.error}
        </div>
        <div className="ui-balance-subtotal">
          <Money title="Subtotal">{data.subtotal}</Money>
        </div>
        <div className="ui-balance-delivery">
          <Money title="Delivery">{data.delivery}</Money>
        </div>
        <div className="ui-balance-taxes">
          <Money title="Est. taxes & fees">{data.estimatedTaxesAndFees}</Money>
        </div>
        <div className="ui-balance-total">
          <Money title="Est. total">{data.estimatedTotal}</Money>
        </div>
        <div className="ui-balance-pay">
          <Button
            type="primary"
            block
            onClick={() => pay()}
            disabled={!state.unpaid}
          >
            Pay
          </Button>
        </div>
      </div>
    </section>
  );
};

export const Balance = props => (
  <Branch
    condition={props.collapsed}
    Left={BalanceSummaryCollapsed}
    Right={BalanceDetails}
    {...props}
  />
);
