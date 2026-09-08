import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-soil-700">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`rounded-xl border px-3 py-2 text-sm text-soil-900 placeholder:text-soil-400
            focus:outline-none focus:ring-2 focus:ring-farm-500 focus:border-farm-500
            disabled:bg-farm-50 disabled:cursor-not-allowed
            ${error ? "border-red-400" : "border-soil-200"} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-red-600">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-soil-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;