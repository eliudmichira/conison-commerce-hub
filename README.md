# Conison Commerce Hub

A fully-featured commerce and services platform for Conison Technologies.

## Features

- Modern UI with Tailwind CSS and Framer Motion animations
- Responsive design for all devices
- Dark mode support
- User authentication with Firebase
- Client portal with project tracking
- Quote request system
- Payment integration with Stripe
- Contact form with email notifications

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase account
- Stripe account (for payment processing)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/eliudmichira/conison-commerce-hub.git
cd conison-commerce-hub
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables (see `.env.example` for reference):

```
# Copy from .env.example and fill in your values
cp .env.example .env
```

4. Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

### Firebase Deployment

1. Login to Firebase:

```bash
firebase login
```

2. Initialize Firebase (if not already done):

```bash
firebase init
```

3. Build and deploy:

```bash
npm run deploy
```

For hosting only:

```bash
npm run deploy:hosting
```

### Environment Variables

Create a `.env` file with the following variables:

```
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=your-publishable-key

# Other Configuration
REACT_APP_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

## Project Structure

- `/public` - Static assets
- `/src` - Source code
  - `/api` - API service functions
  - `/components` - React components
  - `/context` - React context providers
  - `/pages` - Application pages
  - `/styles` - CSS styling files
  - `/utils` - Utility functions
  - `/firebase` - Firebase configuration

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Builds and deploys to Firebase
- `npm run deploy:hosting` - Builds and deploys only hosting to Firebase
- `npm run analyze` - Analyzes the bundle size

## Security Considerations

- Ensure Firebase rules are properly configured for production
- Do not commit `.env` files to version control
- Consider implementing rate limiting for API endpoints
- Use Firebase Authentication security features
- Follow Stripe best practices for payment security

## Performance Optimization

- Images have been optimized for web
- Code splitting implemented with React Router
- Lazy loading for components
- Caching with service workers
- Optimized CSS with Tailwind

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Proprietary. All rights reserved.

## Contact

Conison Technologies - [website](https://conison.com)

Project Link: [https://github.com/eliudmichira/conison-commerce-hub](https://github.com/eliudmichira/conison-commerce-hub) 