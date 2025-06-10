import logo from "../assets/images/logo.svg";
import useAppContext from "../hooks/useAppContext.jsx";
import NavItem from "./ui/NavItem.jsx";

// Nav Items Array
const navItems = [
  { id: 1, label: "Create Image", active: true, value: "createImage" },
  { id: 2, label: "Downloaded", active: false, value: "downloaded" },
];

const Header = () => {
  const { setActiveMenu } = useAppContext();

  // Handlers

  const handleNavItemClick = (value) => {
    setActiveMenu(value);
  };

  return (
    <header className="flex items-center mb-12 justify-between">
      <div className="flex items-center">
        <img className="h-10" src={logo} />
      </div>
      <ul className="ml-4 text-sm text-zinc-400 flex gap-8">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            active={item.active}
            value={item.value}
            onClick={() => handleNavItemClick(item.value)}
          >
            {item.label}
          </NavItem>
        ))}
      </ul>
    </header>
  );
};

export default Header;
