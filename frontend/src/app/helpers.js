import appData from "./appData";

// Вывод сообщений ошибок/успеха
export function showMsg(data, timer, setMessage) {
  setMessage(data);
  setTimeout(() => setMessage(false), timer);
}

// Перевод размера файла в классический вид
export function fileSize(size) {
  return (size / 1024).toFixed(1) < 1000
    ? (size / 1024).toFixed(1) + " Kb"
    : (size / 1024 / 1024).toFixed(1) + " Mb";
}

// Подборка иконки файла
export function handleName(fileName) {
  const extension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
  if (extension === "") {
    return "/img/file_icons/file.png";
  }
  if (appData.files.includes(extension)) {
    return `/img/file_icons/${extension}.png`;
  }
  return "/img/file_icons/unknown.png";
}

// Валидация почты
export function emailValidation(email) {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  return re.test(email);
}

// Валидация пароля
export function passwordValidation(password) {
  const re = /^(?=.*?[A-Z])(?=(.*[a-z]){0,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/;
  return re.test(password);
}

// Резервная функция коприрования текста в буфер
export function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus({ preventScroll: true });
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
}
