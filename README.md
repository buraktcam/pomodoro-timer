# Pomodoro Timer App

A Vue 3 Pomodoro Timer application with note-taking support. Notes are saved to the browser's `localStorage` by default.

## Features

- 🕒 Customizable Pomodoro timer (focus, break, and long break durations)
- ✍️ Note-taking during focus sessions
- 🔄 Auto-start options for breaks and focus sessions
- 🎵 Sound notifications when sessions end
- 📱 Responsive design for mobile and desktop
- 💾 Notes persist in the browser using `localStorage`

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

## Technologies Used

- Vue 3 (Composition API)
- Pinia for state management
- TailwindCSS for styling
- Optional Firebase/Firestore integration
- Vite for build tooling

## License

MIT 