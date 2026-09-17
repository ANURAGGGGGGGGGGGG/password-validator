# Password Strength Checker

A real-time password strength validator built with React. Enter a password and instantly see its strength level, a color-coded meter, and a checklist of unmet requirements.

**Live Demo:** https://anuragggggggggggg.github.io/password-validator/

## Features

- **Real-time validation** — strength updates on every keystroke
- **Color-coded strength meter** — weak, fair, good, and strong levels with distinct colors
- **Requirement checklist** — each rule highlights as it's satisfied
- **Password visibility toggle** — show or hide the entered password
- **Dark mode** — toggle between light and dark themes
- **Responsive** — works on mobile and desktop
- **Accessible** — ARIA labels, keyboard focus indicators, reduced-motion support

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the development server |
| `npm run build` | Create a production build in `build/` |
| `npm test` | Run the test suite |
| `npm run deploy` | Deploy to GitHub Pages |

## Tech Stack

- **React 18** — UI framework
- **validator.js** — password strength checking
- **Plain CSS** — custom properties for design tokens, no CSS framework

## How It Works

The validator scores passwords on five criteria:

| Criterion | Requirement |
|-----------|-------------|
| Lowercase | At least 1 letter (a-z) |
| Uppercase | At least 1 letter (A-Z) |
| Digit | At least 1 number (0-9) |
| Symbol | At least 1 special character |
| Length | At least 8 characters |

A password is **strong** only when all five criteria are met. The meter and feedback message use intermediate levels (weak / fair / good) to reflect partial progress.

## Project Structure

```
src/
  Validator.jsx   # Single-component app — input, meter, requirements, theme toggle
  Validator.css   # All styles — design tokens, transitions, dark mode, responsive
  index.js        # React entry point
public/
  index.html      # HTML shell
```
