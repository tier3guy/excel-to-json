import React, { ButtonHTMLAttributes, FC } from "react";

/**
 * Button Component
 *
 * A reusable button component.
 *
 * @component
 *
 * @param {string} label - The label/text content of the button.
 * @param {ButtonHTMLAttributes} restProps - Additional HTML attributes for the button.
 *
 * @example
 * // Example usage of Button component
 * <Button label="Click me" onClick={() => console.log("Button clicked")} />
 */
const Button: FC<
  {
    label?: string;
    loading?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ label = "Button", className = "", loading = false, ...restProps }) => {
  return (
    <button
      className={`border-red-500 border-2 px-4 py-1 bg-red-300 hover:bg-red-200 ${className}`}
      {...restProps}
    >
      {loading ? "Loading ..." : label}
    </button>
  );
};

export default Button;
