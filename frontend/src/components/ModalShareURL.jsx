import { useDispatch, useSelector } from 'react-redux';
import { deleteFocusOnFile, hideShareURL } from '../slices/cloudSlice';
import { useGetURL } from '../app/customHooks';
import { unsecuredCopyToClipboard } from '../app/helpers';


// КОМПОНЕНТ ОТОБРАЖЕНИЯ ССЫЛКИ ДЛЯ СКАЧИВАНИЯ (модальное окно)
export default function ModalShareURL({ request, files }) {
  const cloudState = useSelector((state) => state.cloud);
  const dispatch = useDispatch();
  const fileName = files.filter((f) => Number(f.id) === Number(cloudState.onFocus))[0]['name'];

  useGetURL(request);

  // Обработчик нажатия кнопки "Закрыть"
  const handleCancel = () => {
    dispatch(hideShareURL());
    dispatch(deleteFocusOnFile());
  };

  // Обработчик нажатия кнопки "копировать ссылку" 
  const handleCopy = (link) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(link);
    } else {
      unsecuredCopyToClipboard(link);
    }
  };

  return (
    <div 
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center z-10 overflow-x-hidden"
    >
      <div 
        className="modal w-[350px] p-4 relative rounded-md bg-white box-border z-20 flex flex-col flex-wrap items-center text-center"
      >
        <p>
          Ссылка на файл
        </p>
        <strong>"{fileName}"</strong>
        <div
          className="w-full mt-2 p-1 bg-gray-100 rounded-md"
        >
          <span
            className="break-words"
          >
            {cloudState.dounloadURL}
          </span>
        </div>
        <div
          className="w-5 h-5 cursor-pointer absolute top-3 right-3 hover:bg-gray-200 active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
          onClick={() => handleCopy(cloudState.dounloadURL)}
        >
          <img src="/img/copylink.png" alt="copyLink" />
        </div>
        <div
          className="w-full mt-4 flex justify-around"
        >
          <button
            type="button"
            className="w-20 h-9  border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold"
            onClick={handleCancel}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
