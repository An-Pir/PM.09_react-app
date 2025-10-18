import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const buttonRef = useRef(null);

  const links = [
    { to: '/', label: 'Главная' },
    { to: '/menu', label: 'Меню' },
    { to: '/booking', label: 'Бронирование' },
    { to: '/events', label: 'Мероприятия' },
    { to: '/contacts', label: 'Контакты' }
  ];

  // ⏬ Закрытие меню при кликах вне него
  useEffect(() => {
    if (!open) return; // не ставим обработчик если меню закрыто

    function handleClick(e) {
      // клик по кнопке или навигации — меню не сворачиваем
      if (
        navRef.current?.contains(e.target) ||
        buttonRef.current?.contains(e.target)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <header className="bg-amber-800 shadow-lg sticky top-0 z-40">
      <nav className="container mx-auto flex flex-col lg:flex-row justify-between items-center py-4 gap-4 lg:gap-0">
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between">
          <img src="./logo.webp" alt="Логотип" className="w-12 h-12 rounded-full border-2 border-amber-300 shadow" />
          {/* Кнопка видна только на малых экранах */}
          <button
            ref={buttonRef}
            className="text-amber-100 bg-amber-900 px-4 py-2 rounded-xl shadow-lg font-bold lg:hidden transition hover:bg-amber-700 focus:outline-none"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="main-nav"
          >
            {open ? "Закрыть меню" : "Меню"}
          </button>
        </div>
        <ul
          ref={navRef}
          id="main-nav"
          className={`
            flex-col space-y-1
            lg:space-y-0
            lg:flex-row lg:space-x-6
            mt-2 lg:mt-0
            transition-all duration-300
            w-full lg:w-auto
            ${open ? 'flex' : 'hidden'}
            lg:flex
          `}
        >
          {links.map(link => {
            const isActive = location.pathname === link.to ||
              (link.to !== "/" && location.pathname.startsWith(link.to));
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block px-4 py-2 rounded-xl text-lg font-semibold transition-all duration-200
                    ${isActive
                      ? "bg-amber-400 text-amber-900 shadow-md scale-105 ring-2 ring-amber-200"
                      : "text-amber-100 hover:bg-amber-600/60 hover:text-white"
                    }`
                  }
                  style={{ letterSpacing: '0.04em' }}
                  onClick={() => setOpen(false)} 
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}