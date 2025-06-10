import { useState } from "react";
import { AppContext } from "./index";

let options = {
  model: "",
  seed: null,
  width: 1024,
  height: 1024,
  private: true,
  nologo: true,
  safe: true,
};

const AppContextProvider = ({ children }) => {
  // *States
  const [activeMenu, setActiveMenu] = useState("createImage");

  const [settings, setSettings] = useState(options);

  const [images, setImages] = useState([]);

  const [searchError, setSearchError] = useState("");

  const [loadingImage, setLoadingImage] = useState(false);

  const [query, setQuery] = useState("");

  const [aborted, setAborted] = useState(false);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const [downloadedImages, setDownloadedImages] = useState(() => {
    try {
      const fromStorage = localStorage.getItem("downloadedImages");
      return fromStorage ? JSON.parse(fromStorage) : [];
    } catch {
      return [];
    }
  });

  return (
    <AppContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        settings,
        setSettings,
        images,
        setImages,
        searchError,
        setSearchError,
        loadingImage,
        setLoadingImage,
        query,
        setQuery,
        downloadedImages,
        setDownloadedImages,
        aborted,
        setAborted,
        loadingSearch,
        setLoadingSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
