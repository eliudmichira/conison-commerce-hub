# Firebase Security Rules Guide

Copy and paste these rules in your Firebase console at:
https://console.firebase.google.com/project/[YOUR-PROJECT-ID]/firestore/rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Basic function to check if user is authenticated
    function isAuth() {
      return request.auth != null;
    }
    
    // Check if user is an admin
    function isAdmin() {
      return isAuth() && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Check if user is accessing their own data
    function isUser(userId) {
      return isAuth() && request.auth.uid == userId;
    }
    
    // Allow admins to read/write all collections
    match /{document=**} {
      allow read, write: if isAdmin();
    }
    
    // Users collection - more detailed permissions
    match /users/{userId} {
      // Users can read their own data
      allow read: if isUser(userId);
      
      // Only admins can create or update users (except own profile)
      allow create, update: if isAdmin() || isUser(userId);
      
      // Only admins can delete users
      allow delete: if isAdmin();
    }
    
    // Quotes collection - client access
    match /quotes/{quoteId} {
      // Clients can read their own quotes
      allow read: if isAuth() && resource.data.userId == request.auth.uid;
      
      // Clients can create quotes
      allow create: if isAuth() && request.resource.data.userId == request.auth.uid;
      
      // Only admins can update or delete quotes
      allow update, delete: if isAdmin();
    }
    
    // Projects collection
    match /projects/{projectId} {
      // Clients can read their own projects
      allow read: if isAuth() && resource.data.userId == request.auth.uid;
      
      // Only admins can create, update or delete projects
      allow create, update, delete: if isAdmin();
    }
    
    // Payments collection
    match /payments/{paymentId} {
      // Clients can read their own payments
      allow read: if isAuth() && resource.data.userId == request.auth.uid;
      
      // Clients can create payments
      allow create: if isAuth() && request.resource.data.userId == request.auth.uid;
      
      // Only admins can update or delete payments
      allow update, delete: if isAdmin();
    }
    
    // Settings can only be managed by admins
    match /settings/{document=**} {
      allow read: if isAuth();
      allow write: if isAdmin();
    }
    
    // Test collection for diagnostics
    match /test-collection/{docId} {
      allow read, write: if isAuth();
    }
  }
}
```

## How to Apply These Rules

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on "Firestore Database" in the left sidebar
4. Click on the "Rules" tab
5. Delete the existing rules
6. Copy and paste the rules above
7. Click "Publish"

## Important Notes

- These rules allow admins to read and write all collections
- Users can only read and write their own data
- The rules include special permissions for quotes, projects, and payments
- There's a diagnostic collection (`test-collection`) that authenticated users can access for testing 