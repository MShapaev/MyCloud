import { useDispatch, useSelector } from 'react-redux';
import { changeView } from '../slices/cloudSlice';
import appData from '../app/appData';
import ButtonCloudHeader from './ButtonCloudHeader';
import localforage from 'localforage';
import { useGetView } from '../app/customHooks';

// КОМПОНЕНТ ШАПКИ ОКНА ХРАНИЛИЩА ФАЙЛОВ
export default function HeaderCloud() {
  const dispatch = useDispatch();
  const cloudState = useSelector((state) => state.cloud);

  useGetView()

  // Изменение и сохранение вида отображения файлов в окне хранилища
  const handleClick = () => {
    localforage.setItem('view', !cloudState.view);
    dispatch(changeView());
  };

  return (

    <section
      className="w-full h-[7vh] bg-gray-200 rounded-t-xl flex justify-between items-center"
    >
      <div
        className="w-2/3 h-[6vh] ml-4 flex justify-around"
      >
        {Object.keys(appData.fileButtons).map((btnName, index) => (
          <ButtonCloudHeader
            key={index}
            btnName={btnName}
            src={appData.fileButtons[btnName]}
          />
        ))}
      </div>
      <div
        className="w-[6vh] h-[6vh] mr-4 flex items-center justify-center"
      >

        <div
          className="w-[4vh] h-[4vh] cursor-pointer hover:w-[4.1vh] hover:h-[4.1vh]"
          onClick={handleClick}
        >
          <img src={cloudState.view ? "/img/tile_view.png" : "/img/list_view.png"} alt="" />
        </div>
      </div>
    </section>
  );
}
