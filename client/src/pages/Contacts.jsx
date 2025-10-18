export default function Contacts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Контакты</h1>
      
      {/* Карта */}
      <section className="mb-8">
        <div className="flex  justify-center"><img src="/images/map1.png" alt="" /></div>
        <p className="text-center mt-2">Адрес: ул. Книжная, 10, Москва</p>
      </section>

      {/* Форма обратной связи */}
      <section className="max-w-md mx-auto">
        <form className="space-y-4">
          <input type="text" placeholder="Имя" className="w-full p-2 border rounded" required />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <textarea placeholder="Сообщение" className="w-full p-2 border rounded" rows="4" required></textarea>
          <button type="submit" className="btn-primary w-full">Отправить</button>
        </form>
      </section>

      {/* График работы */}
      <section className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">График работы</h2>
        <p>Пн-Пт: 8:00 - 22:00</p>
        <p>Сб-Вс: 9:00 - 23:00</p>
      </section>
    </div>
  )
}