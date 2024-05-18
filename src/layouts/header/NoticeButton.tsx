import React from 'react';
import { Modal } from 'src/components/modal';
import { IconBell } from 'src/assets/icons';
import { useNotice } from 'src/apis/queries/notice/notice';
import { Notice } from 'src/types';
import DOMPurify from 'dompurify';
import styles from './styles.module.scss';

const NoticeButton = () => {
  const [open, setOpen] = React.useState(false);

  const { data } = useNotice<Notice>({
    enabled: open,
  });

  const cleanHtml = DOMPurify.sanitize(data?.content || '');

  return (
    <>
      {/* Icon */}
      <IconBell onClick={() => setOpen(true)} />
      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.noticeModal}
      >
        <Modal.Title className={styles.title}>{data?.title}</Modal.Title>
        <Modal.Content className={styles.content}>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: cleanHtml,
            }}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default NoticeButton;
