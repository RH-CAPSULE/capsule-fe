import { handleAlert, handleConfirm } from 'react-handle-alert';
import { px } from './styles';

export const onAlert = (message: string) => {
  handleAlert(message, {
    style: {},
  });
};

export const onConfirm = async (message: string) => {
  return handleConfirm(
    <p
      style={{
        padding: px(20),
        color: '#4e4e4e',
        fontWeight: 600,
      }}
    >
      {message}
    </p>,
    {
      buttonGroupStyle: {
        width: '100%',
        display: 'flex',
      },
      cancelButton: {
        text: '아니요',
        style: {
          flex: 1,
          textAlign: 'center',
          color: '#757575',
          borderColor: 'transparent',
          boxShadow: `0 0 ${px(8)} 0 rgba(0, 0, 0, 0.08)`,
          fontFamily: 'inherit',
        },
      },
      confirmButton: {
        text: '네',
        style: {
          flex: 1,
          textAlign: 'center',
          backgroundColor: '#59d4c7',
          fontFamily: 'inherit',
        },
      },
    }
  );
};
