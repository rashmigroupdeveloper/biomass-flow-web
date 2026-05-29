# Biomass Flow Web

Rashmi 6 Paradigm Limited - Leading producer of biomass pellets and sustainable energy solutions.

## Project info

This is a modern web application for Biomass Flow, focusing on sustainable energy solutions, bio pellets, activated carbon, and charcoal briquettes.

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd biomass-flow-web

# Install the necessary dependencies
npm install
```

### Development

```sh
# Start the development server
npm run dev
```

### Build

```sh
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Troubleshooting

### Fixing Image URL Issues

If you encounter issues with base64-encoded images:

1. Use the `ImageFix` component:

```jsx
import ImageFix from '@/components/ImageFix';

// Replace this:
<img src={imageUrl} alt="Description" />

// With this:
<ImageFix src={imageUrl} alt="Description" />
```

2. For programmatic image loading, use the utility functions in `src/utils/image-utils.ts`.

### Fixing Manifest Icon Issues

Ensure all required icons are in the `public/` directory:

- favicon.ico (48x48)
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png (180x180)
- android-chrome-192x192.png
- android-chrome-512x512.png

You can generate these using the provided script:

```bash
# Run the icon generation script
node scripts/generate-icons.js
```
