import { Time } from 'src/types/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  // 타이머 종료 시간
  endAt: Time;
  isAuthenticated: boolean;
}
interface Action {
  setEndAt: (endAt: Time) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useEmailAuthStore = devtools<State & Action>((set) => ({
  // state
  endAt: null,
  isAuthenticated: false,
  // actions
  setEndAt: (endAt) => set(() => ({ endAt })),
  setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
}));

export default create(useEmailAuthStore);
