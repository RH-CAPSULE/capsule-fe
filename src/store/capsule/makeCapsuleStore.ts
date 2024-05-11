import { MakeCapsuleStep } from 'src/types/capsule';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  currentStep: MakeCapsuleStep;
  isMakeModalOpen: boolean;
}
interface Action {
  setCurrentStep: (currentStep: MakeCapsuleStep) => void;
  setIsMakeModalOpen: (isMakeModalOpen: boolean) => void;
}

const useMakeCapsuleStore = devtools<State & Action>((set) => ({
  // state
  isMakeModalOpen: false,
  currentStep: MakeCapsuleStep.SelectColor,
  // actions
  setCurrentStep: (currentStep) => set(() => ({ currentStep })),
  setIsMakeModalOpen: (isMakeModalOpen) => set(() => ({ isMakeModalOpen })),
}));

export default create(useMakeCapsuleStore);
