# 🎮 Tic-Tac-Toe — Dynamic Board Game

> A production-ready, fully responsive Tic-Tac-Toe game with a dynamic board size, move history, and draw detection — built as a deep-dive into clean Next.js architecture and component design.

**🔗 Live Link:** [tictactoe.onyekaanene.com](https://tictactoe.onyekaanene.com) &nbsp;|&nbsp; **📂 Repo:** [github.com/onyekaanene/tic-tac-toe](https://github.com/onyekaanene/tic-tac-toe)

---

## 🚀 Why I Built This

The classic React Tic-Tac-Toe tutorial is a rite of passage — but the default implementation is not production-ready. I rebuilt it from scratch with a focus on correctness, scalability, and clean architecture: adding full TypeScript types, draw detection, accessibility, and a proper Next.js App Router structure with separated components.

This project also served as a sandbox for practising **component-driven design**, **CSS container queries**, and **responsive layouts without a UI framework**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔢 Dynamic Board | Switch between 3×3, 4×4, and 5×5 boards on the fly |
| 🏆 Win Detection | Works correctly for any board size — rows, columns, and both diagonals |
| 🤝 Draw Detection | Declares a draw when the board is full with no winner |
| 📜 Move History | Full move-by-move history with time travel — jump to any past state |
| ♿ Accessible | `aria-label`, `aria-pressed`, `aria-current`, `role="grid"`, and live regions throughout |
| 📱 Responsive | Three-column desktop layout collapses to a clean single-column stack on mobile |
| 🎨 No UI Framework | Styled entirely with custom CSS using design tokens and container queries |
| ⚡ Memoised Logic | `calculateWinner` and draw checks wrapped in `useMemo` — safe on large boards |

---

## 📸 Screenshots
### Desktop
![Desktop Layout](screenshots/board.png)

---

## 🎬 App Walkthrough

### Three-Column Layout — Everything in view
Controls sit in the left sidebar, the board is centred, and move history lives on the right. The board is always fully visible without scrolling — even on a 5×5 grid.

### Dynamic Board Size
Switch between 3×3, 4×4, and 5×5 at any time. The board, win logic, and history all reset automatically. The win algorithm works for any square board size.

### Move History — Time travel
Every move is recorded. Click any entry in the history panel to jump back to that exact board state. The current move is always highlighted.

### Draw Detection
When all squares are filled with no winner, the game correctly declares a draw instead of leaving the status bar hanging on "Next player".

---

## 🛠️ Tech Stack

```
Frontend       Next.js 16 (App Router) + TypeScript
Styling        Custom CSS (design tokens, container queries)
State          React useState + useCallback + useMemo
Deployment     Vercel
```

### Architecture Decisions

- **Next.js App Router** — `page.tsx` is a server component; the `"use client"` boundary sits at `Game.tsx`, keeping the server/client split clean and explicit.
- **Separated components** — `Square`, `Board`, `GameControls`, `MoveHistory`, and `Game` are each in their own file with typed props, making the codebase easy to extend and test.
- **Pure utility functions** — `calculateWinner` and `calculateDraw` live in `utils/` with no React dependencies, making them trivially unit-testable.
- **CSS container queries** — the board uses `cqi` units so square sizes and symbol font sizes scale relative to the board's own width, not the viewport. This makes the board correct on every screen without media query hacks.
- **No UI framework** — all styling is hand-written using CSS custom properties. This keeps the bundle lean and gives full control over every visual detail.

---

## 📁 Project Structure

```
tic-tac-toe/
├── app/
│   ├── layout.tsx          # Root layout — Google Fonts via next/font
│   ├── page.tsx            # Server component entry point
│   └── globals.css         # All styles with CSS design tokens
│
├── components/
│   └── game/
│       ├── Game.tsx         # State owner — all game logic lives here
│       ├── Board.tsx        # Renders the grid, memoises win/draw
│       ├── Square.tsx       # Single cell — accessible button
│       ├── GameControls.tsx # Board size selector + New Game button
│       └── MoveHistory.tsx  # Scrollable history with time travel
│
├── utils/
│   └── calculateWinner.ts  # Pure win + draw logic, works for any NxN board
│
└── types/
    └── tictactoe.ts        # All shared TypeScript interfaces and types
```

---

## 🗺️ Roadmap

### ✅ Completed
- [x] Dynamic board size — 3×3, 4×4, 5×5
- [x] Win detection for any square board size
- [x] Draw detection
- [x] Move history with time travel
- [x] New Game button with full state reset
- [x] Board size validation and safe fallback
- [x] Full TypeScript types
- [x] Accessibility — aria labels, live regions, keyboard navigation
- [x] Three-column responsive layout
- [x] Mobile single-column stack
- [x] Deployed live on Vercel

### 🔜 Coming Soon
- [ ] AI opponent (Minimax algorithm)
- [ ] Score tracking across rounds
- [ ] Animated winning line drawn across the board
- [ ] Custom player names
- [ ] Local multiplayer on the same device

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org) — for the cleanest React framework experience
- [React Docs — Tic-Tac-Toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe) — the original tutorial this project is built on top of and beyond
- [MDN — CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) — essential for the responsive board scaling
- [Syne](https://fonts.google.com/specimen/Syne) & [Space Mono](https://fonts.google.com/specimen/Space+Mono) — for the display and symbol fonts via Google Fonts
- [Vercel](https://vercel.com) — for effortless deployment and hosting

---

## 🏃 Running Locally

### Prerequisites
- Node.js 18+
- pnpm, npm, or yarn

### 1. Clone the repo
```bash
git clone https://github.com/onyekaanene/tic-tac-toe.git
cd tic-tac-toe
npm install
```

### 2. Run the app
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

No environment variables or database setup needed — the app is entirely client-side.

---

## 🚢 Deployment

The app is deployed on **Vercel** with zero configuration. Push to `main` and it deploys automatically.

```bash
vercel --prod
```

---

## 👨‍💻 Author

**Built with ❤️ by Onyekachukwu Anene** — Software Engineer (Applied AI & SaaS) | Building AI-powered web & mobile products. Available for freelance and full-time opportunities.

[![GitHub](https://img.shields.io/badge/GitHub-onyekaanene-181717?style=flat&logo=github)](https://github.com/onyekaanene)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/onyekachukwu-anene)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-blue?style=flat)](https://www.onyekaanene.com/projects)

---

## 📄 License

MIT — feel free to fork, use, and build on this.
