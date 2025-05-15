
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Google Fonts
const linkRaleway = document.createElement('link');
linkRaleway.rel = 'stylesheet';
linkRaleway.href = 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap';
document.head.appendChild(linkRaleway);

const linkPlayfair = document.createElement('link');
linkPlayfair.rel = 'stylesheet';
linkPlayfair.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap';
document.head.appendChild(linkPlayfair);

createRoot(document.getElementById("root")!).render(<App />);
