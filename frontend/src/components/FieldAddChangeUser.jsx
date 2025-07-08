
//КОМПОНЕНТ ИЗМЕНЯЕМЫХ ПОЛЕЙ ЛИЧНЫХ ДАННЫХ КОНКРЕТНОГО АККАУНТА
export default function FieldAddChangeUser({ atr, text, data, }) {

  return (
    <div
      className="w-4/5 mx-auto"
    >
      <label
        htmlFor={atr}
        className="w-full py-1 h-6 text-xs font-sans font-bold"
      >
        {text}
      </label>
      <div
        className="w-full relative"
      >
        <input
          type={atr === 'isAdmin' ? 'checkbox' : 'text'}
          name={atr}
          className={`${atr === 'isAdmin' ? 'h-4 w-4' : 'h-9 w-full'} " px-2 border-2 border-gray-300 bg-blue-100 rounded-md outline-none focus:border-gray-400 "`}
          defaultValue={data ? data[atr] : ''}
          defaultChecked={data ? data[atr] : ''}
        />
        <div
          className="w-full h-4"
        >
        </div>
      </div>
    </div>
  );
}
