import { memo, useEffect } from "react";
import Gallery from "../components/Gallery";
import Options from "../components/Options";
import Search from "../components/Search";
import useAppContext from "../hooks/useAppContext";

const CreateImage = memo(() => {
  // Hooks
  const {
    setAborted,
    setLoadingImage,
    setLoadingSearch,
    images,
    setImages,
    setSearchError,
    // ...any other relevant setters
  } = useAppContext();

  useEffect(() => {
    // This function runs when the component is UNMOUNTED
    return () => {
      // Abort any ongoing generation and reset states
      setAborted(true);
      setLoadingImage(false);
      setLoadingSearch(false);
      setSearchError("");
      // Optionally: clear image results (if you want fresh results on new entry)
      setImages([]);
    };
  }, [
    setAborted,
    setLoadingImage,
    setLoadingSearch,
    setSearchError,
    setImages, // Uncomment if you want to clear images
  ]);

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
