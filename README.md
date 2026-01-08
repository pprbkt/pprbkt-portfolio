# Portfolio

![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

A high-performance, interactive portfolio built with **Next.js 16** and **React 19**. Designed with a 'Printstream' aesthetic, featuring 3D visualizations, data-driven components, and hidden interactions.

## ✨ Features

- **⚡ Next.js 16 (Turbopack)**: Utilization of the latest Next.js features for blazing fast performance and SEO.
- **🎨 Printstream Aesthetic**: A custom design system featuring pearlescent gradients, geometric overlays, and technical typography.
- **🧠 Interactive Knowledge Graph**: A custom SVG-based network graph visualization with pan, zoom, and force-directed animations to showcase skills.
- **🕹️ Hidden Parkour Game**: A fully featured 2D platformer easter egg (`/play`) built with HTML5 Canvas, featuring custom physics, collisions, and pixel-art rendering.
- **🌌 3D Hero Background**: An interactive particle starfield implementation using **React Three Fiber** and **Three.js**.
- **🎭 Cinematic Motion**: smooth, scroll-triggered reveals and micro-interactions powered by **Framer Motion**.
- **🌗 Dark Mode**: Fully responsive theme support found in `src/app/globals.css`.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [clsx](https://github.com/lukeed/clsx)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [ESLint](https://eslint.org/)

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/pprbkt/pprbkt-portfolio.git
    cd pprbkt-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open locally**
    Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```bash
src/
├── app/              # App Router pages (/, /works, /play)
├── components/
│   ├── game/         # Parkour Game Engine & Logic
│   ├── layout/       # Header, Footer, HeroBackground (3D)
│   ├── sections/     # Landing page sections (Hero, About, Contact)
│   └── ui/           # Reusable UI components (KnowledgeGraph, Buttons)
├── data/             # Static content data (portfolio.ts)
└── lib/              # Utilities (utils.ts)
```

## 🎮 Easter Egg

There is a hidden "**Play**" button located in the Hero section. Finding it launches the custom-built **Parkour Protocol** mini-game.
- **Controls**: WASD / Arrow Keys to move and jump.
- **Goal**: Reach the green data port at the end of the sector.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will auto-detect the Next.js settings.
4.  Deploy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
