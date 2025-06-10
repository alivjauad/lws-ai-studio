import { memo, useRef } from "react";
import useAppContext from "../hooks/useAppContext";
import { generateSeeds, getFetchUrl } from "../utils";
import ArrowIcon from "./svgs/ArrowIcon";
import SearchIcon from "./svgs/SearchIcon";
import StopIcon from "./svgs/StopIcon";
import Button from "./ui/Button";
import Input from "./ui/Input";
import SearchLoader from "./ui/SearchLoader";

const Search = memo(() => {
  // Ref
  const abortedRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Hooks
  const {
    settings,
    setImages,
    setLoadingImage,
    query,
    setQuery,
    aborted,
    setAborted,
    loadingSearch,
    setLoadingSearch,
  } = useAppContext();

  // Handlers

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleCreateImages = async (event) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" && event.key === "Enter")
    ) {
      setLoadingSearch(true);
      setLoadingImage(true);
      setAborted(false);
      abortedRef.current = false;
      abortControllerRef.current = new AbortController();
      const seeds = generateSeeds(9);

      setImages(
        seeds.map((seed) => ({
          id: seed,
          seed,
          url: null,
          loading: true,
          error: null,
        }))
      );

      // Call Fetch Here
      for (let idx = 0; idx < seeds.length; idx++) {
        if (abortedRef.current) break;
        await fetchOneImage(seeds[idx], idx, abortControllerRef.current.signal);
        if (idx < seeds.length - 1) {
          // Wait 6 seconds between requests (rate limit)
          await new Promise((resolve) => setTimeout(resolve, 6000));
        }
      }

      if (abortedRef.current) {
        setImages((prev) =>
          prev.map((img) =>
            img.loading
              ? { ...img, loading: false, error: "Generation stopped." }
              : img
          )
        );
      }

      setLoadingImage(false);
      setLoadingSearch(false);
    }
  };

  const handleAbort = () => {
    setAborted(true);
    setLoadingSearch(false);
    abortedRef.current = true;
    setLoadingImage(false);
    abortedRef.current = true;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setImages((prev) =>
      prev.map((img) =>
        img.loading
          ? { ...img, loading: false, error: "Generation stopped." }
          : img
      )
    );
  };

  // Fetch
  /*   const fetchOneImage = async (seed, idx,) => {
    const url = getFetchUrl(query, { ...settings, seed });

    try {
      // Check query is empty
      if (query == "" || query == null) {
        throw new Error("Query can not be empty");
      }
      const response = await fetchWithTimeout(url, 60000);

      console.log("Response No: " + idx, "Seed: " + seed);
      console.log(response);

      if (!response.ok) throw new Error("Failed to generate image");

      // If aborted, do NOT update state
      if (abortedRef.current) return;

      // For Pollinations, response.url is usually the image
      setImages((prev) =>
        prev.map((img, i) =>
          i === idx
            ? { ...img, url: response.url, loading: false, error: null }
            : img
        )
      );
    } catch (err) {
      if (abortedRef.current) return;
      setImages((prev) =>
        prev.map((img, i) =>
          i === idx
            ? { ...img, url: null, loading: false, error: err.message }
            : img
        )
      );
      // Print Error and Update Error State
      // setSearchError(err.message);
    } finally {
      // Clear Loading State
      // setLoadingSearch(false);
    }
  }; */

  const fetchOneImage = async (seed, idx, signal) => {
    const url = getFetchUrl(query, { ...settings, seed });

    try {
      if (!query || query.trim() === "") {
        throw new Error("Query cannot be empty");
      }
      const response = await fetch(url, { signal }); // pass abort signal!
      if (!response.ok) throw new Error("Failed to generate image");

      // If aborted, don't update state
      if (abortedRef.current) return;

      setImages((prev) =>
        prev.map((img, i) =>
          i === idx
            ? { ...img, url: response.url, loading: false, error: null }
            : img
        )
      );
    } catch (err) {
      if (err.name === "AbortError" || abortedRef.current) return;
      setImages((prev) =>
        prev.map((img, i) =>
          i === idx
            ? { ...img, url: null, loading: false, error: err.message }
            : img
        )
      );
    }
  };

  return (
    <div className="mb-8">
      <div className="relative pr-0.5 pt-0.5 pb-0.5 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/10 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="pl-5 pr-2">
            <SearchIcon />
          </div>
          <Input
            variant="search"
            placeholder={"Create with prompts"}
            fullWidth={true}
            type="text"
            value={query}
            onInput={handleSearch}
            onPressEnter={handleCreateImages}
            disabled={loadingSearch}
          />

          {loadingSearch && <SearchLoader />}

          {/* On Search Show Abort or Arrow */}
          {settings.model !== "" && loadingSearch && !aborted && (
            <Button
              variant="primary"
              disabled={
                settings.width < 256 ||
                settings.height < 256 ||
                query == "" ||
                query == null
              }
              onButtonClick={handleAbort}
            >
              <StopIcon />
            </Button>
          )}

          {settings.model !== "" && !loadingSearch && (
            <Button
              variant="primary"
              disabled={
                settings.width < 256 ||
                settings.height < 256 ||
                query == "" ||
                query == null
              }
              onButtonClick={handleCreateImages}
            >
              <ArrowIcon />
            </Button>
          )}
        </div>
      </div>
      {/* Show API Error */}
      {/*   {searchError && (
        <p className="text-red-300 text-md mt-2">{searchError}</p>
      )} */}
    </div>
  );
});

export default Search;
