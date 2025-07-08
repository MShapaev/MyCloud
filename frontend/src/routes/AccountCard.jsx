import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { changeAvatar, changeFileAdmin, deleteFileAdmin, getDownloadURLAdmin, getUser } from '../app/adminApiRequests';
import ButtonBack from '../components/ButtonBack';
import dateFormat from "dateformat";
import FileListView from '../components/FileListView';
import ButtonChange from '../components/ButtonChange';
import { useDispatch, useSelector } from 'react-redux';
import { addDataToCard, cangeDataCard, changeFileDataFromDataCard, deleteFileFromDataCard, showChangeModal } from '../slices/adminSlice';
import ModalAddChangeUser from '../components/ModalAddChangeUser';
import { useEffect, useRef, useState } from 'react';
import { showMsg, fileSize } from '../app/helpers';
import { deleteFocusOnFile, hideDeleteConfirm } from '../slices/cloudSlice';
import { changeAvatar as changeUserAvatar } from '../slices/userSlice'; 
import FooterCardFiles from '../components/FooterCardFiles';
import ModalConfermDelete from '../components/ModalConfermDelete';
import { useLogin, useOutsideFileClick } from '../app/customHooks';
import { getPerson } from '../app/apiRequests';
import ModalShareURL from '../components/ModalShareURL';
import ModalChangeNameComment from '../components/ModalChangeNameComment';


// Загрузка данных пользователя (пользователя/администратора)
export async function loader({params}) {
  const person = await getPerson();
  const data = await getUser(params.params);
  if (data.error || person.error) {
    return redirect('/');
  }
  return { person, data };
}

// КОМПОНЕНТ(роут) КАРТОЧКИ АККАУНТА
export default function AccountCard() {
  const navigate = useNavigate();
  const { person, data } = useLoaderData();
  const adminState = useSelector((state) => state.admin);
  const cloudState = useSelector((state) => state.cloud);
  const [message, setMessage] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const size = data.files.reduce((acc, val) => (acc + Number(val.size)), 0);

  useLogin({ person });
  useOutsideFileClick();

  useEffect(() => {
    dispatch(addDataToCard(data));
  }, [dispatch, data]);

  // Обработчик нажатия кнопки изменения аватара
  const handleChangeAvatar = () => {
    inputRef.current.click();
  };

  // Изменение аватара
  const handleAvatarChange = async (e) => {
    if (e.target.files) {
      const formData = new FormData();
      if (e.target.files.length > 1 || !e.target.files[0].type.includes('image')) {
        e.target.value = "";
        return showMsg({ error: 'Загрузите картинку'}, 3000, setMessage);
      }

      formData.append('avatar', e.target.files[0]);
      formData.append('id', data.id);
      const response = await changeAvatar(formData);
      if (response.error) {
        e.target.value = "";
        return navigate('/');
      }
      e.target.value = "";
      showMsg({success: 'Готово'}, 3000, setMessage);
      if (data.id === person.id) {
        dispatch(changeUserAvatar(response.avatar));
      }
      return dispatch(cangeDataCard(response));
    }
  };

  return (
    <section
      className="w-full p-2 md:p-6"
    >
      {adminState.changeModal ? <ModalAddChangeUser data={adminState.card} /> : <></>}
      {cloudState.share ? (
        <ModalShareURL
          request={getDownloadURLAdmin}
          files={adminState.card.files}
        />
      ) : (
        <></>
      )}
      {cloudState.change ? (
        <ModalChangeNameComment
          request={changeFileAdmin}
          files={adminState.card.files}
          saveChanges={changeFileDataFromDataCard}
        />
      ) : (
        <></>
      )}
      {cloudState.confirm ? (
        <ModalConfermDelete
          state={cloudState}
          request={deleteFileAdmin}
          hide={hideDeleteConfirm}
          delFocus={deleteFocusOnFile}
          delElement={deleteFileFromDataCard}
          fileName={adminState.card.files?.filter((f) => f.id === Number(cloudState.onFocus))[0]['name']}
        />
      ) : (
        <></>
      )}
      <h1
        className="mb-4 text-lg text-center font-bold"
      >
        Данные {adminState.card.isAdmin ? 'администратора:' : 'пользователя:'}
      </h1>
      <div
        className={(adminState.card.isAdmin ? "bg-emerald-700" : "bg-sky-700") + " w-full h-3 bg mb-4"}
      >
      </div>
      <div 
        className="flex min-h-60"
      >
        <div
          className="w-[20%] min-w-36"
        >
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => handleAvatarChange(e)}
            multiple
            hidden
          />
          <img
            className="w-full"
            src={adminState.card.avatar ? adminState.card.avatar : '/img/unknown_user.png'}
            alt="ava" 
          />
          <ButtonChange handler={handleChangeAvatar}/>
        </div>
        <div
          className="flex flex-col px-4 lg:px-10 text-sm md:text-base xl:text-lg"
        >
          <span>Id:&nbsp;&nbsp;<strong>{adminState.card.id}</strong></span>
          <span>Почта:&nbsp;&nbsp;<strong>{adminState.card.email}</strong></span>
          <span>Имя/фамилия:&nbsp;&nbsp;<strong>{adminState.card.name} {adminState.card.lastName}</strong></span>
          <span>Права:&nbsp;&nbsp;<strong>{adminState.card.isAdmin ? 'администратор' : 'пользователь'}</strong></span>
          <span>Последнее посещение:&nbsp;&nbsp;<strong>{dateFormat(adminState.card.lastVisit, "HH:mm dd.mm.yy.")}</strong></span>
          <span>Загруженных файлов:&nbsp;&nbsp;<strong>{adminState.card.files?.length}</strong></span>
          <span>Общий объем файлов:&nbsp;&nbsp;
            <strong>
              {fileSize(size)}
            </strong>
          </span>
          <ButtonChange handler={() => dispatch(showChangeModal())} />
        </div>
      </div>
      <div
        className='w-full h-4 mb-3 text-center text-sm font-bold'
      >
        <p
          className={`${message.error ? 'text-red-700' : 'text-black' }`}
        >
          {message.error ? message.error : message.success ? message.success : ''}
        </p>
        <p
          className='text-red-700'
        >
          {cloudState.message ? 'Вы не выбрали файл!' : ''}
        </p>
      </div>
      <h2
        className="text-center"
      >
        Список файлов:
      </h2>
      <div
        className="w-full h-[35vh] p-1 md:p-5 rounded-md bg-stone-100 overflow-auto border-2 border-stone-200" 
      >
        {adminState.card.files?.length ? (
          adminState.card.files.map((file) => {
            return (
              <FileListView
                key={file.id}
                file={file}
                fetch={getDownloadURLAdmin}
              />
            )
          })
        ):(
          <p
            className="text-center"
          >
            Пользователь пока ничего не загрузил
          </p>
        )}
      </div>
      <FooterCardFiles />
      <ButtonBack />
    </section>
  );
}
