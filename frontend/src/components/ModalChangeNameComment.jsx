import { useDispatch, useSelector } from 'react-redux';
import { deleteFocusOnFile, hideChange } from '../slices/cloudSlice';
import { useState } from 'react';
import { showMsg } from '../app/helpers';
import { useNavigate } from 'react-router-dom';


// КОМПОНЕНТ МОДАЛЬНОГО ОКНА ИЗМЕНЕНИЙ ИМЕНИ ФАЙЛА, КОММЕНТАРИЯ
export default function ModalChangeNameComment({ request, files, saveChanges }) {
  const navigate =useNavigate();
  const [message, setMessage] = useState(false);
  const cloudState = useSelector((state) => state.cloud);
  const dispatch = useDispatch();

  // Обработчик нажатия кнопки "отмена"
  const handleCancel = () => {
    dispatch(hideChange());
    dispatch(deleteFocusOnFile());
  };

  // Обработчики нажатия кнопки добавить/изменить
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Валидация имени файла
    if (data.name.trim() === '') {
      return showMsg('Введите имя файла', 3000, setMessage);
    }
    // Запрос на изменение
    const response = await request(cloudState.onFocus, data);
    // Обработка контролируемых ошибок
    if ('error' in response) {
      return navigate('/');
    }
    
    dispatch(hideChange());
    dispatch(deleteFocusOnFile());
    return dispatch(saveChanges(response));
  };

  return (
    <div 
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center z-10 overflow-x-hidden"
    >
      <div 
        className="modal w-[60vw] lg:w-[40vw] min-h-1/2 p-4 relative rounded-md bg-white box-border z-20 flex flex-col justify-center items-center text-center"
      >
        <p
          className="text-red-700 h-4 mb-2 mt-2 text-center text-sm font-bold"
        >
          {message? message : ''}
        </p>
        <form
          className="w-4/5 min-h-16 mb-4 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="change_filename"
            className='w-full py-1 h-6 text-xs font-sans font-bold'
          >
            Имя файла
          </label>
          <input
            id="change_filename"
            name="name"
            defaultValue={files?.filter((f) => f.id === Number(cloudState.onFocus))[0]['name']}
            className="w-full h-9 mb-4 px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400"
          >
          </input>
          <label
            htmlFor="change_comment"
            className='w-full py-1 h-6 text-xs font-sans font-bold'
          >
            Комментарий
          </label>
          <textarea 
            id="change_comment"
            name="comment"
            defaultValue={files?.filter((f) => f.id === Number(cloudState.onFocus))[0]['comment']}
            className="w-full min-h-9 px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400 resize-none"
          >
          </textarea>

          <div
            className="w-full mt-6 flex justify-around"
          >
            <button
              type="submit"
              className="w-20 h-9  border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold"
            >
              Изменить
            </button>
            <button
              type="button"
              className="w-20 h-9  border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold"
              onClick={handleCancel}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
