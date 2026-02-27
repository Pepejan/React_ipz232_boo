# 🎯 Emoji Match Game

A memory card-matching game built with React, TypeScript, and Zustand. Flip cards to find emoji pairs, track your moves and time, and beat your best score!

![Home Page](img/pct1.png)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [License](#license)
- [Author](#author)

---

## ✨ Features

- 🃏 Flip-card memory game with emoji themes (Animals, Food, Nature)
- ⚙️ Configurable game settings (pairs count 3–12, flip speed, theme)
- 👤 User profile with game history, best score, and average moves
- 🍪 GDPR-compliant cookie consent popup
- 📱 Responsive design (mobile-friendly)
- 💾 Persistent settings and game history via `localStorage`

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | ^18 | UI framework |
| TypeScript | ^5 | Type safety |
| Vite | ^5 | Build tool & dev server |
| Zustand | ^4 | State management |
| React Router DOM | ^6 | Client-side routing |
| React Hook Form | ^7 | Form handling |
| Yup | ^1 | Schema validation |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/emoji-match-game.git
cd emoji-match-game

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint on all source files |
| `npm run storybook` | Launch Storybook component explorer on port 6006 |
| `npm run build-storybook` | Build a static Storybook site |
| `npm run docs` | Generate JSDoc documentation (outputs to `docs/`) |
| `npm run license-check` | Run license-checker and save report to `license-report.txt` |

---

## ⚙️ Configuration

### Game Settings (persisted in localStorage)

| Setting | Default | Range | Description |
|---|---|---|---|
| `pairsCount` | `6` | 3 – 12 | Number of emoji pairs on the board |
| `flipSpeed` | `1000` | 500 – 3000 ms | How long a non-matched pair stays visible |
| `theme` | `animals` | animals / food / nature | Emoji theme set |

### Environment Variables

No environment variables are required for local development.

---

## 📁 Project Structure

```
emoji-match-game/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Grid.tsx
│   │   ├── Header.tsx
│   │   ├── Modal.tsx
│   │   ├── CookieBanner.tsx
│   │   ├── SettingsForm.tsx
│   │   └── WinModal.tsx
│   ├── constants/      # Static data (emoji themes)
│   ├── pages/          # Route-level page components
│   ├── store/          # Zustand state stores
│   ├── styles/         # Global & module CSS
│   └── utils/          # Utility functions & validation
├── stories/            # Storybook stories
├── docs/               # Generated JSDoc documentation
├── README.md
├── LICENSE
├── PRIVACY_POLICY.md
├── license-report.md
└── package.json
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Бондарчук Олександр**
- GitHub: [@Pepejan](https://github.com/Pepejan)
- Email: ipz232_boo@student.ztu.edu.ua

---

## 🔗 Links

- [Privacy Policy](./PRIVACY_POLICY.md)
- [License Report](./license-report.md)
- [Storybook](./storybook-static/index.html) *(after build)*
- [API Documentation](./docs/index.html) *(after `npm run docs`)*