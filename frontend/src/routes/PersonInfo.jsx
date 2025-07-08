import { useDispatch, useSelector } from 'react-redux';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useLogin } from '../app/customHooks';
import { getPerson, isAdmin, loadAvatar } from '../app/apiRequests';
import FieldPersonInfo from '../components/FieldPersonInfo';
import { useRef, useState } from 'react';
import { changeField } from '../slices/userSlice';
import ButtonBack from '../components/ButtonBack';
import appData from '../app/appData';
import { showMsg } from '../app/helpers';

//Загрузка данных аккаунта
export async function loader() {
  const check = await isAdmin();
  const person = await getPerson();
  if (person.error) {
    return redirect('/');
  }
  if (check.admin) {
    return redirect(`/user_card/${person.id}`);
  }
  return { person };
}

//КОМПОНЕНТ (роут) СТРАНИЦЫ ЛИЧНЫХ ДАННЫХ АККАУНТА
export default function PersonInfo() {
  const personState = useSelector((state) => state.user);
  const { person } = useLoaderData();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(false);
  useLogin({ person });

  // Обработчик нажатия кнопки изменения аватара
  const handleLoadAvatar = () => {
    inputRef.current.click();
  }

  // Обработчик изменения файла input (отправка изображения на сервер)
  const handleAvatarChange = async (e) => {
    if (e.target.files) {
      const formData = new FormData();
      if (e.target.files.length > 1 || !e.target.files[0].type.includes('image')) {
        e.target.value = "";
        return showMsg({ error: 'ЗАГРУЖАЙТЕ КАРТИНКУ!'}, 3000, setMessage);
      }
      formData.append('avatar', e.target.files[0]);
      const response = await loadAvatar(formData);
      if (response.error) {
        e.target.value = "";
        return navigate('/');
      }
      e.target.value = "";
      showMsg({success: 'УСПЕШНО!'}, 3000, setMessage);
      return dispatch(changeField(['avatar', response.avatar]));
    }
  }
  
  return (
    <div
      className="w-full h-full flex flex-col items-center"
    >
      <span
        className="mt-[40px] mb-[40px]"
      >
        <h1
          className="text-xl font-sans font-bold text-gray-800"
        >
          ВАШИ ДАННЫЕ
        </h1>
      </span>
      <div>
        <div
          className="w-44 mb-4"
        >
          <img
            src={personState.avatar}
            alt="ava"
            className="mx-auto"
          />
          <input
              type="file"
              ref={inputRef}
              onChange={(e) => handleAvatarChange(e)}
              multiple
              hidden
            />
          <p
          className="mx-5 text-sm text-center text-gray-800 font-bold cursor-pointer hover:text-black"
          onClick={handleLoadAvatar}
        >
          изменить
        </p>
        </div>
      </div>
      <p
        className={`${message.error ? 'text-red-700' : 'text-black' } h-4 mb-3 text-center text-sm font-bold`}
      >
        {message.error ? message.error : message.success ? message.success : ''}
      </p>
      <>
        {Object.keys(appData.fields).map((atr, index) => {
            if (atr === 'isAdmin') {
              return null;
            }
          return (
            <FieldPersonInfo
              key={index}
              atribute={atr}
              text={appData.fields[atr]}
              setMessage={setMessage}
            />
          );
        })}
      </>
      <ButtonBack />
    </div>
  );
}
