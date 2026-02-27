# Copilot Instructions

## Project Overview

Diceless is a dice roller web application with a toolkit for visualizing the probabilities of rolls. It is built with React and TypeScript and runs entirely on the client side (no backend).

Users write dice expressions such as `2d6+3d8+4`, roll them, and see statistics (sum, average, highest, lowest, probability) along with detailed distribution graphs.

## Tech Stack

- **React 16** with **TypeScript**
- **TSLint** for linting (extends `tslint:recommended`, `tslint-react`, `tslint-config-prettier`)
- **Jest** for unit testing (via `react-scripts-ts`)
- **Storybook** for component development and visual testing
- **Docker** for containerized deployment

## Project Structure

- `src/Library/` – Core business logic (dice, distributions, pools, statistics). All non-component code lives here and must be unit tested.
- `src/Components/` – Reusable React UI components.
- `src/Containers/` – React container components that wire up state and logic.
- `Stories/` – Storybook stories for visual component testing.

## Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm start

# Run unit tests
npm test

# Build for production
npm run build

# Run Storybook (port 6006)
npm run storybook
```

## Code Conventions

- All library/utility code in `src/Library/` must have corresponding unit tests (`.test.tsx` files).
- Follow the existing TSLint configuration (`tslint.json`). Key rules:
  - `variable-name`: leading underscores are allowed
  - `jsx-no-lambda`: disabled (lambdas in JSX are allowed)
- TypeScript strict mode is enabled: `noImplicitAny`, `strictNullChecks`, `noImplicitReturns`, `noUnusedLocals`.
- Component files use `.tsx` extension; pure logic files also use `.tsx` for consistency with the existing codebase.
- Use `chance` for random number generation in tests.
