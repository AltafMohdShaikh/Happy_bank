import React from "react";

export default function FormInput({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  options = [],
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  rows = 3,
  className = "",
  checked,
  min,
  max
}) {
  const inputId = id || name;

  if (type === "checkbox") {
    return (
      <div className={`flex items-start gap-2.5 ${className}`}>
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked !== undefined ? checked : Boolean(value)}
          onChange={onChange}
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
        />
        <div className="text-sm">
          <label htmlFor={inputId} className="font-medium text-slate-700 cursor-pointer select-none">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          {helperText && <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>}
          {error && <p className="text-xs text-rose-600 mt-0.5">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}

      {type === "select" ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 ${
            error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500" : "border-slate-300"
          }`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 ${
            error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500" : "border-slate-300"
          }`}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 ${
            error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500" : "border-slate-300"
          }`}
        />
      )}

      {error ? (
        <p className="text-xs text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
