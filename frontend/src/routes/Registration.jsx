import { Form, useActionData, useNavigate } from 'react-router-dom';
import FieldRegistration from '../components/FieldRegistration';
import { registration } from '../app/apiRequests';
import ModalRegSuccess from '../components/ModalRegSuccess';
import { emailValidation, passwordValidation } from '../app/helpers';
import appData from '../app/appData';

// Обработка и отправка данных формы(Form) регистрации на сервер
export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let actionData = { errors: {}, success: false};

  // Простая валидация полей почты и паролей
  if (!emailValidation(data.email)) {
    actionData.errors.email = 'Ошибка ввода';
  }

  if (!passwordValidation(data.password)) {
    actionData.errors.password = 'Введите пароль';
  }

  if (data.password !== data.passwordRepeat) {
    actionData.errors.passwordRepeat = 'Пароли не совпадают';
  }

  if (Object.keys(actionData.errors).length === 0) {
    const response = await registration(data);
    // Проверка успешности регистрации
    if ('success' in response) {
      actionData.success=true;
      return actionData;
    }
    actionData.errors.response = `ПОЛЬЗОВАТЕЛЬ С ЭЛЕКТРОННОЙ ПОЧТОЙ ${data.email} УЖЕ ЗАРЕГИСТРИРОВАН`;
  }
  return actionData;
}

// КОМПОНЕНТ(роут) СТРАНИЦЫ РЕГИСТРАЦИИ
export default function Registration() {
  const actionData = useActionData();
  const navigate = useNavigate();

  const handleCancel = () => {
    return navigate('/');
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <span
        className="mt-[-80px] mb-[40px]"
      >
        <h1
          className="text-xl font-sans font-bold text-gray-800"
        >
          РЕГИСТРАЦИЯ
        </h1>
      </span>
      <>
        {actionData?.success ? (<ModalRegSuccess />) : (null)}
      </>
      
      <Form
        method="POST"
        className="w-4/5 rounded-lg flex flex-col justify-center items-center"
      >
        {Object.keys(appData.fields).map((atr, index) => {
          if (atr === 'isAdmin') {
            return null;
          }
          return (
            <FieldRegistration
              key={index}
              atribute={atr}
              text={appData.fields[atr]}
              actionData={actionData}
            />
          );
        })}
        <FieldRegistration
          atribute={'passwordRepeat'}
          text={'ПОВТОРИТЕ ПАРОЛЬ*'}
          actionData={actionData}
        />
        <div
          className='w-3/5 mt-5 flex justify-around'
        >
          <button
            type="submit"
            className="w-20 h-9 mb-4 border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
          >
            Готово
          </button>
          <button
            type="button"
            className="w-20 h-9 mb-4 border-2 rounded-md border-gray-300 bg-gray-300 hover:border-gray-400 text-xs text-center font-bold active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
            onClick={handleCancel}
          >
            Отмена
          </button>
        </div>
      </Form> 
      <div
        className="w-full h-4"
      >
        {actionData?.errors.response ? (
          <p
            className="text-xs text-red-700 font-bold text-center"
          >
            {actionData.errors.response}
          </p>
        ):(
          null
        )}
      </div>
      <p
        className="mt-2 w-1/2 text-sm"
      >
        Пароль должен содержать минимум 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ.
      </p>
      <p
        className="mt-2 w-1/2 text-sm"
      >
        * - поля обязательные для заполнения.
      </p>
    </div>
  );
}
