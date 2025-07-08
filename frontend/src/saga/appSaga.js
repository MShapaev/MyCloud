import {  put, spawn, debounce } from 'redux-saga/effects';
import { hideMessage, showMessage } from '../slices/cloudSlice';

// Отображение сообщений при отсутствии фокусировки на объекте (watcher)
function* watchShowMessage() {
  yield debounce(3000, showMessage.type, handleShowMessage);
}

// Удаление сообщений при отсутствии фокусировки на объекте (worker)
function* handleShowMessage() {
  yield put(hideMessage());
}

export default function* saga() {
  yield spawn(watchShowMessage);
}
