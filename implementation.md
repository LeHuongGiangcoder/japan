# Love Diary Website Implementation Plan

This plan outlines the architecture and implementation steps to build the scroll-driven, retro collage website demonstrating the love story of Jack & Chi.

## User Review Required

> [!IMPORTANT]  
> Please review the chosen tech stack and architecture. I propose using **Vite** (with plain HTML/CSS/JS) to build this website efficiently while utilizing **native CSS Scroll-Driven Animations** for the smoothest scroll effects.

## Open Questions

> [!WARNING]
> 1. Do you want to use Vite as the build tool? (It makes local development very fast and handles asset bundling smoothly).
> 2. The Native CSS Scroll-Driven Animations currently have limited support (Chrome 115+, Edge 115+). Should we rely on the native CSS feature with a Javascript `IntersectionObserver` fallback for unsupported browsers (like Safari/Firefox), or would you prefer using a library like **GSAP (ScrollTrigger)** for maximum browser compatibility out of the box?
> 3. We have components for the entrance and Japan scene. Are there specific components for Europe (2025) and Vietnam (2026) that will be uploaded later, or should I create placeholders for them for now?

## Proposed Changes

We will restructure the current repository into a Vite project and implement the styles and scroll animations.

---

### Project Setup and Foundation

#### [NEW] `index.html`
The main HTML file. We will define 4 full-height sections corresponding to the 4 scenes.

#### [NEW] `style.css`
Contains the styling, typography (Tan and Brittany fonts), and the CSS Scroll-Driven animations.
- Define `@font-face` for Tan-Buster and Brittany Signature.
- Setup `.scene` containers (100vh, sticky positioning or relative positioning for parallax).
- Define keyframes for zooming out the entrance arch.
- Define keyframes for sliding up the Japan components.

#### [NEW] `main.js`
Contains any fallback JavaScript needed for browsers that do not support native CSS scroll-driven animations (if we go with the native route) or the GSAP initialization (if we choose GSAP).

#### [NEW] `package.json` & `vite.config.js`
Configuration for Vite to serve and build the application.

---

### Animation Strategy

1. **Scene 1 (Entrance Zoom Out):**
   - The entrance scene (with `entrance.png` and text) will be `position: sticky; top: 0; height: 100vh;`.
   - As the user scrolls down, a scroll-driven animation will apply `transform: scale(x)` to the entrance arch, making it zoom out and creating a "pass through" effect.
   - The text will fade out.

2. **Scene 2 (Japan Collage):**
   - This scene will be revealed as the user passes through the entrance arch.
   - The components from the `japan component` folder will be absolutely positioned.
   - Using scroll-driven animations with `animation-range`, they will start below their final position (`transform: translateY(...)`) and slide up into place as the scene enters the viewport.

3. **Scenes 3 & 4 (Europe & Vietnam):**
   - We will set up the skeletal structure and basic scroll-trigger behavior for these scenes using placeholders until the assets are ready.

## Verification Plan

### Automated / Browser Tests
- Run `npm run dev` and navigate through the application.
- Verify native CSS scroll-driven animations in Chrome.
- Verify fallback behavior in Firefox or Safari (or verify GSAP functionality across all browsers if chosen).

### Manual Verification
- Ensure the custom fonts (Brittany and Tan) load correctly and match the design idea.
- Scroll slowly to verify the exact zoom scale of the entrance and the timing of the sliding components in the Japan scene to ensure it feels natural.
