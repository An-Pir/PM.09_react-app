import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 добавим useNavigate
import axios from 'axios';

function isISOStr(str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str);
}

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 хук навигации

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        const events = res.data;
        const today = new Date().toISOString().split('T')[0];

        const futureEvents = events
          .filter(
            (event) =>
              event.date &&
              isISOStr(event.date) &&
              event.date >= today
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5);

        // добавляем id к слайду
        const eventSlides = futureEvents.map((event) => ({
          id: event._id || event.id, // поддерживаем разные API-имена
          type: 'event',
          title: event.title,
          desc: `${event.date} в ${event.time || 'Время уточняется'} | ${
            event.description?.substring(0, 80) || 'Подробнее...'
          }`,
        }));

        setSlides(
          eventSlides.length > 0
            ? eventSlides
            : [
                {
                  type: 'fallback',
                  title: 'Скоро новые мероприятия',
                  desc: 'Следите за обновлениями!',
                },
              ]
        );
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки слайдера:', err);
        setSlides([
          {
            type: 'fallback',
            title: 'Загрузка недоступна',
            desc: 'Проверьте подключение',
          },
        ]);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // таймер слайдов
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }


  const handleSlideClick = (slide) => {
    if (slide.type === 'event' && slide.id) {
      navigate(`/events/`);
    }
  };

  return (
    <div className="relative h-64 md:h-80 overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center text-center text-white p-4 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ cursor: slide.type === 'event' ? 'pointer' : 'default' }}
          onClick={() => handleSlideClick(slide)}
        >
          <div className="absolute inset-0 bg-amber-800/90"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{slide.title}</h2>
            <p className="text-sm md:text-base">{slide.desc}</p>
          </div>
        </div>
      ))}

      {/* Индикаторы */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition 
                ${idx === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}
              `}
              aria-label={`Слайд ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}