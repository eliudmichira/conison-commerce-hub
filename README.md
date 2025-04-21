# Conison Commerce Hub

A modern e-commerce application built with React and Firebase.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Deploying to Firebase](#deploying-to-firebase)
- [Firebase Features Used](#firebase-features-used)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)
- A Firebase account and project

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd conison-commerce-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ``` xvcvc

3. Set up Firebase configuration:
   - Create a `.env` file in the root directory with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

## Running Locally

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

To build the app for production:

```bash
npm run build
```

This generates a production-ready build in the `build` directory, optimized for best performance.

## Deploying to Firebase

1. Log in to Firebase (if not already logged in):
   ```bash
   firebase login
   ```

2. Initialize Firebase in your project (if not already initialized):
   ```bash
   firebase init
   ```
   - Select the Firebase services you want to use (Hosting, Firestore, Functions, etc.)
   - Select your Firebase project
   - Specify `build` as your public directory
   - Configure as a single-page app (answer "y" to "Configure as a single-page app")
   - Do not overwrite existing files if prompted

3. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

4. To deploy only specific services:
   ```bash
   firebase deploy --only hosting   # Deploy just the hosting
   firebase deploy --only functions  # Deploy just the Cloud Functions
   ```

## Firebase Features Used

This project uses several Firebase services:
- **Hosting**: For deploying and hosting the web application
- **Authentication**: For user authentication
- **Firestore**: For database storage
- **Cloud Functions**: For serverless backend functionality
- **Storage**: For storing user-uploaded files

## Project Structure

- `/src` - React application source code
- `/public` - Static files
- `/functions` - Firebase Cloud Functions
- `/build` - Production build (generated)

## Troubleshooting

### Common Issues

1. **Firebase deployment fails**:
   - Ensure you have sufficient permissions for the Firebase project
   - Verify your Firebase CLI is up to date: `npm install -g firebase-tools`

2. **Build errors**:
   - Check for syntax errors in your code
   - Ensure all dependencies are installed: `npm install`

3. **Firebase Functions not deploying**:
   - Check Node.js version compatibility (Firebase requires Node.js 14 or 16)
   - Install dependencies in the functions directory: `cd functions && npm install`

For additional help, please refer to the [Firebase documentation](https://firebase.google.com/docs) or open an issue in the repository. 