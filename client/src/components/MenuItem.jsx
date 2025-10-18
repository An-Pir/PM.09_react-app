const fallbackImg = '/logo.webp'; 

export default function MenuItem({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
      <div className="relative">
        <img
          src={item.img ? `http://localhost:5000${item.img}` : fallbackImg}
          alt={item.name}
          className="w-full h-56 object-cover rounded-t-2xl"
          onError={e => {
            e.target.onerror = null; 
            e.target.src = fallbackImg;
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
            {item.tags.map((tag, idx) => (
              <span
                key={tag + idx}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mr-1"
              >
                {tag === "vegan"
                  ? "Веганское"
                  : tag === "lactose-free"
                  ? "Без лактозы"
                  : tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-red-500">{item.price} ₽</span>
          <button
            className="ml-2 py-1 px-4 bg-amber-500 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors shadow"
            type="button"
          >
            Заказать
          </button>
        </div>
      </div>
    </div>
  );
}