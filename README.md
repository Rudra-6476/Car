<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This repository contains the "APEX SCARLET GT" React application—an exclusive crimson hypercar experience featuring interactive aerodynamics, engine rev audio simulator, custom finish configurator, and cinematic video animation stage.

This guide contains everything you need to run the app locally.

View your app in AI Studio: https://ai.studio/apps/88e163d7-6c51-4a66-87d9-62667ca39adb

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy the example environment file to create your local config.
   ```bash
   cp .env.example .env.local
   ```
   Then, open `.env.local` and set the `GEMINI_API_KEY` to your Gemini API key.

3. Run the app:
   ```bash
   npm run dev
   ```
