import { useNavigate } from 'react-router-dom';

// КОМПОНЕНТ КНОПКИ "ВЕРНУТЬСЯ"(назад)
export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex justify-center"
    >
      <button
        className="w-1/5 h-9 border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
        onClick={() => navigate(-1)}
      >
        Вернуться
      </button>
    </div>
  );
}