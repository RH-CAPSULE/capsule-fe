import { WRITE_HISTORY_KEY } from 'src/static';
import localStorageAvailable from './localStorageAvailable';

export const addCapsuleHistory = (capsuleBoxId: number) => {
  if (!localStorageAvailable()) return;

  // 내가 쓴 캡슐들
  const writeHistory = localStorage.getItem(WRITE_HISTORY_KEY!);
  const writeHistoryArray = writeHistory ? JSON.parse(writeHistory) : [];

  // 새로운 캡슐 추가
  const newWriteHistory = [...writeHistoryArray, capsuleBoxId];
  localStorage.setItem(WRITE_HISTORY_KEY!, JSON.stringify(newWriteHistory));
};

export const isWriteCapsule = (capsuleBoxId: number) => {
  if (!localStorageAvailable()) return false;

  // 내가 쓴 캡슐들
  const writeHistory = localStorage.getItem(WRITE_HISTORY_KEY!);
  const writeHistoryArray = writeHistory ? JSON.parse(writeHistory) : [];

  return writeHistoryArray.includes(capsuleBoxId);
};
