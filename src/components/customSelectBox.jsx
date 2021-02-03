import React from "react";

export const CustomSelectBox = (props) => {
  const { options } = props;

  return (
    <select>
      {options.map((opt, index) => {
        return (
          <option value={opt.id}>{opt.name}</option>
        );
      })}
    </select>
   );
};
