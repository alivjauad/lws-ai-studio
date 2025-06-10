import Gallery from "../components/Gallery";
import useAppContext from "../hooks/useAppContext";

const Downloaded = () => {
  // *Hooks
  const { downloadedImages } = useAppContext();
  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">
        Downloaded <span className="text-2xl">👋</span>
      </h2>
      {downloadedImages && downloadedImages.length > 0 ? (
        <Gallery
          variant="secondary"
          images={downloadedImages}
          showDownload={false}
        />
      ) : (
        <p className="text-zinc-400 text-lg">No downloaded images yet.</p>
      )}
    </div>
  );
};

export default Downloaded;
