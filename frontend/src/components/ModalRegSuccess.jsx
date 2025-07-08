import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { incorrectPassword } from '../slices/appSlice';

//КОМПОНЕНТ ОПОВЕЩЕНИЯ ОБ УСПЕШНОЙ РЕГИСТРАЦИИ(модальное окно)
export default function ModalRegSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Обработчик нажатия кнопки "Ок"
  const handleClick = () => {
    dispatch(incorrectPassword());
    return navigate('/');
  };

  return (
    <div 
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center z-10 overflow-x-hidden"
    >
      <div 
        className="w-[300px] h-[150px] p-4 relative rounded-md bg-white box-border z-20 flex flex-col flex-wrap items-center text-center"
      >
        <p>
          Регистрация завершена
        </p>
        <button
          type="button"
          className="w-20 h-9 mt-10 border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold"
          onClick={handleClick}
        >
          Готово
        </button>
      </div>
    </div>
  );
}
