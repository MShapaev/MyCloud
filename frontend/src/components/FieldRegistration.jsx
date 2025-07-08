import { useDispatch, useSelector } from 'react-redux';
import {
  correctPassword,
  incorrectPassword,
  showHideRegistrationPassword
} from '../slices/appSlice';
import { passwordValidation } from '../app/helpers';

//КОМПОНЕНТ ПОЛЕЙ ФОРМЫ РЕГИСТРАЦИИ
export default function FieldRegistration({atribute, text, actionData}) {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  //Подсветка валидации поля первичного ввода пароля
  const handlePassword = (e) => {
    if (passwordValidation(e.target.value)) {
      e.target.style.outlineColor="#4ade80";
      dispatch(correctPassword(e.target.value));
    } else {
      e.target.style.outlineColor="#fb7185";
      dispatch(incorrectPassword());
    }
  };

  //Подсветка валидации поля повторного ввода пароля
  const handlePasswordRepeat = (e) => {
    if (e.target.value === appState.password) {
      e.target.style.outlineColor="#4ade80";
    } else {
      e.target.style.outlineColor="#fb7185";
    }
  };

  // Обработчикки ввода пароля
  const handlers = {
    password: handlePassword,
    passwordRepeat: handlePasswordRepeat,
  };
  
  // Показать/скрыть поле пароля
  const handleShowPassword = () => {
    dispatch(showHideRegistrationPassword());
  };
  
  return (
    <>
      <label
        htmlFor={`registration_${atribute}`}
        className="w-3/5 py-1 h-6 text-xs font-sans font-bold"
      >
        {text}
      </label>
      <div
        className="w-3/5 relative"
      >
        <input
          id={`registration_${atribute}`}
          type={!atribute.includes('password') ? "text" : appState.showRegistrationPassword ? "text" : "password"}
          name={atribute}
          className="w-full h-9 px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-gray-400"
          onChange={atribute.includes('password') ? ((e) => handlers[atribute](e)) : (null)}
        />
        {atribute.includes('password') ? (
          <div
            className="w-7 h-7 absolute top-1 right-2 cursor-pointer"
            onClick={handleShowPassword}
          >
            <img
              src={appState.showRegistrationPassword ? "/img/eye_hide.png" : "/img/eye_show.png"}
              alt=""
              className="opacity-60"
            />
          </div>
        ) : (null)}
        <div
          className="w-full h-4"
        >
          {actionData?.errors[atribute] ? (
            <p
              className="text-xs text-red-700 font-bold text-center"
            >
              {actionData.errors[atribute]}
            </p>
          ):(
            null
          )}
        </div>
      </div>
    </>
  );
}
