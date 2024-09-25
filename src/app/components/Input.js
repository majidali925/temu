const Inputx = ({
  name,
  label,
  type = "text",
  required = false,
  register,
  errors,
  validation = {},
  ...props
}) => (
  <div className="my-3">
    <label className="block text-sm font-medium text-gray-900" htmlFor={name}>
      {label}
    </label>
    <input
      name={name}
      {...register(name, {
        ...(required && { required: "This field is required" }), // Only add the required rule if it's set to true
        ...validation, // Spread other validation rules like minLength, pattern, etc.
      })}
      type={type}
      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      {...props}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default Inputx;
