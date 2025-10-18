import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-amber-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center">
          <img src="./logo.webp" alt="Логотип" className="w-22" /> 
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Главная</Link></li>
          <li><Link to="/menu" className="hover:underline">Меню</Link></li>
          <li><Link to="/booking" className="hover:underline">Бронирование</Link></li>
          <li><Link to="/events" className="hover:underline">Мероприятия</Link></li>
          <li><Link to="/contacts" className="hover:underline">Контакты</Link></li>
        </ul>
      </nav>
    </header>
  )
}