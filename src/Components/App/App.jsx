import React from 'react';
import Menu from '../Menu';
import Main from '../Main';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const App = () => {
  return (
    <div className='App'>
      <Layout>
        <Header>
          <Menu />
        </Header>
        <Content>
          <Main />
        </Content>
      </Layout>
    </div>
  );
};

export default App;
