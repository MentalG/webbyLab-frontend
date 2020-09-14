import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilmsData } from '../../store/selectors/films';
import { setModal, getFilms, addFilm } from '../../store/actions/films';
import {
  Button,
  Modal,
  Upload,
  message,
  Form,
  Input,
  Select,
  Space,
} from 'antd';
import {
  DownloadOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './styles.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const { isAddFilmOpen, isImportDataOpen } = useSelector(getFilmsData);
  const { Dragger } = Upload;
  const { Option } = Select;
  const [form] = Form.useForm();
  const type = 'primary';
  const size = 'large';

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

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const handleOk = (modal) => {
    dispatch(setModal(modal, false));
  };

  const handleSubmit = (target, bool) => {
    if (bool) {
      const values = form.getFieldsValue();

      dispatch(addFilm(values));
      dispatch(getFilms);
      form.resetFields();
    } else {
      form.resetFields();
      console.log(bool);
    }

    dispatch(setModal(target, false));
  };

  return (
    <div className='menu_container'>
      <Button
        type={type}
        icon={<DownloadOutlined />}
        size={size}
        value={'isAddFilmOpen'}
        onClick={(e) => dispatch(setModal(e.currentTarget.value, true))}
      >
        Add film
      </Button>
      <Modal
        title='Add film'
        visible={isAddFilmOpen}
        destroyOnClose={true}
        onOk={(e) => handleSubmit('isAddFilmOpen', true)}
        onCancel={(e) => handleSubmit('isAddFilmOpen', false)}
      >
        <Form {...layout} form={form} name='control-hooks'>
          <Form.Item name='title' label='Title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='releaseDate'
            label='Release Year'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='format' label='Format' rules={[{ required: true }]}>
            <Select
              placeholder='Select a option and change input text above'
              allowClear
            >
              <Option value='VHS'>VHS</Option>
              <Option value='DVD'>DVD</Option>
              <Option value='Blu-Ray'>Blu-Ray</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.format !== currentValues.format
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue('format') === 'other' ? (
                <Form.Item
                  name='customizeFormat'
                  label='Customize Format'
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.List name='stars'>
            {(fields, { add, remove }) => {
              return (
                <div style={{background: '#fff'}}>
                  <div className='space'></div>
                  <div>
                    {fields.map((field) => (
                      <Space key={field.key} align='start'>
                        <Form.Item
                          {...field}
                          name={[field.name, 'first']}
                          fieldKey={[field.fieldKey, 'first']}
                          rules={[
                            { required: true, message: 'Missing first name' },
                          ]}
                        >
                          <Input placeholder='First Name' />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, 'last']}
                          fieldKey={[field.fieldKey, 'last']}
                          rules={[
                            { required: true, message: 'Missing last name' },
                          ]}
                        >
                          <Input placeholder='Last Name' />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> Add field
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
      <Button
        type={type}
        icon={<DownloadOutlined />}
        size={size}
        value={'isImportDataOpen'}
        onClick={(e) => dispatch(setModal(e.currentTarget.value, true))}
      >
        Load data from file
      </Button>
      <Modal
        title='Import data'
        visible={isImportDataOpen}
        onOk={() => handleOk('isImportDataOpen')}
        onCancel={() => handleOk('isImportDataOpen')}
        destroyOnClose={true}
      >
        <Dragger {...draggerProps}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default Menu;
