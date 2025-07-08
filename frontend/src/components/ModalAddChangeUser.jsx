import { useDispatch, useSelector } from 'react-redux';
import { cangeDataCard, deleteFocusOnAcc, hideAddModal, hideChangeModal, loadData } from '../slices/adminSlice';
import appData from '../app/appData';
import FieldAddChangeUser from './FieldAddChangeUser';
import { useState } from 'react';
import { addAccount, changeAccount, getUsersData } from '../app/adminApiRequests';
import { useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation, showMsg } from '../app/helpers';

// КОМПОНЕНТ МОДАЛЬНОГО ОКНА СОЗДАНИЯ НОВОГО АККАУНТА ИЛИ ВНЕСЕНИЯ ИЗМЕНЕНИЙ
export default function ModalAddChangeUser({ data }) {
  const adminState = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [message, setMessage] = useState(false);

  // Обработчик нажатия кнопки "отмена"
  const handleCancel = () => {
    dispatch(deleteFocusOnAcc())
    dispatch(hideAddModal());
    dispatch(hideChangeModal());
  };

  //Обработчики нажатия кнопки добавить/изменить
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Установка прав администратора
    if ('isAdmin' in data) {
      data['isAdmin'] = true;
    } else {
      data['isAdmin'] = false;
    }

    // // Валидация почты и пароля
    if (!emailValidation(data.email)) {
      return showMsg({error: 'Ошибка почти или пароля'}, 3000, setMessage);
    } else if ('password' in data && !passwordValidation(data.password)) {
      return showMsg({error: 'Введен неверный пароль'}, 3000, setMessage);
    }

    // Проверка создание/изменение и соответствующий запрос
    if ('add' in data) {
      response = await addAccount(data);
    } else {
      response = await changeAccount(data);
    }
    const accounts = await getUsersData();

    // Обработка контролируемых ошибок
    if ('error' in response || 'error' in accounts) {
      if (response.error === 'already exists') {
        return showMsg({error: 'Пользователь с таким адресом уже зарегистрирован'}, 3000, setMessage);
      }
      return navigate('/');
    }

    dispatch(cangeDataCard(data));
    dispatch(loadData(accounts));
    dispatch(deleteFocusOnAcc());
    dispatch(hideAddModal());
    dispatch(hideChangeModal());
  };

  return (
    <div 
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center z-10 overflow-x-hidden"
    >
      <div 
        className="modal w-[80vw] lg:w-[50vw] min-h-1/2 p-4 relative rounded-md bg-white box-border z-20 flex flex-col justify-center items-center text-center"
      >
        <p
          className={`${message.error ? 'text-red-700' : 'text-black' } h-4 mb-2 mt-2 text-center text-sm font-bold`}
        >
          {message.error ? message.error : message.success ? message.success : ''}
        </p>
        <form
          method="POST"
          className="w-full"
          onSubmit={handleSubmit}
        >
          {Object.keys(appData.fields).map((atr, index) => {
            if (atr === 'password' && adminState.changeModal) {
              return null;
            }
            return (
              <FieldAddChangeUser
                key={index}
                atr={atr}
                text={appData.fields[atr]}
                data={data}
              />
            );
          })}
          <input type="hidden" name={adminState.addModal ? 'add' : 'change'} value="1"></input>
          <>
            {data ? (
              <input type="hidden" name="id" value={Number(data.id)}></input>
            ):(
              null
            )}
          </>
          <p
            className="ml-[10%] text-sm text-left"
          >
            * - поля обязательные для заполнения.
          </p>
          <div
            className='w-full mt-6 flex justify-around'
          >
            <button
              type="submit"
              className="w-20 h-9  border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold"
            >
              {adminState.addModal ? 'Добавить' : 'Изменить'}
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
