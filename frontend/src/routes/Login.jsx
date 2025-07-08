import { useDispatch, useSelector } from 'react-redux';
import { Form, Link, redirect, useActionData } from 'react-router-dom';
import { showHidePassword } from '../slices/appSlice';
import { isAdmin, login, getPerson } from '../app/apiRequests';
import { useLogout } from '../app/customHooks';

// Проверка аутентификации и авторизации при входе на главную страницу (корневой роут)
export async function loader() {
  const person = await getPerson();
  if (person.error) {
    return null;
  } else if (person.isAdmin) {
    return redirect('/admin');
  }
  return redirect('user');
}

// Обработка и отправка данных формы (Form) аутентификации на сервер
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let errors = {};

  // Простая валидация полей логина и пароля
  if (typeof data.email !== 'string' || data.email.trim() === '' || !data.email.includes('@')) {
    errors.email = true;
  } 
  
  if (typeof data.password !== 'string' || data.password.trim().length < 6) {
    errors.password = true;
  }

  // Отправка запроса на сервер в случае успешной валидации 
  if (Object.keys(errors).length === 0) {
    const response = await login(data);
    //Проверка успешности аутентификации
    if (!response.error) {
      // Проверка флага администратора (авторизация) и перенаправление на соответствующие страницы(роуты)
      const check = await isAdmin()
      if (check.admin) {
        return redirect('/admin');
      }
      return redirect('/user');
    }
    // Аутентификация не пройдена
    errors.response = 'НЕВЕРНЫЙ ПАРОЛЬ ИЛИ ПОЧТА';
  }

  return errors;
}

// КОМПОНЕНТ (роут) ИНДЕКСНОЙ СТРАНИЦЫ АУТЕНТИФИКАЦИИ (входа)
export default function Login() {
  const errors = useActionData();
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();
  
  useLogout();

  // Показать/скрыть поле пароля
  const handleShowPassword = () => {
    dispatch(showHidePassword());
  }

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <div
        className="mt-[-80px] mb-[80px] flex flex-col items-center"
      >
        <h1
          className="font-sans font-bold text-gray-800"
        >
          ВХОД 
        </h1>
        <img
          src="/img/cloud.png"
          alt=""
          className="w-32"
        />
      </div>
      <Form
        method="post"
        id="login-form"
        className="w-4/5 flex flex-col justify-center items-center"
      >
        <label
          htmlFor="login_email"
          className="w-4/5 sm:w-3/5 py-1 h-6 text-xs font-sans font-bold"
        >
          ВВЕДИТЕ АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ
        </label>
        <input
          id="login_email"
          type="text"
          name="email"
          className="w-4/5 sm:w-3/5 h-9 px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400"
        />
        <div
          className="w-4/5 sm:w-3/5 h-4"
        >
          {errors?.email ? (
            <p
              className="text-xs text-red-700 font-bold text-center"
            >
              НЕКОРРЕКТНЫЙ ВВОД
            </p>
          ):(
            null
          )}
        </div>
        <label
          htmlFor="login_password"
          className="w-4/5 sm:w-3/5 py-1 h-6 text-xs font-sans font-bold"
        >
          ВВЕДИТЕ ПАРОЛЬ
        </label>
        <div
          className="w-4/5 sm:w-3/5 relative"
        >
          <input
            id="login_password"
            type={appState.showPassword ? "text" : "password"}
            name="password"
            className="w-full h-9 px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400"
          />
          <div
            className="w-7 h-7 absolute top-1 right-2 cursor-pointer"
            onClick={handleShowPassword}
          >
            <img
              src={appState.showPassword ? "/img/eye_hide.png" : "/img/eye_show.png"}
              alt=""
              className="opacity-60"
            />
          </div>
        </div>
        <div
          className="w-4/5 sm:w-3/5 h-4 mb-6"
        >
          {errors?.password ? (
            <p
              className="text-xs text-red-700 font-bold text-center"
            >
              НЕКОРРЕКТНЫЙ ПАРОЛЬ
            </p>
          ):(
            null
          )}
        </div>
        <button
          type="submit"
          className="w-4/5 sm:w-3/5 h-9 border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
        >
          ВХОД
        </button>
        <div
          className="w-4/5 sm:w-3/5 h-4"
        >
          {errors?.response ? (
            <p
              className="text-xs text-red-700 font-bold text-center"
            >
              {errors.response}
            </p>
          ):(
            null
          )}
        </div>
        <Link
          to="registration"
          className="text-xs text-center underline"
        >
          РЕГИСТРАЦИЯ
        </Link>
      </Form>
    </div>
  );
}
