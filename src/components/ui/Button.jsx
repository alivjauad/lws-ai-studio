const Button = ({
  children,
  variant = "primary",
  icon,
  item = {},
  iconPosition = "right",
  fullWidth = false,
  disabled = false,
  onButtonClick,
}) => {
  const { name } = item;
  const variants = {
    primary:
      "bg-zinc-800 hover:bg-zinc-700 transition-colors p-4 mr-1 rounded-full",
    presets:
      "px-3 py-3 text-xs hover:bg-zinc-800 rounded transition-colors bg-zinc-900/10",
    "presets-selected":
      "px-3 py-3 bg-green-800 text-white rounded transition-colors",
    retry: "px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 text-xs",
  };

  const classes = `cursor-pointer ${variants[variant] || variants.primary} ${
    fullWidth ? "w-full" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed!" : ""}`;

  return (
    <button
      className={classes}
      name={name}
      onClick={disabled ? undefined : onButtonClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
