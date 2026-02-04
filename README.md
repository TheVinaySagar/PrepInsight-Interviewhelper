# PrepInsight - AI Interview Assistant 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.4-38bdf8)

**PrepInsight** is a comprehensive interview preparation platform designed to help candidates share their interview experiences and practice with an advanced AI Assistant. Built with modern web technologies, it offers a seamless, aesthetic, and responsive user experience.

---

## ✨ Key Features

- **🧠 AI Interview Coach**: Interactive chat interface powered by Google Generative AI (Gemini) to simulate mock interviews and answer technical queries.
- **📝 Experience Sharing**: A community-driven repository where users can post, edit, and read detailed interview experiences from top companies.
- **🎨 Premium UI/UX**: Features a "Glassmorphism" design system, smooth **Framer Motion** animations, and a rich "Atmospheric Mesh" background.
- **🔐 Secure Authentication**: Robust user management using **Firebase Auth** (Google, GitHub, Email/Password).
- **🌓 Dark/Light Mode**: Fully responsive theme switching with persisted user preference.
- **⚡ Real-time Updates**: Instant feedback and dynamic content loading.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4, [Radix UI](https://www.radix-ui.com/) (Primitives), [Lucide React](https://lucide.dev/) (Icons)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Complex transitions & Backgrounds)
- **State Management**: React Context API & Hooks
- **Forms**: React Hook Form + Zod Validation
- **Authentication**: Firebase Authentication SDK
- **Backend API**: External REST API (Express/Node.js) on Render

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/PrepInsight.git
    cd PrepInsight
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your keys:

    ```env
    # API Configuration
    NEXT_PUBLIC_API_URL=https://your-api-url.com/api

    # Firebase Authentication
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages
│   ├── chat/             # AI Chat interface
│   ├── interviews/       # Interview browsing & details
│   ├── login/            # Authentication pages
│   └── layout.tsx        # Root layout with providers & background
├── components/           # Reusable UI components
│   ├── ui/               # Radix UI primitives (Button, Card, etc.)
│   ├── background-animation.tsx # Premium mesh gradient
│   └── chat-interface.tsx # Chat logic
├── lib/                  # Utilities & Context
│   ├── auth-context.tsx  # Authentication logic
│   └── firebase.ts       # Firebase initialization
├── styles/               # Global CSS & Tailwind layers
└── public/               # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Developed with ❤️ by Vinay Sagar*
