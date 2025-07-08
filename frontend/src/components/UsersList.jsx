import dateFormat from "dateformat";
import { focusOnAcc } from '../slices/adminSlice';
import { useDispatch } from 'react-redux';
import { fileSize } from '../app/helpers';

// КОМПОНЕНТ ОТОБРАЖЕНИЯ АККАУНТОВ
export default function UsersList({ user }) {
  const dispatch = useDispatch();
  const size = user.fullSize?.reduce((acc, val) => (acc + Number(val.size)), 0);

  return (
    <div
      className="user w-[98%] py-2 mx-[1%] my-2 rounded-md bg-gray-100 shadow-[0_3px_10px_5px_rgba(0,0,0,0.2)] focus:bg-blue-100 hover:shadow-[0_3px_7px_5px_rgba(0,0,0,0.3)] cursor-pointer"
      tabIndex={-1}
      onClick={() => dispatch(focusOnAcc(user.id))}
    >
      <div
        className={(user.isAdmin ? "bg-emerald-700" : "bg-sky-700") + " w-full h-3 bg"}
      >
      </div>
      <div
        className="flex justify-around items-center text-sm"
      >
        <span>id: <strong className="text-base ml-1">{user.id}</strong></span>
        <span>права: <strong className="text-base ml-1">{user.isAdmin ? 'admin' : 'user'}</strong></span>
        <span>почта: <strong className="text-base ml-1">{user.email}</strong></span>
        <strong className="text-base ml-1">{user.name} {user.lastName}</strong>
        <div
          className="w-1/4 md:w-1/5 text-xs ml-1"
        >
          
          <div>был: <strong>{dateFormat(user.lastVisit, "HH:mm dd.mm.yy.")}</strong></div>
          <div>файлов: <strong>{user.files}</strong></div>
          <div>объем: 
            <strong>
              {fileSize(size)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
