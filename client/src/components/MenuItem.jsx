const fallbackImg = '/logo.svg'; // Положи файл logo.svg в public/ или заменяй путь

export default function MenuItem({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
      <div className="relative">
        <img
          src={ item.img ? `http://localhost:5000${item.img}` : fallbackImg }
          alt={item.name}
          className="w-full h-56 object-cover rounded-t-2xl"
          onError={e => {
            e.target.onerror = null; // чтобы не зациклиться
            e.target.src = fallbackImg; // показать логотип
          }}
        />
        {/* Шильдик категория в уголку */}
        {item.category && (
          <span className="absolute top-3 left-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-xs font-semibold shadow">
            {item.category === "coffee"
              ? "Кофе"
              : item.category === "desserts"
                ? "Десерты"
                : item.category === "breakfast"
                  ? "Завтраки"
                  : item.category === "books"
                    ? "Книги"
                    : item.category}
          </span>
        )}
      </div>
      <div className="flex-grow p-4 flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mb-2 flex-grow">{item.description}</p>
        {item.ingredients && (
          <p className="text-xs text-gray-400 mb-3">Состав: {item.ingredients}</p>
        )}
        {/* Тэги */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {item.tags.map