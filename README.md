# Rajat K. — Portfolio

A premium, cinematic 3D developer portfolio built with Next.js 14, React Three Fiber, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| 3D | React Three Fiber · @react-three/drei · @react-three/postprocessing |
| Animation | Framer Motion |
| Styling | Tailwind CSS |
| Smooth Scroll | Lenis |
| Language | TypeScript |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Design tokens, film grain, custom scrollbar
│   ├── layout.tsx        # Google Fonts, metadata
│   └── page.tsx          # Root page — Lenis init, loader gate
├── components/
│   ├── CustomCursor.tsx  # Spring-physics cursor ring + dot
│   ├── Loader.tsx        # Cinematic loading screen
│   ├── Navigation.tsx    # Glass nav with mobile menu
│   └── Scene3D.tsx       # Three.js canvas (SSR-disabled)
└── sections/
    ├── Hero.tsx           # Full-viewport hero with 3D centerpiece
    ├── About.tsx          # Split layout with glassmorphism card
    ├── Skills.tsx         # Animated skill bars + tech ticker
    ├── Projects.tsx       # Alternating cinematic project cards
    ├── Experience.tsx     # Animated timeline
    └── Contact.tsx        # Floating-label form
```

## Design System

**Colors**

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080808` | Page background |
| `--surface` | `#111111` | Card / section backgrounds |
| `--text` | `#f0ebe3` | Primary text (warm white) |
| `--muted` | `#4a4540` | Secondary text |
| `--accent` | `#c4a25a` | Gold accent — used sparingly |

**Fonts**

| Variable | Family | Used for |
|---|---|---|
| `--font-cormorant` | Cormorant Garamond | Display / hero name |
| `--font-syne` | Syne | Section headings |
| `--font-dm-sans` | DM Sans | Body copy |
| `--font-space-mono` | Space Mono | Labels, numbers, code |

## Customisation

### Updating content

All copy and data lives inside each section file — no separate data layer needed.

| What | Where |
|---|---|
| Name, tagline, metrics | [src/sections/Hero.tsx](src/sections/Hero.tsx) |
| Bio, stats, current role | [src/sections/About.tsx](src/sections/About.tsx) |
| Skill categories + levels | [src/sections/Skills.tsx](src/sections/Skills.tsx) |
| Projects | [src/sections/Projects.tsx](src/sections/Projects.tsx) |
| Work history | [src/sections/Experience.tsx](src/sections/Experience.tsx) |
| Social links, email | [src/sections/Contact.tsx](src/sections/Contact.tsx) |

### Changing the accent color

Update `--accent` in [src/app/globals.css](src/app/globals.css) and `accent` in [tailwind.config.ts](tailwind.config.ts). The 3D orb color in [src/components/Scene3D.tsx](src/components/Scene3D.tsx) is set separately via the `color` prop on `MeshDistortMaterial`.

### Connecting the contact form

The form in `Contact.tsx` currently simulates a send. Replace the `setTimeout` in `handleSubmit` with a real API call (Resend, Formspree, etc.).

## Deployment

Deploy to [Vercel](https://vercel.com) in one command:

```bash
npx vercel
```

The `transpilePackages: ['three']` entry in [next.config.mjs](next.config.mjs) is required for Three.js to bundle correctly on Vercel.

## License

MIT
