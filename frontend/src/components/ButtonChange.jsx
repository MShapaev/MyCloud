// КОМПОНЕНТ КНОПКИ ИЗМЕНИТЬ
export default function ButtonChange({ handler }) {

  return (
    <div
      className="w-full py-3 text-center"
    >
      <button
        className="btn w-20 h-7 mx-auto border-2 rounded-md border-gray-300 bg-blue-400 hover:border-gray-400 text-xs text-center font-bold active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)]"
        onClick={handler}
      >
        Изменить
      </button>
    </div>
  );
}
