# 3D Portfolio - React Three Fiber

A high-performance 3D portfolio built with React, Vite, Tailwind CSS, and React Three Fiber.

## Features

- **Interactive 3D Hero Section**: Full-screen 3D scene with GLB model loading
- **PBR Materials**: Realistic rendering with MeshPhysicalMaterial
- **HDRI Environment**: Studio environment maps for realistic reflections
- **Dynamic Lighting**: Mouse-reactive lighting system to highlight normal maps
- **Post-Processing**: Bloom effect for emission maps
- **Leva GUI**: Live editing controls (toggle with 'G' key)
- **Responsive Design**: Mobile-first responsive layout
- **Dark Theme**: Cyber-chic aesthetic with #0a0a0a background

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Ensure model.glb is in the public folder:**
   The 3D model should be located at `/public/model.glb` or in the root directory (will be accessible at `/model.glb` when served).

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Hero3D.tsx          # Full-screen 3D scene
│   │   ├── Model3D.tsx         # GLB model loader with PBR materials
│   │   ├── Lighting.tsx        # Dynamic lighting system
│   │   ├── RenderGrid.tsx      # Portfolio render grid
│   │   ├── Footer.tsx          # About + Contact form
│   │   └── LevaControls.jsx    # GUI controls
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── public/
│   ├── model.glb               # 3D model (move here if not already)
│   └── images/                 # Portfolio images
└── package.json
```

## Controls

- **G Key**: Toggle Leva GUI panel for live editing
  - Lighting intensity and mouse sensitivity
  - Bloom effect parameters
  - Model rotation speed

## Technologies

- React 18
- Vite
- React Three Fiber
- Three.js
- @react-three/drei
- @react-three/postprocessing
- Leva (GUI controls)
- Tailwind CSS

## Browser Support

Modern browsers with WebGL 2.0 support required.

