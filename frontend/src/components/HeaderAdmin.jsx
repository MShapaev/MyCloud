import appData from '../app/appData';
import ButtonAdminHeader from './ButtonAdminHeader';

//ШАПКА ОКНА АДМИНИСТРАТОРА
export default function HeaderAdmin() {
  return (
    <section
      className="w-full h-12 bg-gray-400 flex justify-around items-center border-t-2 border-gray-600"
    >
      {appData.adminButtons.map((btnName, index) => (
        <ButtonAdminHeader
          key={index}
          btnName={btnName}
        />
      ))}
    </section>
  )
}
