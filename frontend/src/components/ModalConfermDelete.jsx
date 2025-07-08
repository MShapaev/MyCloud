import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// КОМПОНЕНТ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ ФАЙЛА (модальное окно)
export default function ModalConfermDelete({ state, request, hide, delFocus, delElement, fileName }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Обработчик нажатия кнопки "Удалить"
  const handleDelete = async () => {
    const response = await request(state.onFocus);
    if (response.status === 204) {
      dispatch(delElement(state.onFocus));
      dispatch(delFocus());
      return dispatch(hide());
    }

    if (response.status === 403) {
      return navigate('/');
    }
  };
  
  // Обработчик нажатия кнопки "Отмена"
  const handleCancel = () => {
    dispatch(hide());
    dispatch(delFocus());
  };

  return (
    <div 
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center z-10 overflow-x-hidden"
    >
      <div 
        className="modal w-[300px] p-4 relative rounded-md bg-white box-border z-20 flex flex-col flex-wrap items-center text-center"
      >
        {fileName ? (
          <p>
            Файл <strong>"{fileName}"</strong> будет удален безвозвратно. <br /> Вы уверены?
          </p>
        ) : (
          <p>
            Аккфунт с id: <strong>{state.onFocus}</strong> будет удален безвозвратно. Вы уверены?
          </p>
        )}
        <div
          className="w-full mt-4 flex justify-around"
        >
          <button
            type="button"
            className="w-20 h-9  border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold"
            onClick={handleDelete}
          >
            Удалить
          </button>
          <button
            type="button"
            className="w-20 h-9  border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold"
            onClick={handleCancel}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
