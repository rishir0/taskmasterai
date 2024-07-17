import { account} from './appwrite'

// Load the Google API client library
function loadAuth() {
    gapi.load('auth2', initAuth);
  }
  
  // Initialize the Google API client library
  function initAuth() {
    gapi.auth2.init({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      scope: 'profile email'
    }).then(() => {
      attachSignin(document.getElementById('google-signin-btn'));
    });
  }
  
  // Attach the click event to the Google Sign-In button
  function attachSignin(element) {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        // User successfully signed in
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
        // Perform any additional steps here, such as sending the user data to your server
        // For example, send the ID token to your server
        const id_token = googleUser.getAuthResponse().id_token;
        console.log('ID Token: ' + id_token);
        // You can send this ID token to your backend for verification
      },
      (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
  
  // Load the auth script dynamically
  (function() {
    const po = document.createElement('script');
    po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js?onload=loadAuth';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  })();
  