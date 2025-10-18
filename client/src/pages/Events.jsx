// src/pages/Events.jsx (обновлённый с 2-колоночным grid)
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events')
        setEvents(res.data)
      } catch (err) {
        console.error('Ошибка загрузки событий:', err)
      }
    }

    loadEvents()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Мероприятия</h1>
      
      {events.length === 0 ? (
        <p className="text-center text-gray-500 italic">События не найдены. Проверьте обновления позже.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event._id} className="border flex flex-col rounded-lg p-6 bg-white shadow-md">
              <img 
                src={event.img || '/logo.webp'}  
                alt={event.title} 
                className="w-36 h-48 object-cover rounded mb-4 self-center"  
              />
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-gray-600">Дата: {event.date}</p>
              {event.time && <p className="text-gray-600">Время: {event.time}</p>}
              {event.format && <p className="text-gray-600">Формат: {event.format}</p>}
              {event.location && <p className="text-gray-600">Место: {event.location}</p>}
              <p className="mt-3 text-gray-700 flex-grow"> {event.description}</p>  
              {event.notes && <p className="text-sm italic text-gray-500 mt-2">Примечание: {event.notes}</p>}
              <button className="btn-primary mt-4 self-center">Зарегистрироваться</button>  
            </div>
          ))}
        </div>
      )}

      {/* Архив */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Архив событий</h2>
        <p>Фотоотчёты прошлых мероприятий .</p>
      </section>
    </div>
  )
}