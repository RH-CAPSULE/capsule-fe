import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUser } from '../types/auth';

interface State {
  user: IUser | null;
  isLoggedIn: boolean;
  isSignUp: boolean;
  isInitialized: boolean;
}
interface Action {
  setUser: (user: IUser) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsSignUp: (isLoggedIn: boolean) => void;
  setIsInitialized: (isInitialized: boolean) => void;
}

const useAuthStore = devtools<State & Action>((set) => ({
  // state
  user: null,
  isLoggedIn: false,
  isSignUp: false,
  isInitialized: false,
  // actions
  setUser: (user) => set(() => ({ user })),
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  setIsSignUp: (isSignUp) => set(() => ({ isSignUp })),
  setIsInitialized: (isInitialized) => set(() => ({ isInitialized })),
}));

export default create(useAuthStore);
