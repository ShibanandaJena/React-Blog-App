import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    // Initialize Appwrite client
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Create a new account and automatically log the user in
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error('Error creating account:', error.message);
      throw error;
    }
  }

  // Login user using email and password
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password); // Confirm this method exists
      return session; // Return session data if successful
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error;
    }
  }

  // Get current authenticated user
  async getCurrentUser() {
    try {
      return await this.account.get(); // Returns the current session user
    } catch (error) {
      console.error('Appwrite service :: getCurrentUser :: error', error.message);
      return null; // Return null if the user is not logged in or an error occurs
    }
  }

  // Logout user and delete all sessions
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error('Appwrite service :: logout :: error', error.message);
      throw error;
    }
  }
}

// Create an instance of the AuthService to export
const authService = new AuthService();
export default authService;
