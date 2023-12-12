import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

/**
 * Input component that handles value changes and displays an optional icon.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {string} [props.value=""] - The value of the input.
 * @param {Function} [props.setValue=() => {}] - The callback function to set the input value.
 * @param {string} [props.className=""] - Additional class names for styling.
 * @param {IconDefinition} [props.icon=null] - The FontAwesome icon to be displayed.
 * @param {Function} [props.onIconClick=() => {}] - The callback function to call when the icon is pressed.
 * @param {...Object} props.restProps - Additional props to be passed to the underlying input element.
 * @returns {JSX.Element} - The rendered input element with an optional icon.
 */
const Input: React.FC<
  {
    value?: string;
    setValue?: (value: string) => void;
    className?: string;
    icon?: IconDefinition | null;
    onIconClick?: () => void;
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  value = "",
  setValue = () => {},
  className = "",
  icon = null,
  onIconClick = () => {},
  ...restProps
}) => {
  /**
   * Handles the input value change.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`w-full py-2 px-4 bg-transparent border-b-2 flex justify-between items-center ${
        isFocused ? "border-red-400" : "border-red-300"
      }`}
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        value={value}
        onChange={handleChange}
        className={`bg-transparent w-[90%] outline-none ${className}`}
        {...restProps}
      />
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={`${
            isFocused ? "text-red-500" : "text-gray-400"
          } cursor-pointer`}
          onClick={onIconClick}
        />
      )}
    </div>
  );
};

export default Input;
