# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9dc04436-d5bf-462f-9034-7796a7e2674c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9dc04436-d5bf-462f-9034-7796a7e2674c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9dc04436-d5bf-462f-9034-7796a7e2674c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Troubleshooting

### Fixing Image URL Issues

If you encounter the error: `Invalid image URL: Expected a base64-encoded data URL with an image MIME type, but got a value without the 'data:' prefix.`, this indicates a problem with the format of base64-encoded images in your application.

To fix this issue:

1. Use the `ImageFix` component for any image that might be loaded as a data URL:

```jsx
import ImageFix from '@/components/ImageFix';

// Replace this:
<img src={imageUrl} alt="Description" />

// With this:
<ImageFix src={imageUrl} alt="Description" />
```

2. For programmatic image loading, use the utility functions:

```typescript
import { validateBase64ImageUrl, urlToBase64 } from '@/utils/image-utils';

// Fix a data URL
const fixedDataUrl = validateBase64ImageUrl(dataUrl);

// Convert a regular URL to a data URL
const dataUrl = await urlToBase64(regularUrl);
```

### Fixing Manifest Icon Issues

If you see errors related to manifest icons like:
`Error while trying to use the following icon from the Manifest: http://localhost:8080/apple-touch-icon.png (Download error or resource isn't a valid image)`

Make sure all the required icons are available in your public directory:

- favicon.ico (48x48)
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png (180x180)
- android-chrome-192x192.png
- android-chrome-512x512.png

If the icons are not available, you can generate them from your logo using the script in `scripts/generate-icons.js`:

```bash
# Install sharp if not already installed
npm install --save-dev sharp

# Run the icon generation script
node scripts/generate-icons.js
```
