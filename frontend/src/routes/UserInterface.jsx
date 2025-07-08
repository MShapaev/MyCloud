import { redirect, useLoaderData } from 'react-router-dom';
import { isAdmin, getPerson, deleteFile, getDownloadURL, changeFile } from '../app/apiRequests';
import { useLogin, useOutsideFileClick } from '../app/customHooks';
import FileListView from '../components/FileListView';
import FileTileView from '../components/FileTileView';
import { useSelector } from 'react-redux';
import HeaderCloud from '../components/HeaderCloud';
import { changeFileData, deleteFileFromFiles, deleteFocusOnFile, hideDeleteConfirm } from '../slices/cloudSlice';
import ModalConfermDelete from '../components/ModalConfermDelete';
import ModalShareURL from '../components/ModalShareURL';
import ModalChangeNameComment from '../components/ModalChangeNameComment';

// Проверка авторизации и получение данных аккаунта
export async function loader() {
  const check = await isAdmin();
  if (check.admin) {
    return redirect('/admin');
  }
  const person = await getPerson();
  if (person.error) {
    return redirect('/');
  }
  return { person };
}

//КОМПОНЕНТ (роут) СТРАНИЦЫ ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА
export default function UserInterface() {
  const cloudState = useSelector((state) => state.cloud);
  const { person } = useLoaderData();
  useLogin({person});
  useOutsideFileClick();

  return (
    <div
      className="w-full pt-[3%] min-h-full bg-blue-200"
    >
      <div
        className="w-[94%] mx-auto min-h-52 bg-white rounded-xl"
      >
        <HeaderCloud />
        <section
          className="w-full p-5 rounded-b-xl"
        >
          <>
            {cloudState.share ? (
              <ModalShareURL
                request={getDownloadURL}
                files={cloudState.files}
              />
            ) : (
              <></>
            )}
            {cloudState.confirm ? (
              <ModalConfermDelete
                state={cloudState}
                request={deleteFile}
                hide={hideDeleteConfirm}
                delFocus={deleteFocusOnFile}
                delElement={deleteFileFromFiles}
                fileName={cloudState.files?.filter((f) => f.id === Number(cloudState.onFocus))[0]['name']}
              />
            ) : (
              <></>
            )}
            {cloudState.change ? (
              <ModalChangeNameComment
                request={changeFile}
                files={cloudState.files}
                saveChanges={changeFileData}
              />
            ) : (
              <></>
            )}
          </>
          {cloudState.message ? (
            <div
              className='mx-auto h-3 block text-center text-red-800'
            >
              <span
                className='text-xs'
              >
                Файл не выбран
              </span>
            </div>
          ) : (
            <div className='h-3'></div>
          )}
          <h1>Файлы:</h1>
          <div
            className="w-full flex justify-start flex-wrap gap-3"
          >
            {cloudState.files.length === 0 ? (
              <div
                className="w-full flex justify-center"
              >
                <h2>Вы пока ничего не загрузили...</h2>
              </div>
            ) : (
              cloudState.view ? (
                <>
                  {cloudState.files?.map((file) => {
                    return (
                      <FileListView
                        key={file.id}
                        file={file}
                        size={file.size}
                        created={file.created}
                        fetch={getDownloadURL}
                        lastDownload={file.last_download}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {cloudState.files?.map((file) => {
                    return (
                      <FileTileView
                        key={file.id}
                        file={file}
                      />
                    );
                  })}
                </>
              )
            )} 
          </div>
        </section>
      </div>
    </div>
  );
}
