export default function InputField({
  label,
  type = "text",
  textarea = false,
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
  min,
  max,
  rows,
  ...rest
}) {
  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={
            "w-full p-3 rounded-xl border border-amber-500 shadow focus:outline-none focus:border-amber-800 transition-colors duration-200 placeholder-gray-400 " +
            className
          }
          required={required}
          rows={rows || 4}
          {...rest}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={
            "w-full p-3 rounded-xl border border-amber-500 shadow focus:outline-none focus:border-amber-800 transition-colors duration-200 placeholder-gray-400 " +
            className
          }
          required={required}
          min={min}
          max={max}
          {...rest}
        />
      )}
    </div>
  );
}