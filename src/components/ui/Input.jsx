const variants = {
  primary: "flex-grow bg-white text-black rounded-md px-4 py-3",
  secondary:
    "bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
  search:
    "outline-none py-4 px-2 bg-transparent text-white placeholder-zinc-400 text-lg",
};

const Input = ({
  type,
  placeholder,
  variant = "primary",
  fullWidth,
  name,
  value,
  onInput,
  label,
  disabled = false,
  labelProps = {},
  inputError,
  min = 256,
  onPressEnter,
  ...rest
}) => {
  const classes = `${variants[variant]} ${fullWidth ? "w-full" : ""} ${
    disabled ? "!text-zinc-700" : ""
  }`;

  return (
    <>
      {label && (
        <label
          className={
            labelProps.className ||
            "block text-sm font-medium text-zinc-700 mb-1"
          }
          htmlFor={labelProps.htmlFor}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={classes}
        name={name}
        min={min}
        value={value}
        onChange={onInput}
        id={labelProps.htmlFor}
        disabled={disabled}
        onKeyDown={onPressEnter}
        {...(variant === "search" && { autoComplete: "off" })}
        {...rest}
      />
      {inputError && <p className="text-red-300 text-md mt-1">{inputError}</p>}
    </>
  );
};

export default Input;
