import { Theme } from './theme';

export interface ICapsuleBox {
  capsuleBoxId?: number;
  theme: Theme;
  openedAt: string;
  closedAt: string;
  capsules: string[];
}

export enum MakeCapsuleStep {
  SelectColor = '캡슐함 색상 고르기',
  SetClosedDate = '캡슐함 봉인일자 설정',
  SetOpenedDate = '캡슐함 개봉일자 생성',
  Confirm = '캡슐함을 만드시겠습니까?',
}
