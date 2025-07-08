import dateFormat from 'dateformat';
import { useDispatch, useSelector } from 'react-redux';
import { fileSize, handleName, unsecuredCopyToClipboard } from '../app/helpers';
import { useNavigate } from 'react-router-dom';
import { focusOnFile } from '../slices/cloudSlice';

// КОМПОНЕНТ ОТОБРАЖЕНИЯ ФАЙЛОВ ПОЛЬЗОВАТЕЛЯ СПИСКОМ
export default function FileListView({ file, fetch}) { 
  const dispatch = useDispatch();
  const cloudState = useSelector((state) => state.cloud);
  const navigate = useNavigate();

  // Обработчик нажатия иконки копирования ссылки
  const handleCopy = async () => {
    const response = await fetch(cloudState.onFocus);
    if (response.error) {
      return navigate('/');
    }

    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(response.url);
    } else {
      unsecuredCopyToClipboard(response.url);
    }

    return;
  };

  return (
    <div
      id={file.id}
      className="file w-full mb-1 h-14 p-2 flex items-center outline-none rounded-md cursor-default bg-slate-50 hover:bg-blue-100 focus:bg-blue-100 focus:hover:bg-blue-200"
      tabIndex={-1}
      onFocus={(e) => dispatch(focusOnFile(e.target.getAttribute('id')))}
    >
      <div
        className="w-12 h-12"
      >
        
        <img src={handleName(file.name)} alt="" />
      </div>
      <div
        className="w-3/5 text-xs flex items-center"
      >
        <span
          className="w-1/2 ml-1 font-medium"
        >
          {file.name?.length > 20 ? file.name.slice(0, 13) + ' ...' + file.name.slice(-7) : file.name}
        </span>
        <span
          className="w-1/2 ml-1"
        >
          {file.comment?.length > 50 ? file.comment.slice(0, 43) + ' ...' + file.comment.slice(-7) : file.comment}
        </span>
      </div>
      <div
        className="w-[13%] h-5 text-xs"
      >
        {fileSize(file.size)} 
      </div>
      <div
        className="w-[13%] h-5 text-xs flex flex-col justify-center items-center"
      >
        <p>&uarr;&nbsp;{file.created ? dateFormat(file.created, 'dd.mm.yyyy') : '__________'}</p>
        <p>&darr;&nbsp;{file.last_download ? dateFormat(file.last_download, 'dd.mm.yyyy') : '__________'}</p>
      </div>
      <div
        className="w-[13%] h-5 flex justify-center"
      >
          <div
            className="w-5 h-5 hover:bg-gray-200 active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)] cursor-pointer"
            onClick={handleCopy}
          >
            <img src="/img/copylink.png" alt="copyLink" />
          </div>
      </div>
    </div>
  );
}
