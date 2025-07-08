import { useDispatch } from 'react-redux';
import { handleName } from '../app/helpers';
import { focusOnFile } from '../slices/cloudSlice';

//КОМПОНЕНТ ОТОБРАЖЕНИЯ ФАЙЛОВ ПОЛЬЗОВАТЕЛЯ ПЛИТКОЙ
export default function FileTileView({ file }) {
  const dispatch = useDispatch();

  return (
    <div
      id={file.id}
      className="file w-28 h-32 p-2 flex flex-col items-center hover:bg-blue-100 focus:bg-blue-100 focus:hover:bg-blue-200 outline-none rounded-md cursor-default"
      tabIndex={-1}
      onFocus={(e) => dispatch(focusOnFile(e.target.getAttribute('id')))}
    >
      <div
        className="w-20 h-20"
      >
        
        <img src={handleName(file.name)} alt="" />
      </div>
      <div
        className="w-full h-8 text-xs text-center font-medium"
      >
        {file.name?.length > 20 ? file.name.slice(0, 13) + ' ...' + file.name.slice(-7) : file.name}
      </div>
    </div>
  );
}
