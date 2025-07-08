import ButtonFooterCardFiles from './ButtonFooterCardFiles';
import appData from '../app/appData';
import { useDispatch, useSelector } from 'react-redux';
import { showChange, showDeleteConfirm, showMessage, showShareURL } from '../slices/cloudSlice';
import { useRef } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { cangeDataCard } from '../slices/adminSlice';
import { getFileAdmin, sendFilesAdmin } from '../app/adminApiRequests';

export default function FooterCardFiles() {
  const cloudState = useSelector((state) => state.cloud);
  const adminState = useSelector((state) => state.admin);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Обработчики нажатия кнопок
  const buttonHandlers = {
    'Скачать': () => cloudState.onFocus ? handleSaveFile(getFileAdmin) : dispatch(showMessage()),
    'Поделиться': () => cloudState.onFocus ? dispatch(showShareURL()) : dispatch(showMessage()),
    'Загрузить': () => fileRef.current.click(),
    'Удалить': () => cloudState.onFocus ? dispatch(showDeleteConfirm()) : dispatch(showMessage()),
    'Изменить': () => cloudState.onFocus ? dispatch(showChange()) : dispatch(showMessage()),
  };

  // Обработчик сохранения(скачки) файла на клиенте
  const handleSaveFile = async (f) => {
    const fileName = adminState.card.files?.filter((f) => f.id === Number(cloudState.onFocus))[0]['name'];
    const response = await f(cloudState.onFocus, fileName);
    if (response) {
      return navigate('/');
    }
    return;
  }

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const formData = new FormData();
      for (const file of e.target.files) {
        formData.append('file', file);
        // Проверка дублирования имен файлов
        if (adminState.card.files.map((el) => el.name).includes(file.name)) {
          formData.append('name', file.name.replace(/^([^.]+)$|(\.[^.]+)$/i, '$1_copy_$2'))
        } else {
          formData.append('name', file.name);
        }
        formData.append('size', file.size);
        formData.append('user', adminState.card.id);
      }

      const response = await sendFilesAdmin(formData, adminState.card.id);
      if (response.error) {
        e.target.value = "";
        return navigate('/');
      }
      e.target.value = "";
      return dispatch(cangeDataCard(response));
    }
    return
  };

  return (
    <>
      <div
        className='w-full py-4 mb-6 flex justify-between'
      >
        {Object.keys(appData.fileButtons).map((btnName, index) => (
            <ButtonFooterCardFiles 
              key={index}
              btnName={btnName}
              onClick={buttonHandlers[btnName]}
            />
        ))}
      </div>
      <Form
        method='post'
      >
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => handleFileChange(e)}
          multiple
          hidden
        />
      </Form>
    </>
  );
}
