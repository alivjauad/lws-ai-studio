# AI Studio — Pollinations Image Generator

## Overview

**AI Studio** is a modern React web application that allows users to generate AI images using the [Pollinations AI API](https://image.pollinations.ai/).  
Users can enter a prompt, select advanced image generation settings (model, width, height), and fetch multiple images with unique seeds.  
The app features robust UX for rate limiting, sequential API calls, request aborting, per-image error and retry handling, and a persistent gallery of downloaded images using local storage.

---

## Learning Objectives

- **Integrate a 3rd-party AI image API** (Pollinations) in a modern React app.
- **Handle API rate limits** and implement safe sequential fetching.
- **Use React Context for state management** across multiple components/pages.
- **Implement request aborting** using `AbortController` for clean UI/UX.
- **Manage per-image loading, error, and retry states** in a grid.
- **Enable robust, user-friendly downloading** of generated images, including cross-origin workarounds using Blobs.
- **Persist data using localStorage** for user session continuity.
- **Organize a React project** with clear, scalable component and page structure.

---

## Requirements

- [x] React
- [x] Vite
- [x] [Pollinations AI API](https://image.pollinations.ai/)
- [x] Not Allowed: Router, Suspense, Third party package

---

## Methodology

1. **Prompt Input & Settings**
   - Users enter a prompt and adjust advanced settings (model, width, height, etc.).
2. **Image Generation**
   - On search, app generates 9 random seeds and fetches images one-by-one, with a 6-second delay to respect Pollinations API rate limits.
   - Uses `AbortController` to allow user to cancel generation mid-process; incomplete images show `"Generation stopped."` with no retry.
   - Each grid item manages its own loading, error, and retry state.
   - Handles API/network errors with per-image retry option.
3. **Download & Gallery**
   - Users can download any generated image (using Blob workaround for cross-origin files).
   - Downloaded images are tracked in state and persisted in `localStorage` for future visits.
   - Separate page ("Downloaded") displays all images the user has downloaded.
4. **Navigation & State**
   - App uses a top-level context to share state (prompt, settings, images, loading, aborted, downloadedImages) across components.
   - Navigation between "Create Image" and "Downloaded" pages resets/cleans up fetches and loaders using React effects.

---

## Mind Map

!["AI Studio mind map"](/public/minmap-aliv.jpg)
