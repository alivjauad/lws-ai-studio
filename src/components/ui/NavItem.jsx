const NavItem = ({
  children,
  href,
  variant = "primary",
  active = false,
  value,
  ...rest
}) => {
  const variants = {
    primary: "hover:text-zinc-200 font-medium cursor-pointer transition-all",
  };

  const classes = ` ${variants[variant]} ${active ? "text-zinc-200" : ""}`;

  return (
    <a className={classes} href={href} value={value} {...rest}>
      {children}
    </a>
  );
};

export default NavItem;
