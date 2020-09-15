import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmsData } from '../../store/selectors/films';
import { getFilms, eraseFilm } from '../../store/actions/films';
import { dumpFilm } from '../../utils/dumpFilms';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './styles.scss'

const Main = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { films, loading } = useSelector(getFilmsData);
  const dumpData = films.map(item => dumpFilm(item));
  let searchInput;

  useEffect(() => {
    dispatch(getFilms);
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleDelete = (e, record) => {
    const { id } = record

    dispatch(eraseFilm(id))
    dispatch(getFilms)
  }

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
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
      ...getColumnSearchProps('stars'),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: record => <a href='/' onClick={(e) => handleDelete(e, record)}>Delete</a>,
    },
  ];

  return (
    <Table
    loading={loading}
    columns={columns}
    dataSource={dumpData}
    tableLayout={'fixed'}
    />
  );
};

export default Main;
