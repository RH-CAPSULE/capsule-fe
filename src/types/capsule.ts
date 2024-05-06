import { Theme } from './theme';

export interface ICapsuleBox {
  capsuleBoxId?: number;
  theme: Theme;
  openedAt: string;
  closedAt: string;
  capsules: string[];
}
