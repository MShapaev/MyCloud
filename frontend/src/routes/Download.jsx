import { useDispatch } from 'react-redux';
import { hideNavigation } from '../slices/appSlice';
import { getFileByLink } from '../app/apiRequests';
import { useLoaderData } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { useEffect } from 'react';
import { handleName } from '../app/helpers';

//Получение  данных с сервера по ссылке
export async function loader({ params }) {
  const data = await getFileByLink(params.params);
  return data;
}

// КОМПОНЕНТ (роут) СОХРАНЕНИЯ ФАЙЛА СТОРОННИМ ПОЛЬЗОВАТЕЛЕМ ПО ССЫЛКЕ
export default function Download() {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const fileName = Object.keys(data)[0];

  // Скрытие шапки с навигацией
  useEffect(() => {
    dispatch(hideNavigation());
  });

  // Обработчик нажатия кнопки "Сохранить" (сохранение файла)
  const handleSave = () => {
    return saveAs(data[fileName], fileName);
  };

  return (
    <div
      className="w-full pt-[20%] min-h-full bg-blue-200"
    >
      <div
        className="w-[94%] md:w-[60%] mx-auto flex flex-col justify-around items-center min-h-60 bg-white rounded-xl"
      >
        {data.error ? (
          <div
            className="flex flex-col items-center"
          >
            <h1
              className="mb-3 text-3xl"
            >
              Ничего не найдено
            </h1>
            <p>Ошибка, возможно владелец удалил файл.</p>
          </div>
        ):(
          <>
            <div>
              <h1
                className="break-words"
              >
                Скачать файл <strong>{fileName}</strong>
              </h1>
            </div>
            <div
              className="file w-28 h-32 p-2 flex flex-col items-center outline-none rounded-md cursor-default"
            >
              <div
                className="w-20 h-20"
              >
                
                <img src={handleName(fileName)} alt="" />
              </div>
              <div
                className="w-full h-4 text-xs text-center"
              >
                {fileName.length > 20 ? fileName.slice(0, 13) + ' ...' + fileName.slice(-7) : fileName}
              </div>
            </div>
            <button
              className="w-2/5 h-9 border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
              onClick={handleSave}
            >
              Скачать
            </button>
          </>
        )}
      </div>
    </div>
  );
}
