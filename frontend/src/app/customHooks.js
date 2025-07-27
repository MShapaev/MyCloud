import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../slices/appSlice';
import { loadPersonData, resetPersonData } from '../slices/userSlice';
import {
  addUserFiles,
  changeView,
  deleteFocusOnFile,
  hideDeleteConfirm,
  hideShareURL,
  resetCloud,
  saveDownloadURL
} from '../slices/cloudSlice';
import {
  deleteFocusOnAcc,
  hideAddModal,
  hideChangeModal,
  hideDelete,
  loadData,
  resetAdmin
} from '../slices/adminSlice';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';

//Хук загрузки данных в состояния при прохождении аутентификации(вход)
export function useLogin({ person, data }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login());
    dispatch(loadPersonData(person));
    dispatch(addUserFiles(person.files));
    if (data) {
      dispatch(loadData(data));
    }
  }, [dispatch, person, data]);
}

//Хук очистки данных состояний при обратной аутентификации(выход)
export function useLogout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    dispatch(resetPersonData());
    dispatch(resetCloud());
    dispatch(resetAdmin());
  }, [dispatch]);
}

//Хук обработки кликов для снятия фокуса с файла/пользователя
export function useOutsideFileClick() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleOutsideFileClick = (e) => {
      if (
        e.target.closest(".btn") ||
        e.target.closest(".file") ||
        e.target.closest(".modal") ||
        e.target.closest(".user")
      ) {
        return;
      }
      dispatch(deleteFocusOnAcc());
      dispatch(deleteFocusOnFile());
      dispatch(hideShareURL());
      dispatch(hideDeleteConfirm());
      dispatch(hideDelete());
      dispatch(hideAddModal());
      dispatch(hideChangeModal());
      return;
    };

    document.addEventListener("click", handleOutsideFileClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideFileClick);
    };
  }, [dispatch]);
}

// Хук получения ссылки на загрузку файла сторонним пользователем
export function useGetURL(fetch) {
  const dispatch = useDispatch();
  const cloudState = useSelector((state) => state.cloud);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(cloudState.onFocus);
      if (response.error) {
        return navigate("/");
      }
      dispatch(saveDownloadURL(response.url));
    })();
  }, [cloudState.onFocus, dispatch, navigate, fetch]);
}

// Хук загрузки отображения файлов (список/плитка)
export function useGetView() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (await localforage.getItem("view")) {
        return dispatch(changeView());
      }
      return;
    })();
  }, [dispatch]);
}
