import useAppContext from "../hooks/useAppContext";
import { fetchWithTimeout, getFetchUrl } from "../utils";
import DownloadIcon from "./svgs/DownloadIcon";
import Button from "./ui/Button";
import ImageLoader from "./ui/ImageLoader";

const variants = {
  primary:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4",
  secondary:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
};

const Gallery = ({ variant, images = [] }) => {
  const classes = `${variants[variant]}`;

  // Hooks
  const { setImages, query, settings, setDownloadedImages } = useAppContext();

  // Handlers
  const handleRetry = async (idx) => {
    const { seed } = images[idx];
    setImages((prev) =>
      prev.map((img, i) =>
        i === idx ? { ...img, loading: true, error: null } : img
      )
    );
    const url = getFetchUrl(query, { ...settings, seed });
    try {
      const response = await fetchWithTimeout(url, 25000);
      if (!response.ok) throw new Error("Failed to generate image");
      setImages((prev) =>
        prev.map((img, i) =>
          i === idx
            ? { ...img, url: response.url, loading: false, error: null }
            : img
        )
      );
    } catch (err) {
      setImages((prev) =>
        prev.map((img, i) =>
          i === idx
            ? { ...img, url: null, loading: false, error: err.message }
            : img
        )
      );
    }
  };

  const handleDownload = async (img) => {
    try {
      // 1. Fetch the image data
      const response = await fetch(img.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();

      // 2. Create a temporary local URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // 3. Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `AI-image-${img.id}.jpg`; // Set the desired filename
      document.body.appendChild(link);
      link.click(); // Programmatically click the link
      document.body.removeChild(link); // Clean up the link
      URL.revokeObjectURL(blobUrl); // Free up memory

      // 4. Update your application state as before
      setDownloadedImages((prev) => {
        const already = prev.find((d) => d.id === img.id);
        if (already) return prev;
        const updated = [...prev, img];
        // Save to localStorage (serialize as JSON)
        localStorage.setItem("downloadedImages", JSON.stringify(updated));
        return updated;
      });

      // Save to Local Storage
    } catch (error) {
      console.error("Download failed:", error);
      // Optionally handle the error in the UI
    }
  };

  return (
    <div className={classes}>
      {images.map((img, idx) => (
        <div
          className="image-card rounded-xl overflow-hidden cursor-pointer relative"
          key={img.id}
        >
          {img.loading && <ImageLoader />}
          {img.error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full">
              <span className="text-red-400 text-sm mb-2">{img.error}</span>
              <Button variant={"retry"} onClick={() => handleRetry(idx)}>
                Retry
              </Button>
            </div>
          )}
          {!img.loading && !img.error && img.url && (
            <>
              <button
                className="absolute bottom-2 right-2 p-1 cursor-pointer"
                onClick={() => handleDownload(img)}
              >
                <DownloadIcon />
              </button>
              <img
                alt={img.id}
                className="w-full h-48 object-cover"
                src={img.url}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
