import localforage from 'localforage';
import baseFetch from './baseFetch';

// ФУНКЦИИ ОТПРАВКИ ОБЩИХ ЗАПРОСОВ НА СЕРВЕР:

//Функция регистрации
export async function registration(data) {
  return baseFetch({
    url: process.env.REACT_APP_REGISTRATION_URL,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Функция аутентификации(вход)
export async function login(data) {
  return baseFetch({
    url: process.env.REACT_APP_LOGIN_URL,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Функция проверки флага администратора
export async function isAdmin() {
  return baseFetch({
    url: process.env.REACT_APP_ISADMIN_URL,
    method: "GET",
    headers: { Authorization: await localforage.getItem("sessionToken") }
  });
}

// Функция запроса данных аккаутна
export async function getPerson() {
  return baseFetch({
    url: process.env.REACT_APP_GET_AUTH_URL,
    method: "GET",
    headers: { Authorization: await localforage.getItem("sessionToken") }
  });
}

// Функция отмены аутентификации(выход)
export async function logout() {
  return baseFetch({
    url: process.env.REACT_APP_LOGOUT_URL,
    method: "GET",
    headers: { Authorization: await localforage.getItem("sessionToken") },
    out: true
  });
}

// Функция загрузки аватара
export async function loadAvatar(formData) {
  return baseFetch({
    url: process.env.REACT_APP_CHANGE_PERSON_URL,
    method: "PATCH",
    headers: { Authorization: await localforage.getItem("sessionToken") },
    body: formData
  });
}

// Функция внесения изменений в свои личные данные
export async function changePersonData(data) {
  return baseFetch({
    url: process.env.REACT_APP_CHANGE_PERSON_URL,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: await localforage.getItem("sessionToken")
    },
    body: JSON.stringify(data)
  });
}

// Функция отправки файлов на сервер
export async function sendFiles(formData) {
  return baseFetch({
    url: process.env.REACT_APP_UPLOAD_URL,
    method: "POST",
    headers: { Authorization: await localforage.getItem("sessionToken") },
    body: formData
  });
}

// Функция удаления файла из хранилища
export async function deleteFile(id) {
  return baseFetch({
    url: process.env.REACT_APP_DELETE_URL + id,
    method: "DELETE",
    headers: { Authorization: await localforage.getItem("sessionToken") },
    del: true
  });
}

// Функция сохранения или скачивания файла клиентом
export async function getFile(id, fileName) {
  return baseFetch({
    url: process.env.REACT_APP_DOWNLOAD_URL + id,
    method: "GET",
    headers: { Authorization: await localforage.getItem("sessionToken") },
    file: fileName
  });
}

// Функция для получения ссылки сохранения или скачивания файла сторонним пользователем
export async function getDownloadURL(id) {
  return baseFetch({
    url: process.env.REACT_APP_GET_FILE_URL + id,
    method: "GET",
    headers: { Authorization: await localforage.getItem("sessionToken") }
  });
}

// Функция для сохранения или скачивания файла сторонним пользователем
export async function getFileByLink(params) {
  return baseFetch({
    url: process.env.REACT_APP_GET_FILE_BY_LINK + params,
    method: "GET",
    fUrl: true
  });
}

// Функция для изменения имени/комментария файла
export async function changeFile(id, data) {
  return baseFetch({
    url: process.env.REACT_APP_CHANGE_FILE_URL + id,
    method: "PATCH",
    headers: { Authorization: await localforage.getItem("sessionToken") },
    body: JSON.stringify(data)
  });
}

