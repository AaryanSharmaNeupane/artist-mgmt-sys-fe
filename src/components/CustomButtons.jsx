import React from "react";

export const CustomButtons = ({ name }) => {
  return (
    <button
      type="submit"
      className={"bg-primary text-txtprimary px-4 py-2 h-[44px]"}
    >
      <div className="flex items-center">{name}</div>
    </button>
  );
};
