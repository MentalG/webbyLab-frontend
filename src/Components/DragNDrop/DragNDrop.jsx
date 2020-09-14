import React from 'react';
import { useDispatch } from 'react-redux';
import { getFilms, setModal } from '../../store/actions/films'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const DragNDrop = () => {
  const dispatch = useDispatch();
  const { Dragger } = Upload;

  const draggerProps = {
    name: 'file',
    multiple: false,
    accept: '.txt',
    action: 'http://localhost:5000/films/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        dispatch(getFilms);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        dispatch(setModal('isImportDataOpen', false));
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...draggerProps}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
};

export default DragNDrop;
