const appData = {
  files: [
    '7zip',
    'avi',
    'css',
    'csv',
    'doc',
    'docx',
    'dwg',
    'gif',
    'html',
    'jpg',
    'js',
    'json',
    'mp3',
    'mp4',
    'odt',
    'pdf',
    'png',
    'rar',
    'svg',
    'txt',
    'wav',
    'xls',
    'xml',
    'zip',
  ],
  fileButtons: {
    'скачать': '/img/clouddown.png',
    'поделиться': '/img/cloudshare.png',
    'загрузить': '/img/cloudup.png',
    'удалить': '/img/clouddelete.png',
    'изменить': '/img/cloudchange.png',
  },
  adminButtons: [
    'добавить',
    'удалить',
    'изменить',
    'детали',
  ],

  fields: {
    'name': 'ИМЯ:',
    'lastName': 'ФАМИЛИЯ:',
    'email': 'ЭЛЕКТРОННАЯ ПОЧТА*:',
    'password': 'ПАРОЛЬ*:',
    'isAdmin': 'ПРАВА АДМИНИСТРАТОРА'
  }
};

export default appData;
