// userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getItem, setItem } from '../utils/AsyncStorage';

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

const initialState: UserState = {
  users: [],
  isLoggedIn: false,
  currentUser: null,
};

// Async thunk for loading users from local storage
export const loadUsers = createAsyncThunk('user/loadUsers', async () => {
  const storedUsers = await getItem('users');
  return storedUsers ? storedUsers : [];
});

export const loadCurrentUser = createAsyncThunk(
  'user/loadCurrentUser',
  async () => {
    const storedCurrentUser = await getItem('currentUser');
    return storedCurrentUser ? storedCurrentUser : [];
  }
);

export const loadUserLoginState = createAsyncThunk(
  'user/loadUserLoginState',
  async () => {
    const userLoggedIn = await getItem('currentUser');
    console.log('user logged in in redux thunk', userLoggedIn);
    return userLoggedIn ? userLoggedIn : false;
  }
);

// Async thunk for saving users to local storage
export const saveUsers = createAsyncThunk(
  'user/saveUsers',
  async (users: User[]) => {
    await setItem('users', users);
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    signUpUser: (state, action: PayloadAction<User>) => {
      const { username, email, password } = action.payload;
      console.log('username: ' + username);
      console.log('email: ' + email);
      console.log('plainPassword: ' + password);
      // Encrypt the password

      // Create new user and add to users array
      const newUser = { username, email, password };
      state.users.push(newUser);

      setItem('users', state.users);
      // Save updated users array to local storage
    },
    loginUser: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const user = state.users.find((u) => u.email === action.payload.email);

      if (user && action.payload.password === user.password) {
        // Simple plain text comparison
        const username = user.username;
        const { email } = action.payload;
        state.isLoggedIn = true;
        state.currentUser = { username, email };
        setItem('currentUser', state.currentUser);
        setItem('isLoggedIn', true);
      } else {
        // Optionally handle login failure
        alert('Invalid email or password');
      }
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      setItem('currentUser', state.currentUser);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(loadUserLoginState.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload;
    });
    builder.addCase(saveUsers.fulfilled, () => {
      // Successfully saved users to local storage
    });
  },
});

// Actions and reducer export
export const { signup, loginUser, logoutUser, signUpUser } = userSlice.actions;
export default userSlice.reducer;
