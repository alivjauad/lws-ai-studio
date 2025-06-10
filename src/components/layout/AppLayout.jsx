import useAppContext from "../../hooks/useAppContext";
import CreateImage from "../../pages/CreateImage";
import Downloaded from "../../pages/Downloaded";
import Glow from "../Glow";
import Header from "../Header";

const AppLayout = () => {
  // *Hooks
  const { activeMenu } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl ]">
      <Header />
      <Glow />
      {activeMenu === "createImage" && <CreateImage />}
      {activeMenu === "downloaded" && <Downloaded />}
    </div>
  );
};

export default AppLayout;
