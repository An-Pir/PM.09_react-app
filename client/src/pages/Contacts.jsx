import { useState } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';

export default function Contacts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/messages', {
        name,
        email,
        message,
      });
      if (response.status === 201) {
        alert('Сообщение отправлено!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Ошибка при отправке сообщения!');
      }
    } catch (err) {
      alert('Сетевая ошибка при отправке сообщения!');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl md:text-3xl font-extrabold mb-2 text-center text-amber-900 tracking-wide drop-shadow-lg  py-2'>Контакты</h1>

      {/* Карта */}
      <section className='mb-8'>
        <p className='text-center text-2xl font-bold text-amber-700 mt-10 mb-10'>
          Адрес: г. Калуга, ул. Автозаводская, 15
        </p>
        <div className='flex justify-center'>
          <img src='/images/map1.png' alt='Карта' />
        </div>
      </section>

      <div className='flex flex-col'>
        {/* форма для обратной связи */}
        <section
          className='
              max-w-md mx-auto 
              bg-white/[0.96] 
              p-8 
            '
        >
          <h2 className='text-2xl md:text-3xl font-extrabold mb-2 text-center text-amber-900 tracking-wide drop-shadow-lg  py-2'>
            Вы можете оставить для нас сообщение
          </h2>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <InputField
              label='Имя'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Имя'
              required
            />
            <InputField
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
            <div>
              <label className='block mb-1 font-medium'>Сообщение</label>
              <textarea
                className='w-full p-3 rounded-xl border border-amber-500 shadow focus:outline-none focus:border-amber-800 transition-colors duration-200 placeholder-gray-400'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Сообщение'
                rows={4}
                required
              />
            </div>
            <button type='submit' className='btn-primary w-full'>
              Отправить
            </button>
          </form>
        </section>

        {/* График работы */}
        <section className='mt-8 text-center'>
          <h2 className='text-2xl md:text-3xl font-extrabold mb-2 text-center text-amber-900 tracking-wide drop-shadow-lg  py-2'>График работы:</h2>
          <p className='text-2xl font-bold mb-4 text-amber-800'>
            Пн-Пт: 8:00 - 22:00
          </p>
          <p className='text-2xl font-bold mb-4 text-amber-800'>
            Сб-Вс: 9:00 - 23:00
          </p>
        </section>
      </div>
    </div>
  );
}
