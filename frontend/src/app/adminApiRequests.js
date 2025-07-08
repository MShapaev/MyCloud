import localforage from 'localforage';
import baseFetch from './baseFetch';

//ФУНКЦИИ ОТПРАВКИ ЗАПРОСОВ АДМИНИСТРАТОРА НА СЕРВЕР:

// Функция запроса данных всех аккаунтов
export async function getUsersData() {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_GET_ALL,
    method: 'GET',
    headers: {
      'Authorization': await localforage.getItem('sessionToken')
    },
  });
}

// Функция запроса конкретного аккаунта
export async function getUser(id) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_GET_ONE + id,
    method: 'GET',
    headers: {
      'Authorization': await localforage.getItem('sessionToken')
    },
  });
}

// Функция создания аккаунта
export async function addAccount(data) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_ADD_ONE,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await localforage.getItem('sessionToken'),
    },
    body: JSON.stringify(data),
  });
}

// Функция изменения данных конкретного аккаунта
export async function changeAccount(data) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_CHANGE_ONE,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await localforage.getItem('sessionToken'),
    },
    body: JSON.stringify(data),
  });
}

// Функция изменения аватара конкретного аккаунта
export async function changeAvatar(formData) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_CHANGE_ONE,
    method: 'PATCH',
    headers: {
      'Authorization': await localforage.getItem('sessionToken'),
    },
    body: formData,
  });
}

// Функция удаления конкретного аккаунта
export async function deleteAccount(id) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_DELETE_ONE + id,
    method: 'DELETE',
    headers: { 'Authorization': await localforage.getItem('sessionToken'), },
    del: true,
  });
}

// Функция отправки файла на сервер
export async function sendFilesAdmin(formData, id) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_FILES + id,
    method: 'POST',
    headers: { 'Authorization': await localforage.getItem('sessionToken'), },
    body: formData,
  });
}

// Функция сохранения или скачивания файла клиентом
export async function getFileAdmin(id, fileName) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_FILES + id,
    method: 'GET',
    headers: { 'Authorization': await localforage.getItem('sessionToken'), },
    file: fileName,
  });
}

// Функция удаления файла из хранилища
export async function deleteFileAdmin(id) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_FILES + id,
    method: 'DELETE',
    headers: { 'Authorization': await localforage.getItem('sessionToken'), },
    del: true,
  });
}

// Функция для получения ссылки сохранения или скачивания файла сторонним пользователем
export async function getDownloadURLAdmin(id) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_FILES_URL + id,
    method: 'GET',
    headers: { 'Authorization': await localforage.getItem('sessionToken'), },
  });
}

// Функция для изменения имени/комментария файла 
export async function changeFileAdmin(id, data) {
  return baseFetch({
    url: process.env.REACT_APP_ADMIN_FILES + id,
    method: 'PATCH',
    headers: { 'Authorization': await localforage.getItem('sessionToken'), },
    body: JSON.stringify(data),
  });
}
