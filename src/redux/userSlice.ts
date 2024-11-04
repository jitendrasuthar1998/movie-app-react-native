// Import necessary functions and types from Redux Toolkit and utilities for AsyncStorage
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getItem, setItem } from '../utils/AsyncStorage';

// Define User types and UserState structure
interface User {
  username: string;
  email: string;
  password: string;
}

interface CurrentUser {
  username: string;
  email: string;
}

interface UserState {
  users: User[]; // Array to store registered users
  isLoggedIn: boolean; // Flag to track if a user is logged in
  currentUser: CurrentUser | null; // Current logged-in user data
}

// Define the initial state for users and authentication
const initialState: UserState = {
  users: [],
  isLoggedIn: false,
  currentUser: null,
};

// Async thunk to load users list from AsyncStorage
export const loadUsers = createAsyncThunk('user/loadUsers', async () => {
  const storedUsers = await getItem('users'); // Retrieve users from storage
  return storedUsers ? storedUsers : []; // Return users or an empty array
});

// Async thunk to load current user data from AsyncStorage
export const loadCurrentUser = createAsyncThunk(
  'user/loadCurrentUser',
  async () => {
    const storedCurrentUser = await getItem('currentUser'); // Retrieve current user
    return storedCurrentUser ? storedCurrentUser : null; // Return user or null
  }
);

// Async thunk to load login state (whether a user is logged in)
export const loadUserLoginState = createAsyncThunk(
  'user/loadUserLoginState',
  async () => {
    const userLoggedIn = await getItem('isLoggedIn'); // Check login status
    return userLoggedIn ? true : false; // Return login status as boolean
  }
);

// Async thunk to save the updated users list to AsyncStorage
export const saveUsers = createAsyncThunk(
  'user/saveUsers',
  async (users: User[]) => {
    await setItem('users', users); // Save users to storage
  }
);

// Create the user slice containing actions and reducers for user management
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state for users
  reducers: {
    // Action for signing up a new user
    signUpUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload); // Add new user to users array
      setItem('users', state.users); // Save updated users list to storage
    },

    // Action for logging in a user
    loginUser: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      // Find user by email in users array
      const user = state.users.find((u) => u.email === action.payload.email);

      if (user && action.payload.password === user.password) {
        // If user found and password matches, set login state
        const { username } = user;
        const { email } = action.payload;
        state.isLoggedIn = true;
        state.currentUser = { username, email };
        setItem('currentUser', state.currentUser); // Save current user to storage
        setItem('isLoggedIn', true); // Save login status to storage
      } else {
        alert('Invalid email or password'); // Display error if login fails
      }
    },

    // Action for logging out a user
    logoutUser: (state) => {
      state.isLoggedIn = false; // Set login state to false
      state.currentUser = null; // Clear current user data
      setItem('currentUser', state.currentUser); // Remove current user from storage
      setItem('isLoggedIn', false); // Update login status in storage
    },
  },
  // Handle async actions in extra reducers
  extraReducers: (builder) => {
    // Load users into the state from AsyncStorage
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    // Load current user data into the state from AsyncStorage
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    // Load login state (isLoggedIn) from AsyncStorage
    builder.addCase(loadUserLoginState.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload;
    });
    // Handle save users action if needed
    builder.addCase(saveUsers.fulfilled, () => {
      // Successfully saved users to storage; no state change needed
    });
  },
});

// Export actions for use in components
export const { loginUser, logoutUser, signUpUser } = userSlice.actions;

// Export reducer to be used in the store configuration
export default userSlice.reducer;
