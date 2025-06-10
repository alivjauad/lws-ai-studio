// Capitalize Words
export const capitalizeFirst = (str) => {
  if (!str) return str;
  return str.at(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Encode Fetch URL for Pollination AI
export const getFetchUrl = (prompt, settings = {}) => {
  const baseUrl = "https://image.pollinations.ai/prompt";
  const encodedPrompt = encodeURIComponent(prompt.trim().toLowerCase());

  // Build query string from non-empty settings
  const queryString = Object.entries(settings)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return `${baseUrl}/${encodedPrompt}${queryString ? "?" + queryString : ""}`;
};

// Generate Random Seed
export const generateSeeds = (count = 9) => {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * 1_000_000_000)
  );
};

//Delay
const sleep = (timeout, message = "Request timed out") => {
  return new Promise((res, rej) =>
    setTimeout(() => {
      rej(new Error(message));
    }, timeout)
  );
};

// Timeout Promise
export const fetchWithTimeout = (url, ms, message = "Request timed out") => {
  return Promise.race([fetch(url), sleep(ms, message)]);
};
