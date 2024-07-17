import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://[www.taskmaster.one') // Your Appwrite endpoint
  .setProject('6697024b001a339ea39a'); // Your Appwrite project ID

const account = new Account(client);

document.getElementById('google-signin-btn').addEventListener('click', function() {
  account.createOAuth2Session('google', 'http://localhost:3000/dashboard', 'http://localhost:3000/signup');
});
