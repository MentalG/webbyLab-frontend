import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './styles.scss'

const Menu = () => {
    const type = 'primary'
    const size = 'large'

  return (
    <div className='menu_container'>
      <Button type={type} icon={<DownloadOutlined />} size={size}>
        Add film
      </Button>
      <Button type={type} icon={<DownloadOutlined />} size={size}>
        Load data from file
      </Button>
    </div>
  );
};

export default Menu;
