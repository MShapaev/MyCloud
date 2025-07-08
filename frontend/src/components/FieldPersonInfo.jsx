import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { changePersonData } from '../app/apiRequests';
import { passwordValidation, showMsg } from '../app/helpers';

// КОМПОНЕНТ ИЗМЕНЯЕМЫХ ПОЛЕЙ СВОИХ ЛИЧНЫХ ДАННЫХ
export default function FieldPersonInfo({atribute, text, setMessage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [fieldState, setfieldState] = useState(false);

  // Обработчик нажатия кнопки "измененить"(открытие полей)
  const handleChange = () => {
    setfieldState(true);
  };

  // Обработчик нажатия кнопки "отмена"(закрытие полей)
  const handleCancel = () => {
    setfieldState(false);
  };

  // Обработчик нажатия кнопки "отмена"(запрос с изменениями на сервер, и изменение полей)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Простая валидация 
    if ('newPassword' in data && !passwordValidation(data.newPassword)) {
      showMsg({ error:'НЕКОРРЕКТНЫЙ ПАРОЛЬ! минимум 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ.' }, 3000, setMessage);
      return;
    } else if ('email' in data && !passwordValidation(data.email)) {
      showMsg({ error:'НЕКОРРЕКТНАЯ ПОЧТА!' }, 3000, setMessage);
      return;
    }
    // Если изменяемые поля валидны - отправка запроса
    const response = await changePersonData(data);
    
    // Обработка контролируемых ошибок
    if ('error' in response) {
      response.error === 'not authorized' ? navigate('/') : showMsg({ error: 'НЕ ВЕРНЫЙ ПАРОЛЬ!' }, 3000, setMessage);
      return;
    }
    showMsg({success: 'УСПЕШНО!'}, 3000, setMessage);
    
    // Изменение значений полей
    const key = e.target[atribute].name;
    const value = e.target[atribute].value;
    if (key === 'password') {
      return setfieldState(false);
    }
    dispatch(changeField([key, value]));
    setfieldState(false);
  }

  return (
    <form
      className="w-3/5 min-h-16 mb-4 flex flex-col justify-center items-center"
      onSubmit={(e)=> handleSubmit(e)}
    >
      {fieldState? (
        <>
          {atribute === 'password' ? (
            <p
              className='text-xs'
            >
              старый пароль
            </p>
          ) : (
            <></>
          )}
          <input
            autoFocus
            type="text"
            name={atribute}
            className="w-full h-9 px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400"
            defaultValue={atribute === 'password' ? '' : userState[atribute]}
          />
          {atribute === 'password' ? (
            <>
              <p
                className='text-xs'
              >
                новый пароль
              </p>
              <input
                type="text"
                name="newPassword"
                className="w-full h-9 px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400"
                defaultValue=""
              />
            </>
          ) : (
            <></>
          )}
          <div>
            <button
              className="mx-5 text-center text-gray-800 font-bold cursor-pointer hover:text-black"
              type="submit"
            >
              сохранить
            </button>
            <button
              className="mx-5 text-center text-gray-800 font-bold cursor-pointer hover:text-black"
              type="button"
              onClick={handleCancel}
            >
              отменить
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className="w-full h-9 px-2 border-2 text-[11px] text-gray-600 font-bold border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400 leading-8"
          >
            {text}&nbsp;&nbsp;
            <span
              className="text-lg text-black font-normal"
            >
              {atribute === 'password' ? '********' : userState[atribute] }
            </span>
          </div>
          <span
            className="mx-5 text-sm text-center text-gray-800 font-bold cursor-pointer hover:text-black"
            onClick={handleChange}
          >
            изменить
          </span>
        </>
      )}
    </form>
  );
}
