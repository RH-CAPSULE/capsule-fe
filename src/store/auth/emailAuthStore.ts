import { Time } from 'src/types/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  // 타이머 종료 시간
  endAt: Time;
  isAuthenticated: boolean;
  userEmail: string;
}
interface Action {
  setEndAt: (endAt: Time) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserEmail: (email: string) => void;
}

const useEmailAuthStore = devtools<State & Action>((set) => ({
  // state
  endAt: null,
  isAuthenticated: false,
  userEmail: '',
  // actions
  setEndAt: (endAt) => set(() => ({ endAt })),
  setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
  setUserEmail: (email) => set({ userEmail: email }),
}));

export default create(useEmailAuthStore);
