const Inputx = ({
  name,
  label,
  type = "text",
  required = false,
  register,
  errors,
  validation = {},
  className = "",

  ...props
}) => (
  <div className="my-3">
    <label className="block text-sm font-medium text-gray-900" htmlFor={name}>
      {label}
    </label>
    <input
      className={`inputText ${className}`}
      name={name}
      {...register(name, {
        ...(required && { required: `${label} is required` }), // Only add the required rule if it's set to true
        ...validation, // Spread other validation rules like minLength, pattern, etc.
      })}
      type={type}
      {...props}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default Inputx;
