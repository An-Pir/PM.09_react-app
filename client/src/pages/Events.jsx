import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const galleryImages = [
    'galary1.jpg',
    'galary2.webp',
    'galary3.jpg',
    'galary4.jpg',
    'galary5.jpg',
    'galary6.jpg',
  ];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Ошибка загрузки событий:', err);
      }
    };

    loadEvents();
  }, []);

  // функция для показа сообщения
  const handleRegister = (eventTitle) => {
    setSuccessMessage(
      `Вы успешно зарегистрировались на событие: ${eventTitle}!`
    );
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl md:text-3xl font-extrabold mb-2 text-center text-amber-900 tracking-wide drop-shadow-lg  py-2'>Мероприятия</h1>
      {successMessage && (
        <div className='mb-6 text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded transition-all'>
          {successMessage}
        </div>
      )}
      {events.length === 0 ? (
        <p className='text-center text-gray-500 italic'>
          События не найдены. Проверьте обновления позже.
        </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {events.map((event) => (
            <div
              key={event._id}
              className='border flex flex-col rounded-lg p-6 bg-white shadow-md'
            >
              <img
                src={event.img || '/logo.webp'}
                alt={event.title}
                className='w-36 h-48 object-cover rounded mb-4 self-center'
              />
              <h2 className='text-xl font-bold'>{event.title}</h2>
              <p className='text-gray-600'>Дата: {event.date}</p>
              {event.time && (
                <p className='text-gray-600'>Время: {event.time}</p>
              )}
              {event.format && (
                <p className='text-gray-600'>Формат: {event.format}</p>
              )}
              {event.location && (
                <p className='text-gray-600'>Место: {event.location}</p>
              )}
              <p className='mt-3 text-gray-700 flex-grow'>
                {event.description}
              </p>
              {event.notes && (
                <p className='text-sm italic text-gray-500 mt-2'>
                  Примечание: {event.notes}
                </p>
              )}
              <button
                className='btn-primary mt-4 self-center'
                onClick={() => handleRegister(event.title)}
              >
                Зарегистрироваться
              </button>
            </div>
          ))}
        </div>
      )}

      <section className='mt-8'>
        <h2 className='text-2xl md:text-3xl font-extrabold mb-2 text-center text-amber-900 tracking-wide drop-shadow-lg  py-2'>
          Архив событий
        </h2>
        <p className='mb-5 text-lg text-center text-amber-800 italic font-medium bg-amber-100 bg-opacity-70 px-2 py-1 rounded'>
          Фотоотчёты прошлых мероприятий:
        </p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {galleryImages.map((img, i) => (
            <img
              key={i}
              src={`/images/galary/${img}`}
              alt={`Фото событие ${i + 1}`}
              className='object-cover w-full h-40 rounded shadow'
              loading='lazy'
            />
          ))}
        </div>
      </section>
    </div>
  );
}
