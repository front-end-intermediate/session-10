var Rebase = require('re-base');
var firebase = require('firebase/app');
var database = require('firebase/database');

const base = Rebase.createClass({
  apiKey: "AIzaSyCqEN7JHnqqHFqRE6Tc0mAgAQ1KyoCgSHo",
  authDomain: "test-pirates-b5b9a.firebaseapp.com",
  databaseURL: "https://test-pirates-b5b9a.firebaseio.com",
  projectId: "test-pirates-b5b9a",
  storageBucket: "test-pirates-b5b9a.appspot.com",
  messagingSenderId: "758151016053"
});



export default base;