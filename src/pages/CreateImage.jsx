import { memo } from "react";
import Gallery from "../components/Gallery";
import Options from "../components/Options";
import Search from "../components/Search";
import useAppContext from "../hooks/useAppContext";

const CreateImage = memo(() => {
  // Hooks
  const { images } = useAppContext();
  // console.log("Creae Image Comp");

  return (
    <main className="relative z-10">
      <h2 className="text-4xl font-bold mb-8">
        Let's create a masterpiece, Alvian! <span className="text-2xl">👋</span>
      </h2>

      {/* Search Bar */}
      <Search />
      {/* <InputLoader /> */}
      {/* <SearchLoader /> */}

      {/* ADVANCED SECTION */}

      <Options />

      {/* Result Section */}

      <div>
        <h3 className="text-zinc-200 mb-4 font-bold text-lg">Result</h3>
        <Gallery variant="primary" images={images} />
      </div>
    </main>
  );
});

export default CreateImage;
