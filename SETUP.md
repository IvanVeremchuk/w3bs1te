# Quick Setup Guide

## Important: Model File Location

The `model.glb` file should be placed in the `public/` directory to be accessible at `/model.glb`.

**Current status:** `model.glb` is in the root directory. Please move it to `public/model.glb` for the 3D scene to load correctly.

## Image Assets

Images are already in the `images/` folder and will be accessible at `/images/...` when served.

## Installation Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Move `model.glb` to `public/` directory:
   ```bash
   # On Windows PowerShell:
   Move-Item model.glb public/model.glb
   
   # On Mac/Linux:
   mv model.glb public/model.glb
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open browser to the URL shown (typically http://localhost:5173)

## Controls

- Press **G** key to toggle Leva GUI panel
- Use Leva controls to adjust:
  - Lighting intensities and mouse sensitivity
  - Bloom effect parameters
  - Model rotation speed

## Troubleshooting

- If model doesn't load: Ensure `model.glb` is in `public/` folder
- If images don't show: Check that `images/` folder exists with render images
- If Leva panel doesn't appear: Press 'G' key (not Ctrl+G, just G)

