import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export const PasswordField = ({ label, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <label htmlFor={name} className="font-semibold">
        <span>{label}</span>
        <span className="text-errorColor">*</span>
      </label>
      <div className="relative mt-1">
        <Field
          name={name}
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border-2 border-primary"
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <IoEye /> : <IoEyeOff />}
        </div>
      </div>
      <ErrorMessage
        component="div"
        name={name}
        className="text-errorColor text-sm"
      />
    </div>
  );
};
