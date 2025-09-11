# DevCook Authentication App

A modern authentication application built with Next.js 15 and Clerk, featuring GitHub and Google OAuth integration with a sleek dark UI design.

## 🚀 Features

- **OAuth Authentication**: Sign in with GitHub and Google
- **Protected Routes**: Secure dashboard with middleware protection
- **Modern UI**: Dark theme with animated components and video backgrounds
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Authentication**: Instant authentication state management
- **Skeleton Loading**: Smooth loading states for better UX
- **SSO Callback Handling**: Seamless OAuth redirect management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk (@clerk/nextjs)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- A Clerk account and application set up
- GitHub OAuth app configured
- Google OAuth app configured

## ⚙️ Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication Configuration
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   
   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Set up Clerk Dashboard**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application
   - Enable GitHub and Google OAuth providers
   - Copy your publishable and secret keys to `.env.local`

## 🚀 Getting Started

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Test the authentication flow**
   - Try accessing `/dashboard` (should redirect to sign-in)
   - Sign in with GitHub or Google
   - Access the protected dashboard

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/          # Protected dashboard page
│   ├── sign-in/           # Authentication pages
│   ├── sso-callback/      # OAuth callback handler
│   ├── layout.tsx         # Root layout with ClerkProvider
│   └── page.tsx           # Home page with auth routing
├── components/
│   ├── CustomSignIn.tsx   # Custom sign-in component
│   └── ParticleText.tsx   # Animated text component
├── assets/                # Images and media files
└── middleware.ts          # Route protection middleware
```

## 🔐 Authentication Flow

1. **Unauthenticated Access**: Users are redirected to `/sign-in`
2. **OAuth Sign-in**: Users can sign in with GitHub or Google
3. **SSO Callback**: OAuth providers redirect to `/sso-callback`
4. **Dashboard Access**: Authenticated users access `/dashboard`
5. **Route Protection**: Middleware protects all `/dashboard` routes

## 🎨 UI Components

- **Video Backgrounds**: Immersive video backgrounds on sign-in page
- **Particle Animation**: Animated "DevCook" text with particle effects
- **Skeleton Loading**: Loading states for video content
- **Responsive Design**: Mobile and desktop optimized layouts
- **Dark Theme**: Consistent dark UI with proper contrast

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

1. Build the application: `npm run build`
2. Upload the `.next` folder and other necessary files
3. Set environment variables
4. Start with `npm run start`

## 🔒 Security Features

- **Middleware Protection**: Server-side route protection
- **Client-side Guards**: Additional authentication checks
- **Secure Redirects**: Proper OAuth callback handling
- **Environment Variables**: Sensitive data protection

## 🐛 Troubleshooting

**Authentication not working?**
- Check your Clerk keys in `.env.local`
- Verify OAuth providers are enabled in Clerk dashboard
- Ensure redirect URLs match your domain

**Middleware not protecting routes?**
- Check middleware.ts configuration
- Verify route matchers are correct
- Check console logs for debugging info

**Styling issues?**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Verify responsive breakpoints

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js and Clerk**
