import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useSelector } from 'react-redux';


//КОМПОНЕНТ (корневой роут) ДОМАШНЕЙ СТРАНИЦЫ ПРИ НЕПРОЙДЕННОЙ АУТЕНТИФИКАЦИИ
export default function Root() {
  const appState = useSelector((state) => state.app);

  return (
    <>
      {appState.navigation ? <Header /> : <></>}
      <main
        className="w-full min-h-screen bg-slate-200 overflow-x-hidden flex justify-center"
      >
        <div
          className="w-full lg:w-[60vw] min-h-full bg-white overflow-x-hidden"
        >
          <Outlet />
        </div>
      </main>
      <Footer/>
    </>
  );
}
