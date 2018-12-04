import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyCqEN7JHnqqHFqRE6Tc0mAgAQ1KyoCgSHo",
  authDomain: "test-pirates-b5b9a.firebaseapp.com",
  databaseURL: "https://test-pirates-b5b9a.firebaseio.com",
  projectId: "test-pirates-b5b9a",
  storageBucket: "test-pirates-b5b9a.appspot.com",
  messagingSenderId: "758151016053"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;