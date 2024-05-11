import React from 'react';

const useOTP = () => {
  const [code, setCode] = React.useState(['', '', '', '']);

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const onOTPChange = (e: any, index: number) => {
    let { value } = e.target;

    // 숫자가 아니거나
    if (Number.isNaN(Number(value))) {
      return;
    }
    // 길이가 1을 초과하면 값 변경
    if (value.length > 1) {
      value %= 10;
    }

    const newOTP = [...code];
    newOTP[index] = value;
    setCode(newOTP);

    if (value !== '' && index < code.length - 1) {
      // 입력하면 다음 칸으로 포커스 이동
      inputRefs.current[index + 1]?.focus();
    }
    // 마지막꺼 입력하면 키보드 숨김 처리 + 입력값이 있어야 함.
    if (index === code.length - 1 && value) {
      e.target.blur();
    }
  };

  const onKeyDown = (event: any, index: number) => {
    const {
      keyCode,
      target: { value },
    } = event;

    if (keyCode === 8 && !value) {
      const newOTP = [...code];
      newOTP[index - 1] = '';
      setCode(newOTP);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return {
    code,
    inputRefs,
    onOTPChange,
    onKeyDown,
  };
};

export default useOTP;
