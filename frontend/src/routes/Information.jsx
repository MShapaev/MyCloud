import { Link } from 'react-router-dom';
import ButtonBack from '../components/ButtonBack';

//КОМПОНЕНТ(роут) С ИНФОРМАЦИЕЙ О ПРОЕКТЕ
export default function Information() {
  return (
    <div
      className="p-10"
    >
      <h1
        className="my-8 w-full text-center font-bold text-sm"
      >
        ОБЩАЯ ИНФОРМАЦИЯ:
      </h1>
      <p
        className="mt-3 whitespace-pre-wrap indent-5 pb-2"
      >
        Проект выполнен в рамках Дипломной работы курса <strong>"Fullstack-разработчик на Python"</strong> от образовательной площадки &nbsp;
        <Link
          to="https://netology.ru/"
          target="_blank"
          className="w-32 h-7 inline-block mx-auto p-0"
        >
          <img className="w-32" src="/img/netology.png" alt="" />
        </Link>
      </p>
      <p
        className="mt-3 indent-5"
      >
        Все, используемые в проекте, изображения/иконки/значки найдены на бесплатном ресурсе &nbsp;
        <Link
          to="https://icon-icons.com/"
          className="underline"
          target="_blank"
        >
          https://icon-icons.com/
        </Link>
        .
      </p>
      <p
        className="mt-3 whitespace-pre-wrap indent-5 pb-2"
      >
        {
          `Front
            Основные пакеты: 
                  "@reduxjs/toolkit": "^2.0.1",
                  "dateformat": "^5.0.3",
                  "file-saver": "^2.0.5",
                  "localforage": "^1.10.0",
                  "react": "^18.2.0",
                  "react-dom": "^18.2.0",
                  "react-redux": "^9.0.4",
                  "react-router-dom": "^6.21.0",
                  "react-scripts": "5.0.1",
                  "redux": "^5.0.0",
                  "redux-saga": "^1.2.3",
                  "tailwindcss": "^3.4.0",
                  "web-vitals": "^2.1.4"
          `
        }
      </p>
      <p
        className="mt-3 whitespace-pre-wrap indent-5 pb-2"
      >
        {
          `Back
            Основные пакеты: 
                  asgiref==3.7.2
                  cffi==1.16.0
                  cryptography==41.0.7
                  Django==5.0.1
                  django-cleanup==8.0.0
                  django-cors-headers==4.3.1
                  djangorestframework==3.14.0
                  gunicorn==21.2.0
                  packaging==23.2
                  pillow==10.2.0
                  psycopg2-binary==2.9.9
                  pycparser==2.21
                  python-dotenv==1.0.0
                  pytz==2023.3.post1
                  sqlparse==0.4.4
                  typing_extensions==4.9.0
          `
        }
      </p>
      <ButtonBack />
    </div>
  );
}