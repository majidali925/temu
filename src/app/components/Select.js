import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const Selectx = ({
  name,
  label,
  required = false,
  register,
  errors,
  options = [],
  validation = {},
  className = "",
  control,
  ...props
}) => {
  console.log({ errors });
  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "12px",
      padding: "5px",
      height: "100%",
      backgroundColor: "dee9ff",
      borderColor: "#e5e5e5",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#600ee4",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      zIndex: 5,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused ? "#dee9ff" : isSelected ? "#600ee4" : "white",
      color: isFocused || isSelected ? "black" : "gray",
      "&:active": {
        backgroundColor: "#600ee4",
        color: "white",
      },
    }),
  };

  return (
    <div className="my-3">
      <label className="block text-sm font-medium text-gray-900" htmlFor={name}>
        Select {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} is required` } : {}}
        render={({ field }) => (
          <Select
            {...field}
            styles={customStyles}
            options={options}
            className={`inputSelect ${className}`}
            {...props}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Selectx;
