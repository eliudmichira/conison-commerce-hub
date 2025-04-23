# Conison Commerce Hub

A modern e-commerce and client management platform for digital services.

## Features

- Client portal for managing quotes, projects, and payments
- Administrative dashboard for managing clients and services
- Quote request and processing system
- Secure payment processing with Paystack
- Comprehensive project tracking
- Responsive design for all devices

## Technology Stack

- React.js for the frontend
- Firebase for authentication and database
- Tailwind CSS for styling
- Paystack for payment processing
- Framer Motion for animations
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- Firebase account
- Paystack account (for payment processing)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/conison-commerce-hub.git
   cd conison-commerce-hub
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your API keys and configuration.

5. Start the development server:
   ```
   npm start
   ```

## Production Deployment

### Environment Setup

Before deploying to production, you must set up your environment variables. Create a `.env.production` file with the following variables:

```
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# Payment Processing
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_live_your_paystack_key

# API Configuration
REACT_APP_API_URL=https://api.yourcompany.com/v1
```

### Building for Production

1. Build the application:
   ```
   npm run build
   ```

2. The build artifacts will be stored in the `build/` directory.

### Deployment Options

#### Firebase Hosting

1. Install Firebase CLI:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Initialize Firebase:
   ```
   firebase init
   ```
   - Select "Hosting"
   - Select your Firebase project
   - Set public directory to "build"
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys: Optional

4. Deploy to Firebase:
   ```
   firebase deploy
   ```

#### Vercel

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

#### Netlify

1. Install Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```
   netlify deploy
   ```

### Custom Domain Setup

After deploying, you can set up a custom domain:

1. On Firebase Hosting:
   - Go to Firebase Console > Hosting
   - Click "Add custom domain"
   - Follow the instructions to verify domain ownership

2. On Vercel:
   - Go to Vercel Dashboard > Your Project > Settings > Domains
   - Add your domain and follow DNS setup instructions

3. On Netlify:
   - Go to Netlify Dashboard > Your Site > Domain Management
   - Click "Add custom domain"

## Security Considerations

- Never commit API keys to source control
- Use environment variables for sensitive configuration
- Ensure Firestore rules are properly configured to restrict data access
- Use Firebase Authentication for user authentication
- Enable Google Cloud Security features for your Firebase project

## Performance Optimization

- Images are optimized and properly sized
- Code splitting is implemented for faster loading
- Lazy loading is used for non-critical components
- Caching strategies are implemented for frequently accessed data

## Browser Support

The application supports:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest version)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please contact:
- Email: support@conison.com
- Website: https://conison.com 