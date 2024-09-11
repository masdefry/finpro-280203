import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;   
  address?: string; 
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: typeof window !== 'undefined' ? (() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return null;
      }
    }
    return null;
  })() : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    updateProfile(state, action: PayloadAction<{ phone?: string; address?: string }>) {
      if (state.user) {
        state.user.phone = action.payload.phone ?? state.user.phone;
        state.user.address = action.payload.address ?? state.user.address;

        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    rehydrate(state) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user && user !== 'undefined') {
        state.token = token;
        try {
          state.user = JSON.parse(user);
        } catch (error) {
          console.error("Failed to parse user during rehydrate:", error);
        }
      }
    },
  },
});

export const { loginSuccess, updateProfile, logout, rehydrate } = authSlice.actions;
export default authSlice.reducer;
