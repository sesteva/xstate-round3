import React from "react";

export const Branch = ({ condition, Left, Right, ...rest }) =>
  condition ? <Left {...rest} /> : <Right {...rest} />;
