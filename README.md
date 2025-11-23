# Uxercise Demo

A commercial-quality, fully-isolated fitness micro-application built with Next.js, Material-UI, and TypeScript. Designed for future Tauri desktop bundling with complete SPA functionality.

## Features

- **Dashboard**: Overview of weekly stats, quick workout creation, and recent activity
- **Workout Builder**: Create custom workouts with 180+ exercises, templates, and advanced set types
- **Workout Player**: Full-screen timer interface with exercise tracking
- **Workout Library**: Manage, search, sort, and schedule workouts
- **Activity Log**: Track completed workouts with detailed CSV export
- **Profile**: Manage personal stats, body measurements, and BMI calculator

## Project Structure

```
/app/demo                 # Fully isolated fitness micro-application
  ├── layout.tsx          # Demo layout with device frame & prototype toolbar
  ├── page.tsx            # Dashboard
  ├── /dashboard          # Dashboard page
  ├── /builder            # Workout builder
  │   └── /player         # Workout player (timer)
  ├── /workouts           # Workout library
  ├── /log                # Activity log
  ├── /account            # User profile
  ├── /_components        # Shared components
  ├── /_data              # Exercise templates & workout presets
  ├── /_lib               # localStorage API & Tauri preparation
  ├── /_theme             # MUI theme configuration
  └── /_styles            # Global CSS styles
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: Material-UI (MUI) v5
- **State Management**: localStorage (namespaced keys)
- **Styling**: CSS-in-JS with MUI theme + global CSS
- **TypeScript**: Full type safety
- **Build Target**: Static export (SPA-ready for Tauri)

## Color System

- **Primary**: Soft Orange (#FF8C42)
- **Secondary**: Deep Gold (#C8A951, #D4B969, #E7CF8B)
- **Neutrals**: Charcoal (#1C1C1C), Dark Gray (#2A2A2A), Light Gray (#E4E4E4)
- **Gradients**: Orange-to-Gold, Gold-to-Amber

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000/demo](http://localhost:3000/demo) in your browser.

## Prototype Features

The demo includes a prototype toolbar (hidden in production/Tauri builds) with:

- **Mobile/Desktop Toggle**: Switch between device simulation and desktop view
- **Device Presets**: iPhone SE, iPhone 12, Pixel 7, Generic
- **Reset Data**: Clear all localStorage data

## Data Storage

All data is stored in localStorage with namespaced keys:

- `uxercise_demo_workouts_v1`: Saved workouts
- `uxercise_demo_logs_v1`: Workout history
- `uxercise_demo_profile_v1`: User profile
- `uxercise_demo_settings_v1`: App settings

## Tauri Preparation

The application is fully prepared for Tauri desktop bundling:

- ✅ Fully client-side (no server dependencies)
- ✅ Static export configuration
- ✅ No dynamic Node APIs
- ✅ Relative asset paths
- ✅ Placeholder Tauri functions in `/demo/_lib/tauri.ts`

## Exercise Database

180+ exercises covering:

- Chest, Back, Shoulders, Arms, Legs, Core
- Bodyweight, Barbell, Dumbbell, Cable, Machine
- Strength, HIIT, CrossFit, Olympic lifts, Plyometrics

## Workout Templates

Pre-built templates include:

- Push/Pull/Legs (PPL) split
- Upper Body & Full Body
- HIIT Circuit
- CrossFit classics (Murph, Badger, The Seven)

## CSV Export

Export workout logs in two formats:

- **Summary CSV**: Overview of all workouts (date, duration, exercises)
- **Detailed CSV**: Complete set-by-set breakdown

## License

MIT
