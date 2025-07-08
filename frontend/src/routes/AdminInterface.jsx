import { redirect, useLoaderData } from 'react-router-dom';
import { isAdmin, getPerson } from '../app/apiRequests';
import { useLogin, useOutsideFileClick } from '../app/customHooks';
import { useSelector } from 'react-redux';
import { getUsersData, deleteAccount } from '../app/adminApiRequests';
import UsersList from '../components/UsersList';
import HeaderAdmin from '../components/HeaderAdmin';
import ModalAddUser from '../components/ModalAddChangeUser';
import ModalConfermDelete from '../components/ModalConfermDelete';
import { deleteAccFromData, deleteFocusOnAcc, hideDelete } from '../slices/adminSlice';

// При загрузке дополнительно проверяем авторизацию и получаем данные админа и всех пользователей
export async function loader() {
  const check = await isAdmin();
  if (!check.admin) {
    return redirect('/user');
  }
  const person = await getPerson();
  const data = await getUsersData();

  if (person.error || data.error) {
    return redirect('/');
  }
  return { person, data };
}

//КОМПОНЕНТ(роут) ИНТЕРФЕЙСА АДМИНИСТРАТОРА
export default function AdminInterface() {
  const cloudState = useSelector((state) => state.cloud);
  const adminState = useSelector((state) => state.admin);
  const { person, data } = useLoaderData();

  useLogin({person, data});
  useOutsideFileClick();

  return (
    <div
      className="w-full min-h-full bg-blue-200"
    >
      <>
        {adminState.addModal ? (<ModalAddUser />):(<></>)}
        {adminState.changeModal ? (<ModalAddUser data={adminState.data.find((acc) => acc.id === adminState.onFocus)} />):(<></>)}
        {adminState.deleteModal ? (
          <ModalConfermDelete 
            state={adminState}
            request={deleteAccount}
            hide={hideDelete}
            delFocus={deleteFocusOnAcc}
            delElement={deleteAccFromData}
            account={true}
          />
        ):(<></>)}
      </>
      <HeaderAdmin />
      <>
        {cloudState.message ? (
          <div
            className="mx-auto h-4 block font-bold text-center text-red-800"
          >
            <span
              className="text-xs"
            >
              Выберите аккаунт
            </span>
          </div>
        ) : (
          <div className="h-4"></div>
        )}
      </>
      <section
        className="w-full flex flex-col"
      >      
        {adminState.data?.map((user, index) => (
          <UsersList 
            key={user.id}
            user={user}
          />
        ))}
      </section>
    </div>
  );
}
