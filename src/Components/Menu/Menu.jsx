import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilmsData } from '../../store/selectors/films';
import { setModal, getFilms, addFilm } from '../../store/actions/films';
import ModalWindow from '../ModalWindow';
import DragNDrop from '../DragNDrop';
import AddForm from '../AddForm';
import { Button, Form } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './styles.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const { isAddFilmOpen, isImportDataOpen } = useSelector(getFilmsData);
  const [form] = Form.useForm();
  const type = 'primary';
  const size = 'large';

  const closeHandler = (modal) => {
    dispatch(getFilms);
    dispatch(setModal(modal, false));
  };

  const submitHandler = (target, bool) => {
    if (bool) {
      const values = form.getFieldsValue();

      dispatch(addFilm(values));
      dispatch(getFilms);
      form.resetFields();
    } else {
      form.resetFields();
    }

    dispatch(getFilms);
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
      <ModalWindow
        title='Add film'
        onOk={() => submitHandler('isAddFilmOpen', true)}
        onCancel={() => submitHandler('isAddFilmOpen', false)}
        isVisible={isAddFilmOpen}
      >
        <AddForm form={form}/>
      </ModalWindow>
      <Button
        type={type}
        icon={<DownloadOutlined />}
        size={size}
        value={'isImportDataOpen'}
        onClick={(e) => dispatch(setModal(e.currentTarget.value, true))}
      >
        Load data from file
      </Button>
      <ModalWindow
        title='Import data'
        onOk={() => closeHandler('isImportDataOpen')}
        onCancel={() => closeHandler('isImportDataOpen')}
        isVisible={isImportDataOpen}
      >
        <DragNDrop />
      </ModalWindow>
    </div>
  );
};

export default Menu;
