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
  users: User[];
  isLoggedIn: boolean;
  currentUser: CurrentUser | null;
}

// Define the initial state for users and authentication
const initialState: UserState = {
  users: [],
  isLoggedIn: false,
  currentUser: null,
};

// Async thunk to load users list from AsyncStorage
export const loadUsers = createAsyncThunk('user/loadUsers', async () => {
  const storedUsers = await getItem('users');
  return storedUsers ? storedUsers : [];
});

// Async thunk to load current user data from AsyncStorage
export const loadCurrentUser = createAsyncThunk(
  'user/loadCurrentUser',
  async () => {
    const storedCurrentUser = await getItem('currentUser');
    return storedCurrentUser ? storedCurrentUser : null;
  }
);

// Async thunk to load login state (whether a user is logged in)
export const loadUserLoginState = createAsyncThunk(
  'user/loadUserLoginState',
  async () => {
    const userLoggedIn = await getItem('isLoggedIn');
    return userLoggedIn ? true : false;
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
  name: 'user',
  initialState,
  reducers: {
    signUpUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      setItem('users', state.users);
    },

    loginUser: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const user = state.users.find((u) => u.email === action.payload.email);

      if (user && action.payload.password === user.password) {
        const { username } = user;
        const { email } = action.payload;
        state.isLoggedIn = true;
        state.currentUser = { username, email };
        alert('Login successful');
        setItem('currentUser', state.currentUser);
        setItem('isLoggedIn', true);
      } else {
        alert('Invalid email or password');
      }
    },

    // Action for logging out a user
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      setItem('currentUser', state.currentUser);
      setItem('isLoggedIn', false);
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
