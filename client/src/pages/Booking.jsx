import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import InputField from '../components/InputField';

export default function Booking() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const formattedDate = date.toISOString().slice(0, 10);
    const bookingData = { date: formattedDate, time, guests, name, phone };
    axios
      .post('http://localhost:5000/api/bookings', bookingData)
      .then((res) => setMessage('Бронирование создано!'))
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setError('На это время уже есть бронь!');
        } else {
          setError('Произошла ошибка, попробуйте позже.');
        }
      });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Бронирование столика
      </h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-4'>
        <DatePicker
          selected={date}
          onChange={setDate}
          className='w-full p-3 rounded-xl border border-amber-500 shadow focus:outline-none focus:border-amber-800 transition-colors duration-200 placeholder-gray-400'
          dateFormat='yyyy-MM-dd'
          required
        />
        <InputField
          type='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <InputField
          type='number'
          min='1'
          max='10'
          value={guests}
          onChange={(e) => setGuests(+e.target.value)}
          placeholder='Количество гостей'
          required
        />
        <InputField
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Имя'
          required
        />
        <InputField
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Телефон'
          required
          className='border-amber-500'
        />
        <button type='submit' className='btn-primary w-full'>
          Забронировать
        </button>
        {message && (
          <div className='text-green-600 font-semibold mt-2'>{message}</div>
        )}
        {error && (
          <div className='text-red-600 font-semibold mt-2'>{error}</div>
        )}
      </form>
    </div>
  );
}
