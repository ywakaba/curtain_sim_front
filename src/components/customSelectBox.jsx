import React from "react";

export const CustomSelectBox = (props) => {
  const { options, defaultValue } = props;
  // const { options } = props;
  const prices = [
    { value: "all_prices", label: "すべての価格" },
    { value: "ge_600000", label: "60,000～" },
    { value: "lt_600000", label: "～59,999" },
    { value: "le_400000", label: "～40,000" },
    { value: "le_200000", label: "～20,000" },
    { value: "le_100000", label: "～10,000" }
  ];
  return (
    <select>
    {options.map((opt, index) => {
        return (
          <option value={opt.value}>{opt.label}</option>
        );
      })}
    </select>
   );
};
