# Pomodoro Timer App

A Vue 3 Pomodoro Timer application with Firebase integration for note-taking.

## Features

- 🕒 Customizable Pomodoro timer (focus, break, and long break durations)
- ✍️ Note-taking during focus sessions
- 🔄 Auto-start options for breaks and focus sessions
- 🎵 Sound notifications when sessions end
- 📱 Responsive design for mobile and desktop
- 💾 Cloud storage for notes using Firebase

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project and enable Firestore
4. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Update the Firebase configuration in `src/firebase/config.js` with your environment variables

6. Run the development server:
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
- Firebase/Firestore for data storage
- Vite for build tooling

## License

MIT 