import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAuBaZSpplHS20cSC6cywaX7JG4WG7MxSw' ,
  authDomain: 'post-webapi.firebaseapp.com' ,
  projectId: 'post-webapi' ,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

async function generateToken() {
  const email = 'test@test.com'; // Your test user email
  const password = '123456'; // Your test user password

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    console.log('ID Token:', idToken);
  } catch (error) {
    console.error('Error:', error);
  }
}

generateToken();
