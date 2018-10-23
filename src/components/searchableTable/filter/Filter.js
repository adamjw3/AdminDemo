import React from "react";
import { Select } from "antd";

const Option = Select.Option;

const Filter = ({ ...props }) => (
  <Select
    key={props.key}
    defaultValue={props.defaultValue}
		style={{ minWidth: 150, marginRight: "15px" }}
    onChange={props.onChange}
    value={props.value}
  >
    <Option value="">{props.defaultValue}</Option>
    {props.options.map(function(item, index) {
      return (
        <Option key={index} value={item}>
          {item}
        </Option>
      );
    })}
  </Select>
);

export default Filter;
