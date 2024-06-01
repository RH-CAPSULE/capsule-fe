import { LetterType } from './letter';
import { ThemeType } from './theme';
import { Union } from './union';

export interface ICapsuleBox {
  capsuleBoxId?: number;
  theme: ThemeType;
  openedAt: string;
  closedAt: string;
  capsules: string[];
  hasMyCapsule?: boolean;
}

// MakeCapsuleStep Type assertion
export const MakeCapsuleStep = {
  SelectColor: '캡슐함 색상 고르기',
  SetClosedDate: '캡슐함 봉인일자 설정',
  SetOpenedDate: '캡슐함 개봉일자 생성',
  Confirm: '캡슐함을 만드시겠습니까?',
} as const;

export type MakeCapsuleStepType = Union<typeof MakeCapsuleStep>;

export interface ICapsule {
  capsuleId: number;
  color: string;
  theme: LetterType;
  title: string;
  content: string;
  writer: string;
  imageUrl: string;
  audioUrl: string;
  isMine: boolean;
  createdAt: string;
}
