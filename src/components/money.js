import React from "react";
import { Statistic } from "antd";

export function Money({ title, children, precision }) {
  return <Statistic value={children / 100} precision={2} title={title} />;
}
