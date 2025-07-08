// КОМПОНЕНТ КНОПКИ УПРАВЛЕНИЯ ФАЙЛАМИ ИЗ КАРТОЧКИ АККАУНТА (админка)
export default function ButtonFooterCardFiles({ btnName, onClick}) {
  return (
      <button
        className="btn w-[15%] h-9 border-2 rounded-md border-gray-300 bg-slate-200 hover:border-gray-400 text-xs text-center font-bold active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
        onClick={onClick}
      >
        {btnName}
      </button>
  );
}