import React from "react";
import { Field, ErrorMessage } from "formik";

export const Textfield = ({
  label,
  required,
  name,
  value,
  onChange,
  number,
}) => {
  return (
    <div className={"flex flex-col "}>
      <label htmlFor={name} className={`font-semibold `}>
        <span>{label}</span>
        {required ? <span className="text-errorColor">*</span> : ""}
      </label>

      <Field
        name={name}
        type={number ? "number" : "text"}
        value={value}
        onChange={onChange}
        className={`border-2  p-2 border-primary focus:outline-none `}
      />
      <ErrorMessage
        component={"div"}
        name={name}
        className="text-errorColor text-sm"
      />
    </div>
  );
};
