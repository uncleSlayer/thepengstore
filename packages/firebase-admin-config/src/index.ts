// Import Firebase Admin SDK
import * as admin from 'firebase-admin';

// Import path module
import path from 'path';

// Get the path to the service account key file
const keyPath = path.resolve(__dirname, './firebase.json');

// Initialize Firebase app with the service account key
export const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(keyPath)
});

// Get Firebase Auth service
export const auth = admin.auth();
