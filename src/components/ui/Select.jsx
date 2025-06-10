import InputLoader from "../ui/InputLoader";

const Select = ({
  items,
  value,
  name,
  fullWidth,
  variant,
  onSortChange,
  label,
  labelProps = {},
  isLoading,
  fetchError,
}) => {
  const variants = {
    primary: "border rounded-md px-2 py-1 text-sm",
    secondary:
      "px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
  };

  const classes = `${variants[variant]} ${fullWidth ? "w-full" : ""}`;

  return (
    <div>
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
      <div className="relative">
        <select
          className={classes}
          name={name}
          onChange={onSortChange}
          id={labelProps.htmlFor}
          disabled={isLoading}
          value={value}
        >
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            items.map((item) => (
              <option key={item.id} value={item.value} className="bg-zinc-900">
                {item.name}
              </option>
            ))
          )}
        </select>
        {isLoading && (
          <span className="pointer-events-none absolute inset-y-2 right-6 ">
            <InputLoader />
          </span>
        )}
        {/* <span className="pointer-events-none absolute inset-y-2 right-6 ">
          <InputLoader />
        </span>
        <InputLoader /> */}
      </div>
      {fetchError && <p className="text-red-300 text-md mt-1">{fetchError}</p>}
    </div>
  );
};

export default Select;
