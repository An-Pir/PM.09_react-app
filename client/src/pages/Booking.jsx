import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default function Booking() {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const bookingData = { date: date.toISOString(), time, guests, name, phone }
    axios.post('http://localhost:5000/api/bookings', bookingData)
      .then(res => alert('Бронирование создано!'))
      .catch(err => console.error(err))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Бронирование столика</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <DatePicker selected={date} onChange={setDate} className="w-full p-2 border rounded" />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" min="1" max="10" value={guests} onChange={e => setGuests(e.target.value)} placeholder="Количество гостей" className="w-full p-2 border rounded" required />
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" className="w-full p-2 border rounded" required />
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" className="w-full p-2 border rounded" required />
        <button type="submit" className="btn-primary w-full">Забронировать</button>
      </form>
    </div>
  )
}