# 🏋️‍♂️ FitLog — Dark Gym Companion Web App

FitLog is a dark, no-nonsense gym companion web application built with **Next.js (App Router)**, **Tailwind CSS**, and **TypeScript**. It provides athletes and gym-goers with an intuitive workout library, single-workout detail views with key specs, structured daily planning (with a 5-lift cap), live activity metric calculation, and persistent storage.

---

## 🚀 Live Demo & Deployment

- **Repository Directory**: `C:\Users\ataul\.gemini\antigravity\scratch\fit-log-app`
- **Build Status**: Verified Next.js App Router Build

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | UI Rendering, SSR/CSR, and Client Routing |
| **React 19 & TypeScript** | Component Architecture & Type-safe Data Models |
| **Tailwind CSS v4** | Dark Theme Styling, Responsive Grid & Flex Layouts |
| **Lucide React** | Clean UI Icons |
| **Sonner** | Interactive Toast Notifications |
| **Google Fonts (Oswald & Inter)** | Figma Exact Uppercase Typography & Sans Body Text |

---

## Key Features (Minimum 5 Requirements)

1. **🏋️ Workout Library (3x4 Responsive Grid)**:
   - Displays 12 lifts covering major muscle groups fetched live from Cloudflare Worker APIs (`https://api.abcz.workers.dev/api/fitlog`).
   - Cards display category tags, lift names, equipment requirements, duration, calorie burn, and ratings.

2. **⚡ Real-time Search & Multi-Criteria Sorting**:
   - Filter workouts instantly by lift name, equipment, or muscle group tags.
   - Custom sort dropdown (`Duration`, `Calories`, `Rating`) that re-sorts current library and plan lists on the fly.

3. **📊 Live Metrics Summary & Tabbed Plan Management (`/my-plan`)**:
   - Live updated counters for **Total Exercises**, **Total Minutes**, and **Total Calories**.
   - Tabbed view between `Today's Plan` and `Saved` lifts.
   - Includes custom empty states (`"NOTHING HERE YET"`) when no lifts are added.

4. **🔒 5-Lift Cap Enforcement & Interactive Actions**:
   - Daily workouts are strictly capped at 5 exercises as per training philosophy.
   - Users can mark exercises as `Done` with completion badges, or remove exercises dynamically.
   - Responsive toast notifications accompany every user interaction.

5. **💾 Persistent Local Storage Sync**:
   - All items added to Today's Plan or Saved list, along with completed states, automatically survive browser reloads using `localStorage`.

6. **🎯 Two-Column Workout Details Page (`/workout/[id]`)**:
   - Displays full-bleed workout illustration, category tags, a structured **Key Specs Panel** (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating), and a 4-step ordered instruction list.

7. **📱 Mobile, Tablet & Desktop Responsive Layout**:
   - Fully optimized for all viewports with smooth-scrolling CTAs and a custom dark **404 Page** for invalid routes.

---

## 🏃 Getting Started & Running Locally

1. Clone or navigate to project directory:
   ```bash
   cd fit-log-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 📜 License & Credits

© 2026 FitLog — Workout Library. Train hard, log honest.
