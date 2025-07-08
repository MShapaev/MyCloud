import { useRouteError } from 'react-router-dom';

// КОМПОНЕНТ(роут) НЕПРЕДВИДЕННЫХ ОШИБОК
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='w-full h-[80vh] flex flex-col justify-center items-center'>
      <div
        className='w-[20vh] h-[20vh]'
      >
        <img src="/img/thunder.png" alt="" />
      </div>
      <h1
        className="text-xl"
      >
        Что-то пошло не так...
      </h1>
      <p
        className='mt-4'
      >
        <i>{`${error.message}` || `${error.statusText}`}</i>
      </p>
    </div>
  );
}
