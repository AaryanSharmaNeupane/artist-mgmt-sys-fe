import { ErrorMessage, Field } from "formik";
import React from "react";

export const DateField = ({ label, required, name, value, onChange, min }) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor={name} className={`font-semibold  `}>
        <span>{label}</span>
        {required ? <span className="text-errorColor">*</span> : ""}
      </label>

      <Field
        name={name}
        type="Date"
        value={value}
        onChange={onChange}
        className={`border-2   p-2 border-primary `}
        min={min}
      />
      <ErrorMessage
        component={"div"}
        name={name}
        className="text-errorColor text-sm"
      />
    </div>
  );
};
