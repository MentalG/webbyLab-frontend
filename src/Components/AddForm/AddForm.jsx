import React from 'react';
import { Button, Form, Input, Select, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddForm = ({ form }) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const { Option } = Select;

  return (
    <Form {...layout} form={form} name='control-hooks'>
      <Form.Item name='title' label='Title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='releaseDate'
        label='Release Year'
        rules={[{ required: true }]}
      >
        <InputNumber min={1000} max={2020} />
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
            <div style={{ background: '#fff' }}>
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
                      rules={[{ required: true, message: 'Missing last name' }]}
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
  );
};

export default AddForm;
