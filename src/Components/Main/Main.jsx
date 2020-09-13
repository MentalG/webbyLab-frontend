import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const stars = [
  'Mel Brooks',
  'Clevon Little',
  'Harvey Korman',
  'Gene Wilder',
  'Slim Pickens',
  'Madeline Kahn',
];

const data = [
  {
    id: '1',
    key: '1',
    name: 'John Brown',
    releaseDate: 32,
    format: 'VHS',
    stars: stars.map((star) => <span>{star}, </span>),
  },
  {
    id: '2',
    key: '2',
    name: 'Joe Black',
    releaseDate: 32,
    format: 'VHS',
    stars: stars.map((star) => <span>{star}, </span>),
  },
  {
    id: '3',
    key: '3',
    name: 'Jim Green',
    releaseDate: 32,
    format: 'VHS',
    stars: stars.map((star) => <span>{star}, </span>),
  },
  {
    id: '4',
    key: '4',
    name: 'Jim Red',
    releaseDate: 32,
    format: 'VHS',
    stars: stars.map((star) => <span>{star}, </span>),
  },
];

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Release date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Format',
      dataIndex: 'format',
      key: 'format',
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
      ...getColumnSearchProps('name'),
    },
  ];

  return <Table columns={columns} dataSource={data} tableLayout={'fixed'} pagination={false}/>;
};

export default Main;
