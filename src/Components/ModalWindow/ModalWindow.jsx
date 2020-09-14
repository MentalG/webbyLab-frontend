import React from 'react';
import { Modal } from 'antd';

const ModalWindow = (props) => {
  const { title, onOk, onCancel, isVisible, children } = props;

  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      {children}
    </Modal>
  );
};

export default ModalWindow;
